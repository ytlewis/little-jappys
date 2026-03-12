import { useState } from "react";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getCart, removeFromCart, clearCart, type CartItem } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>(getCart());
  const [checkedOut, setCheckedOut] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = () => {
    clearCart();
    setCart([]);
    setCheckedOut(true);
    window.dispatchEvent(new Event("cartUpdated"));
    toast({ title: "Order placed!", description: "Thank you for your order! (Demo)" });
  };

  if (checkedOut) {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Thank you for your order!</h1>
          <p className="text-muted-foreground mb-8">(Demo) Your order has been placed successfully.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-6">Your cart is empty.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4" /> Browse Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-card rounded-xl border border-border p-4 shadow-sm">
                  <div className="w-20 h-20 rounded-lg bg-baby-blue flex items-center justify-center flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary">KSh {(item.price * item.quantity).toFixed(0)}</p>
                  <button onClick={() => handleRemove(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:w-80 bg-card rounded-2xl border border-border p-6 shadow-md h-fit">
              <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">KSh {total.toFixed(0)}</span>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-foreground">Free</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-extrabold text-primary text-xl">KSh {total.toFixed(0)}</span>
              </div>
              <button onClick={handleCheckout} className="mt-6 w-full bg-accent hover:bg-baby-orange-dark text-accent-foreground font-bold py-3 rounded-xl transition-colors">
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CartPage;
