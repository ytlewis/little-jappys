import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingBag, Users, MessageSquare, TrendingUp, Package, Plus, Edit, Trash2, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { products as defaultProducts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 6,
    totalOrders: 0,
    totalUsers: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const auth = getFromLocalStorage<{ isAuthenticated: boolean }>("littlejappy_admin_auth");
    if (!auth?.isAuthenticated) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
      loadStats();
    }
  }, [navigate]);

  const loadStats = () => {
    const users = getFromLocalStorage<any[]>("littlejappy_users") || [];
    const orders = getFromLocalStorage<any[]>("littlejappy_orders") || [];
    const reviews = getFromLocalStorage<any[]>("littlejappy_reviews") || [];
    const products = getFromLocalStorage<any[]>("littlejappy_products") || defaultProducts;
    const bookings = getFromLocalStorage<any[]>("littlejappy_bookings") || [];
    
    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalUsers: users.length,
      totalReviews: reviews.length,
    });
  };

  const handleLogout = () => {
    removeFromLocalStorage("littlejappy_admin_auth");
    navigate("/admin/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-baby-cream to-secondary">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Little Jappy's Admin</h1>
            <p className="text-sm text-muted-foreground">Management Dashboard</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Monitor your business performance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Total Products</CardTitle>
              <Package className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{stats.totalProducts}</div>
              <p className="text-xs text-blue-700 mt-1">Active in store</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Total Orders</CardTitle>
              <ShoppingBag className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">{stats.totalOrders}</div>
              <p className="text-xs text-green-700 mt-1">Completed purchases</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">Total Users</CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{stats.totalUsers}</div>
              <p className="text-xs text-purple-700 mt-1">Registered customers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Total Reviews</CardTitle>
              <MessageSquare className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">{stats.totalReviews}</div>
              <p className="text-xs text-orange-700 mt-1">Customer feedback</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Users
              </CardTitle>
              <CardDescription>Latest customer registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentUsersList />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Recent Orders
              </CardTitle>
              <CardDescription>Latest purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrdersList />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Reviews
              </CardTitle>
              <CardDescription>Customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentReviewsList />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <BookingsManager />
        </div>

        <div className="mt-8">
          <ProductsManager onUpdate={loadStats} />
        </div>
      </main>

      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2026 Little Jappy's. Developed by Sapenzia Musyoka. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const RecentUsersList = () => {
  const users = getFromLocalStorage<any[]>("littlejappy_users") || [];
  const recentUsers = users.slice(-5).reverse();

  if (recentUsers.length === 0) {
    return <p className="text-sm text-muted-foreground">No users yet</p>;
  }

  return (
    <div className="space-y-3">
      {recentUsers.map((user, index) => (
        <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const RecentOrdersList = () => {
  const orders = getFromLocalStorage<any[]>("littlejappy_orders") || [];
  const recentOrders = orders.slice(-5).reverse();

  if (recentOrders.length === 0) {
    return <p className="text-sm text-muted-foreground">No orders yet</p>;
  }

  return (
    <div className="space-y-3">
      {recentOrders.map((order, index) => (
        <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
          <div>
            <p className="font-medium text-sm">{order.customerName}</p>
            <p className="text-xs text-muted-foreground">{order.items?.length || 0} items</p>
          </div>
          <p className="font-bold text-sm text-primary">KSh {order.total}</p>
        </div>
      ))}
    </div>
  );
};

const RecentReviewsList = () => {
  const reviews = getFromLocalStorage<any[]>("littlejappy_reviews") || [];
  const recentReviews = reviews.slice(-5).reverse();

  if (recentReviews.length === 0) {
    return <p className="text-sm text-muted-foreground">No reviews yet</p>;
  }

  return (
    <div className="space-y-3">
      {recentReviews.map((review, index) => (
        <div key={index} className="p-2 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium text-sm">{review.customerName}</p>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardPage;

const BookingsManager = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const storedBookings = getFromLocalStorage<any[]>("littlejappy_bookings") || [];
    setBookings(storedBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  const updateBookingStatus = (bookingId: string, status: string) => {
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status } : b
    );
    saveToLocalStorage("littlejappy_bookings", updatedBookings);
    setBookings(updatedBookings);
    toast.success(`Booking ${status}!`);
  };

  const deleteBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      saveToLocalStorage("littlejappy_bookings", updatedBookings);
      setBookings(updatedBookings);
      toast.success("Booking deleted!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Babysitter Bookings
        </CardTitle>
        <CardDescription>Manage babysitting appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{booking.customerName}</h3>
                      <Badge variant={
                        booking.status === "confirmed" ? "default" :
                        booking.status === "cancelled" ? "destructive" :
                        "secondary"
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Sitter: {booking.sitterName}</p>
                    <p className="text-sm text-muted-foreground">
                      Date: {booking.date} at {booking.time} ({booking.hours} hours)
                    </p>
                    <p className="text-sm text-muted-foreground">Child Age: {booking.childAge}</p>
                    {booking.specialRequests && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Notes: {booking.specialRequests}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-primary mt-2">
                      Total: KSh {booking.total}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {booking.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, "confirmed")}
                          className="gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateBookingStatus(booking.id, "cancelled")}
                          className="gap-1"
                        >
                          <XCircle className="h-3 w-3" />
                          Cancel
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteBooking(booking.id)}
                      className="gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock?: number;
  category?: string;
}

const ProductsManager = ({ onUpdate }: { onUpdate: () => void }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const storedProducts = getFromLocalStorage<Product[]>("littlejappy_products");
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      setProducts(defaultProducts as Product[]);
      saveToLocalStorage("littlejappy_products", defaultProducts);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Product = {
      id: editingProduct?.id || `p${Date.now()}`,
      name: formData.name,
      price: parseInt(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
      stock: formData.stock ? parseInt(formData.stock) : undefined,
      category: formData.category || undefined,
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map((p) => (p.id === editingProduct.id ? productData : p));
      toast.success("Product updated successfully!");
    } else {
      updatedProducts = [...products, productData];
      toast.success("Product added successfully!");
    }

    saveToLocalStorage("littlejappy_products", updatedProducts);
    setProducts(updatedProducts);
    resetForm();
    setIsDialogOpen(false);
    onUpdate();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      stock: product.stock?.toString() || "",
      category: product.category || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== id);
      saveToLocalStorage("littlejappy_products", updatedProducts);
      setProducts(updatedProducts);
      toast.success("Product deleted successfully!");
      onUpdate();
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", image: "", stock: "", category: "" });
    setEditingProduct(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Manage Products
            </CardTitle>
            <CardDescription>Add, edit, or remove products from the baby shop</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="gap-2 bg-accent hover:bg-accent/90"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? "Update product details" : "Add a new product to the baby shop"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Baby Blanket"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (KSh)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 1500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use Unsplash URLs for best results
                  </p>
                </div>
                <div>
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Clothing, Toys, Feeding"
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock (Optional)</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No products yet. Add your first product!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 space-y-3">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">KSh {product.price.toFixed(0)}</p>
                  {product.category && (
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  )}
                  {product.stock !== undefined && (
                    <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="flex-1 gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
