import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { User, Lock, ShoppingBag, LogOut, Eye, EyeOff, CheckCircle2 } from "lucide-react";

interface UserAccount {
  name: string;
  email: string;
  password: string;
  phone?: string;
  createdAt: string;
}

interface Order {
  orderId: string;
  customerName: string;
  email: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  paymentMethod: string;
  date: string;
  status: string;
}

type Tab = "profile" | "password" | "orders";

const UserSettingsPage = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Load user data
    const users = getFromLocalStorage<UserAccount[]>("littlejappy_users") || [];
    const account = users.find(u => u.email === user.email);
    if (account) {
      setName(account.name);
      setPhone(account.phone || "");
    }

    // Load orders for this user
    const allOrders = getFromLocalStorage<Order[]>("littlejappy_orders") || [];
    setOrders(allOrders.filter(o => o.email === user.email));
  }, [user, navigate]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const users = getFromLocalStorage<UserAccount[]>("littlejappy_users") || [];
    const updated = users.map(u =>
      u.email === user.email ? { ...u, name, phone } : u
    );
    saveToLocalStorage("littlejappy_users", updated);

    // Update auth context with new name
    login(user.email, name);
    toast.success("Profile updated successfully!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const users = getFromLocalStorage<UserAccount[]>("littlejappy_users") || [];
    const account = users.find(u => u.email === user.email);

    if (!account) return;

    if (account.password !== currentPassword) {
      toast.error("Current password is incorrect.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    const updated = users.map(u =>
      u.email === user.email ? { ...u, password: newPassword } : u
    );
    saveToLocalStorage("littlejappy_users", updated);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
  ];

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 text-destructive border-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* User badge */}
        <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 mb-8 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="font-bold text-foreground text-lg">{name || user?.name}</p>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your name and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 0712 345 678"
                  />
                </div>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Keep your account secure with a strong password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>All your past purchases</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No orders yet.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate("/shop")}
                  >
                    Browse Shop
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice().reverse().map((order, i) => (
                    <div key={i} className="border border-border rounded-xl p-5 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground font-mono text-sm">{order.orderId}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {order.status || "Processing"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        {order.items?.map((item, j) => (
                          <div key={j} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                            <span className="font-medium">KSh {(item.price * item.quantity).toFixed(0)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center border-t border-border pt-3">
                        <span className="text-sm text-muted-foreground">{order.paymentMethod}</span>
                        <span className="font-bold text-primary">KSh {order.total?.toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </section>
    </Layout>
  );
};

export default UserSettingsPage;
