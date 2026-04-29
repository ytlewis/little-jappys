import { useState } from "react";
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getCart, removeFromCart, clearCart, type CartItem, getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PaymentMethod = "mpesa" | "card" | "bank";

interface OrderConfirmation {
  orderId: string;
  customerName: string;
  email: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  date: string;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>(getCart());
  const [step, setStep] = useState<"cart" | "payment" | "confirmed">("cart");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);

  // Payment form fields
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bankRef, setBankRef] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const auth = getFromLocalStorage<{ name: string; email: string }>("littlejappy_customer_auth");

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) return;
    setStep("payment");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `ORD-${Date.now()}`;
    const paymentLabels: Record<PaymentMethod, string> = {
      mpesa: "M-Pesa",
      card: "Credit/Debit Card",
      bank: "Bank Transfer",
    };

    const confirmation: OrderConfirmation = {
      orderId,
      customerName: auth?.name || "Customer",
      email: auth?.email || "",
      items: [...cart],
      total,
      paymentMethod: paymentLabels[paymentMethod],
      date: new Date().toLocaleString(),
    };

    // Save order to localStorage
    const orders = getFromLocalStorage<any[]>("littlejappy_orders") || [];
    orders.push({ ...confirmation, status: "processing" });
    saveToLocalStorage("littlejappy_orders", orders);

    clearCart();
    setCart([]);
    window.dispatchEvent(new Event("cartUpdated"));
    setOrderConfirmation(confirmation);
    setStep("confirmed");
    toast.success("Order placed! A confirmation has been saved to your account.");
  };

  // Order Confirmed Screen
  if (step === "confirmed" && orderConfirmation) {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="bg-card rounded-2xl border border-border shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you, <strong>{orderConfirmation.customerName}</strong>! Your order has been placed successfully.
            </p>

            {/* Email notice */}
            {orderConfirmation.email && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-blue-800 font-semibold mb-1">📧 Confirmation Email</p>
                <p className="text-sm text-blue-700">
                  A confirmation has been sent to <strong>{orderConfirmation.email}</strong>
                </p>
              </div>
            )}

            {/* Order details */}
            <div className="bg-muted/50 rounded-xl p-5 text-left mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-semibold">{orderConfirmation.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-semibold">{orderConfirmation.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-semibold">{orderConfirmation.paymentMethod}</span>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-sm font-semibold text-foreground mb-2">Items Ordered:</p>
                {orderConfirmation.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="font-semibold">KSh {(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-bold">Total Paid</span>
                <span className="font-extrabold text-primary text-lg">KSh {orderConfirmation.total.toFixed(0)}</span>
              </div>
            </div>

            <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  // Payment Screen
  if (step === "payment") {
    return (
      <Layout>
        <section className="container mx-auto px-4 py-12 max-w-2xl">
          <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-foreground mb-8">Payment</h1>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Payment method selector */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-md">
              <h2 className="font-bold text-foreground mb-4">Select Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { id: "mpesa", label: "M-Pesa", icon: Smartphone, desc: "Pay via mobile money" },
                  { id: "card", label: "Card", icon: CreditCard, desc: "Visa / Mastercard" },
                  { id: "bank", label: "Bank Transfer", icon: Building2, desc: "Direct bank transfer" },
                ] as { id: PaymentMethod; label: string; icon: React.ElementType; desc: string }[]).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"}`}
                  >
                    <m.icon className={`w-6 h-6 ${paymentMethod === m.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-semibold ${paymentMethod === m.id ? "text-primary" : "text-foreground"}`}>{m.label}</span>
                    <span className="text-xs text-muted-foreground text-center">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment details */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-md space-y-4">
              <h2 className="font-bold text-foreground mb-2">Payment Details</h2>

              {paymentMethod === "mpesa" && (
                <div>
                  <Label htmlFor="mpesa">M-Pesa Phone Number</Label>
                  <Input id="mpesa" type="tel" placeholder="e.g., 0712 345 678" value={mpesaPhone} onChange={e => setMpesaPhone(e.target.value)} required className="mt-1" />
                  <p className="text-xs text-muted-foreground mt-2">You will receive an STK push to complete payment.</p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <Label>Cardholder Name</Label>
                    <Input placeholder="Name on card" value={cardName} onChange={e => setCardName(e.target.value)} required className="mt-1" />
                  </div>
                  <div>
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" maxLength={19} value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())} required className="mt-1 font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" maxLength={5} value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} required className="mt-1" />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input placeholder="123" maxLength={4} type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value)} required className="mt-1" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-xl p-4 text-sm space-y-1">
                    <p className="font-semibold text-foreground">Bank Transfer Details</p>
                    <p className="text-muted-foreground">Bank: Equity Bank Kenya</p>
                    <p className="text-muted-foreground">Account Name: Little Jappy's Ltd</p>
                    <p className="text-muted-foreground">Account No: 0123456789</p>
                    <p className="text-muted-foreground">Branch: Westlands</p>
                  </div>
                  <div>
                    <Label>Transaction Reference</Label>
                    <Input placeholder="Enter your bank transaction reference" value={bankRef} onChange={e => setBankRef(e.target.value)} required className="mt-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-md">
              <h2 className="font-bold text-foreground mb-4">Order Summary</h2>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm py-1.5">
                  <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                  <span className="font-semibold">KSh {(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 mt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-extrabold text-primary text-xl">KSh {total.toFixed(0)}</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl transition-colors text-lg">
              Place Order · KSh {total.toFixed(0)}
            </button>
          </form>
        </section>
      </Layout>
    );
  }

  // Cart Screen
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
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                    <p className="text-xs text-muted-foreground">KSh {item.price.toFixed(0)} each</p>
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
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between mb-6">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-extrabold text-primary text-xl">KSh {total.toFixed(0)}</span>
              </div>

              {/* Payment method preview */}
              <div className="flex gap-2 mb-4 justify-center">
                <Smartphone className="w-6 h-6 text-green-600" title="M-Pesa" />
                <CreditCard className="w-6 h-6 text-blue-600" title="Card" />
                <Building2 className="w-6 h-6 text-gray-600" title="Bank Transfer" />
              </div>
              <p className="text-xs text-center text-muted-foreground mb-4">M-Pesa · Card · Bank Transfer</p>

              <button onClick={handleProceedToPayment} className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-xl transition-colors">
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CartPage;
