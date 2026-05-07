import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { sendPasswordResetEmail } from "@/lib/email";
import { toast } from "sonner";
import { Baby, ArrowLeft, KeyRound, Mail } from "lucide-react";

type View = "login" | "forgot" | "sent";

const CustomerLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/shop";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getFromLocalStorage<any[]>("littlejappy_users") || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      login(user.email, user.name);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);

    const users = getFromLocalStorage<any[]>("littlejappy_users") || [];
    const user = users.find(u => u.email === resetEmail);

    if (!user) {
      toast.error("No account found with that email address.");
      setIsResetting(false);
      return;
    }

    // Generate a temporary password
    const tempPassword = `Jappy${Math.random().toString(36).slice(2, 8).toUpperCase()}!`;

    // Save the temp password to their account
    const updatedUsers = users.map(u =>
      u.email === resetEmail ? { ...u, password: tempPassword } : u
    );
    saveToLocalStorage("littlejappy_users", updatedUsers);

    // Send the reset email
    const sent = await sendPasswordResetEmail({
      toEmail: resetEmail,
      toName: user.name,
      tempPassword,
    });

    setIsResetting(false);

    if (sent) {
      setView("sent");
    } else {
      // Even if email fails, show the temp password on screen as fallback
      toast.success(
        `Password reset! Your temporary password is: ${tempPassword}`,
        { duration: 15000 }
      );
      setView("sent");
    }
  };

  // ── Sent confirmation view ──────────────────────────────────────────────────
  if (view === "sent") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-baby-cream to-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>
              A temporary password has been sent to <strong>{resetEmail}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-semibold mb-1">Next steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-blue-700">
                <li>Check your email for the temporary password</li>
                <li>Log in using that temporary password</li>
                <li>Change your password from your account settings</li>
              </ol>
            </div>
            <Button
              className="w-full bg-accent hover:bg-accent/90"
              onClick={() => { setView("login"); setResetEmail(""); }}
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Forgot password view ────────────────────────────────────────────────────
  if (view === "forgot") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-baby-cream to-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <KeyRound className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your registered email and we'll send you a temporary password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resetEmail">Email Address</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90"
                disabled={isResetting}
              >
                {isResetting ? "Sending..." : "Send Temporary Password"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={() => setView("login")}
                className="gap-2 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Login view ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-baby-cream to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Baby className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Login to your Little Jappy's account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerLoginPage;
