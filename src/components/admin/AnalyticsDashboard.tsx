import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, Gift, TrendingUp } from "lucide-react";
import { getFromLocalStorage } from "@/lib/storage";

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    sitters: 0,
    donations: 0,
    bookings: 0,
  });

  useEffect(() => {
    const products = getFromLocalStorage<any[]>("littlejappy_products") || [];
    const sitters = getFromLocalStorage<any[]>("littlejappy_sitters") || [];
    const donations = getFromLocalStorage<any[]>("littlejappy_donations") || [];
    
    setStats({
      products: products.length,
      sitters: sitters.length,
      donations: donations.length,
      bookings: 0,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products}</div>
            <p className="text-xs text-muted-foreground">Products in inventory</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sitters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sitters}</div>
            <p className="text-xs text-muted-foreground">Available babysitters</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.donations}</div>
            <p className="text-xs text-muted-foreground">Community contributions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bookings}</div>
            <p className="text-xs text-muted-foreground">Babysitting bookings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Quick insights into your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Welcome to your admin dashboard! Use the tabs above to manage products, sitters, bookings, donations, and parenting tips.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm"><strong>Products:</strong> Add and manage items in your shop</p>
            <p className="text-sm"><strong>Sitters:</strong> Add and manage babysitters available for booking</p>
            <p className="text-sm"><strong>Bookings:</strong> View customer bookings (coming soon)</p>
            <p className="text-sm"><strong>Donations:</strong> Track community donations</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
