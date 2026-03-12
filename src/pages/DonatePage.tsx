import { useState } from "react";
import { Heart, Gift, Package } from "lucide-react";
import Layout from "@/components/Layout";
import { getDonations, addDonation, type DonationItem, getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";

interface DonationRequest {
  id: string;
  requesterName: string;
  email: string;
  phone: string;
  itemNeeded: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const DonatePage = () => {
  const [donations, setDonations] = useState<DonationItem[]>(getDonations());
  const [form, setForm] = useState({ donorName: "", itemName: "", condition: "Like New" as "Like New" | "Gently Used" });
  const [requestForm, setRequestForm] = useState({ requesterName: "", email: "", phone: "", itemNeeded: "", reason: "" });
  const [showRequestDialog, setShowRequestDialog] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.donorName || !form.itemName) return;
    addDonation(form);
    setDonations(getDonations());
    setForm({ donorName: "", itemName: "", condition: "Like New" });
    toast({ title: "Thank you for your donation!", description: "It will be verified soon." });
  };

  const handleRequest = (itemName: string) => {
    setRequestForm({ ...requestForm, itemNeeded: itemName });
    setShowRequestDialog(true);
  };

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const requests = getFromLocalStorage<DonationRequest[]>("littlejappy_donation_requests") || [];
    const newRequest: DonationRequest = {
      id: `req${Date.now()}`,
      requesterName: requestForm.requesterName,
      email: requestForm.email,
      phone: requestForm.phone,
      itemNeeded: requestForm.itemNeeded,
      reason: requestForm.reason,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    requests.push(newRequest);
    saveToLocalStorage("littlejappy_donation_requests", requests);
    setShowRequestDialog(false);
    setRequestForm({ requesterName: "", email: "", phone: "", itemNeeded: "", reason: "" });
    toast({ title: "Request submitted!", description: "Admin will review your request soon." });
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Give Back</h1>
        <p className="text-muted-foreground mb-8">Donate items and support families in need.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donate Form */}
          <div className="bg-card rounded-2xl border border-border shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Gift className="w-5 h-5 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Donate an Item</h2>
            </div>
            <form onSubmit={handleDonate} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">Your Name</label>
                <input type="text" value={form.donorName} onChange={(e) => setForm({ ...form, donorName: e.target.value })} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" required />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">Item Name</label>
                <input type="text" value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} placeholder="e.g., Baby Bouncer" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" required />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-1 block">Condition</label>
                <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value as "Like New" | "Gently Used" })} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm">
                  <option>Like New</option>
                  <option>Gently Used</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-accent hover:bg-baby-orange-dark text-accent-foreground font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" /> Submit Donation
              </button>
            </form>
          </div>

          {/* Available Donations */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-baby-blue flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Available Donations</h2>
            </div>
            {donations.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No donations yet. Be the first to give back!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {donations.map((item) => (
                  <div key={item.id} className="bg-card rounded-xl border border-border p-4 shadow-sm flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{item.itemName}</h3>
                      <p className="text-muted-foreground text-xs">{item.condition} · Donated by {item.donorName}</p>
                    </div>
                    <button onClick={() => handleRequest(item.itemName)} className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                      Request
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Request Dialog */}
        {showRequestDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in relative">
              <button onClick={() => setShowRequestDialog(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">✕</button>
              <h2 className="text-xl font-bold mb-4">Request Donation</h2>
              <form onSubmit={submitRequest} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold block mb-1">Your Name</label>
                  <input type="text" value={requestForm.requesterName} onChange={(e) => setRequestForm({...requestForm, requesterName: e.target.value})} className="w-full rounded-xl border px-4 py-3 text-sm" required />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">Email</label>
                  <input type="email" value={requestForm.email} onChange={(e) => setRequestForm({...requestForm, email: e.target.value})} className="w-full rounded-xl border px-4 py-3 text-sm" required />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">Phone</label>
                  <input type="tel" value={requestForm.phone} onChange={(e) => setRequestForm({...requestForm, phone: e.target.value})} className="w-full rounded-xl border px-4 py-3 text-sm" required />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">Item Needed</label>
                  <input type="text" value={requestForm.itemNeeded} onChange={(e) => setRequestForm({...requestForm, itemNeeded: e.target.value})} className="w-full rounded-xl border px-4 py-3 text-sm" required />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">Reason</label>
                  <textarea value={requestForm.reason} onChange={(e) => setRequestForm({...requestForm, reason: e.target.value})} className="w-full rounded-xl border px-4 py-3 text-sm min-h-[80px]" required />
                </div>
                <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl">Submit Request</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default DonatePage;
