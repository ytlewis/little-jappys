import { useState } from "react";
import { Heart, Gift, Package, User, Phone, Mail, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { getDonations, addDonation, type DonationItem, getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface DonationRequest {
  id: string;
  requesterName: string;
  email: string;
  phone: string;
  location: string;
  itemNeeded: string;
  reason: string;
  familySize: string;
  status: "pending" | "approved" | "fulfilled";
  createdAt: string;
}

// Sample recipients / less fortunate families registered in the system
const sampleRecipients: DonationRequest[] = [
  {
    id: "r1",
    requesterName: "Wanjiku Family",
    email: "wanjiku@example.com",
    phone: "+254 712 345 678",
    location: "Kibera, Nairobi",
    itemNeeded: "Baby Clothes (0–6 months)",
    reason: "Single mother of 3, recently lost job, needs baby essentials for newborn.",
    familySize: "4 members",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "r2",
    requesterName: "Otieno Family",
    email: "otieno@example.com",
    phone: "+254 723 456 789",
    location: "Mathare, Nairobi",
    itemNeeded: "Baby Stroller / Carrier",
    reason: "Young couple with twins, cannot afford mobility equipment for babies.",
    familySize: "4 members",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "r3",
    requesterName: "Achieng Family",
    email: "achieng@example.com",
    phone: "+254 734 567 890",
    location: "Korogocho, Nairobi",
    itemNeeded: "Feeding Bottles & Baby Food",
    reason: "Mother unable to breastfeed due to illness, needs feeding supplies urgently.",
    familySize: "3 members",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

const DonatePage = () => {
  const [donations, setDonations] = useState<DonationItem[]>(getDonations());
  const [form, setForm] = useState({ donorName: "", itemName: "", condition: "Like New" as "Like New" | "Gently Used" });
  const [recipients] = useState<DonationRequest[]>(() => {
    const stored = getFromLocalStorage<DonationRequest[]>("littlejappy_donation_requests") || [];
    return stored.length > 0 ? stored : sampleRecipients;
  });
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  const [showFulfillDialog, setShowFulfillDialog] = useState<DonationRequest | null>(null);
  const [activeTab, setActiveTab] = useState<"recipients" | "available">("recipients");

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.donorName || !form.itemName) return;
    addDonation(form);
    setDonations(getDonations());
    setForm({ donorName: "", itemName: "", condition: "Like New" });
    setShowDonateDialog(false);
    toast.success("Thank you! Your donation has been listed and will help a family in need.");
  };

  const handleFulfill = (recipient: DonationRequest, donationItem: DonationItem) => {
    // Mark donation as fulfilled
    const allDonations = getDonations();
    const updated = allDonations.filter(d => d.id !== donationItem.id);
    saveToLocalStorage("littlejappy_donations", updated);
    setDonations(updated);
    toast.success(`Item matched to ${recipient.requesterName}! They will be contacted.`);
    setShowFulfillDialog(null);
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Give Back</h1>
            <p className="text-muted-foreground">Connect donated items with families who need them most.</p>
          </div>
          <button
            onClick={() => setShowDonateDialog(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <Heart className="w-4 h-4" /> Donate an Item
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("recipients")}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${activeTab === "recipients" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
          >
            Families in Need ({recipients.length})
          </button>
          <button
            onClick={() => setActiveTab("available")}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${activeTab === "available" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
          >
            Available Donations ({donations.length})
          </button>
        </div>

        {/* Recipients Tab */}
        {activeTab === "recipients" && (
          <div>
            <p className="text-sm text-muted-foreground mb-6">
              These are verified less fortunate families registered in our system who need baby items. You can donate directly to help them.
            </p>
            {recipients.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <User className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No families registered yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipients.map((recipient) => (
                  <div key={recipient.id} className="bg-card rounded-2xl border border-border shadow-md p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{recipient.requesterName}</h3>
                          <p className="text-xs text-muted-foreground">{recipient.familySize}</p>
                        </div>
                      </div>
                      <Badge variant={recipient.status === "fulfilled" ? "default" : "secondary"}>
                        {recipient.status}
                      </Badge>
                    </div>

                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{recipient.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{recipient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{recipient.email}</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-foreground mb-1">Needs: {recipient.itemNeeded}</p>
                      <p className="text-xs text-muted-foreground">{recipient.reason}</p>
                    </div>

                    {recipient.status !== "fulfilled" && (
                      <button
                        onClick={() => setShowDonateDialog(true)}
                        className="w-full bg-accent hover:bg-accent/90 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4" /> Donate to This Family
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Available Donations Tab */}
        {activeTab === "available" && (
          <div>
            <p className="text-sm text-muted-foreground mb-6">
              Items donated by community members, available to be claimed by families in need.
            </p>
            {donations.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No donations yet. Be the first to give back!</p>
                <button
                  onClick={() => setShowDonateDialog(true)}
                  className="mt-4 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  Donate an Item
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {donations.map((item) => (
                  <div key={item.id} className="bg-card rounded-xl border border-border p-5 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{item.itemName}</h3>
                        <p className="text-xs text-muted-foreground">{item.condition} · Donated by {item.donorName}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Donated on {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => setShowFulfillDialog(recipients[0] || null)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      Match to a Family
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Donate Dialog */}
        {showDonateDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in relative">
              <button onClick={() => setShowDonateDialog(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">✕</button>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-accent-foreground" />
                </div>
                <h2 className="text-xl font-bold">Donate an Item</h2>
              </div>
              <form onSubmit={handleDonate} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold block mb-1">Your Name</label>
                  <input type="text" value={form.donorName} onChange={(e) => setForm({ ...form, donorName: e.target.value })} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" required />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">Item Name</label>
                  <input type="text" value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} placeholder="e.g., Baby Bouncer, Stroller, Clothes" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" required />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">Condition</label>
                  <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value as "Like New" | "Gently Used" })} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm">
                    <option>Like New</option>
                    <option>Gently Used</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" /> Submit Donation
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Fulfill Dialog */}
        {showFulfillDialog && donations.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in relative">
              <button onClick={() => setShowFulfillDialog(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl">✕</button>
              <h2 className="text-xl font-bold mb-2">Match Donation</h2>
              <p className="text-sm text-muted-foreground mb-4">Select a family to receive this item:</p>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recipients.filter(r => r.status !== "fulfilled").map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleFulfill(r, donations[0])}
                    className="w-full text-left p-3 rounded-xl border border-border hover:bg-muted transition-colors"
                  >
                    <p className="font-semibold text-sm">{r.requesterName}</p>
                    <p className="text-xs text-muted-foreground">{r.location} · Needs: {r.itemNeeded}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default DonatePage;
