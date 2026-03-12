import { useState, useEffect } from "react";
import { Star, X, Calendar, Clock, User } from "lucide-react";
import Layout from "@/components/Layout";
import { sitters as defaultSitters } from "@/lib/data";
import { getFromLocalStorage } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";

interface Sitter {
  id: string;
  name: string;
  experience: string;
  rate?: number;
  rating?: number;
  image: string;
  bio?: string;
  availability?: string;
}

const BabysittingPage = () => {
  const [sitters, setSitters] = useState<Sitter[]>([]);
  const [selectedSitter, setSelectedSitter] = useState<Sitter | null>(null);
  const [form, setForm] = useState({ date: "", time: "", hours: "", yourName: "" });

  useEffect(() => {
    const storedSitters = getFromLocalStorage<Sitter[]>("littlejappy_sitters");
    if (storedSitters && storedSitters.length > 0) {
      setSitters(storedSitters);
    } else {
      setSitters(defaultSitters as Sitter[]);
    }
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.hours || !form.yourName) return;
    toast({
      title: `Booking request sent to ${selectedSitter?.name}!`,
      description: "(Demo) Your booking request has been submitted.",
    });
    setSelectedSitter(null);
    setForm({ date: "", time: "", hours: "", yourName: "" });
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Babysitting Services</h1>
        <p className="text-muted-foreground mb-8">Verified & caring sitters you can trust.</p>

        {sitters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No sitters available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sitters.map((sitter) => (
              <div key={sitter.id} className="bg-card rounded-2xl border border-border shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-baby-blue p-6 flex justify-center">
                  <img src={sitter.image} alt={sitter.name} className="w-28 h-28 rounded-full object-cover border-4 border-card shadow-md" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-foreground">{sitter.name}</h3>
                  <p className="text-muted-foreground text-sm">{sitter.experience}</p>
                  {sitter.rate && (
                    <p className="text-primary font-bold text-sm mt-1">${sitter.rate}/hr</p>
                  )}
                  {sitter.rating && (
                    <div className="flex gap-1 justify-center mt-2">
                      {Array.from({ length: sitter.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  )}
                  {sitter.bio && (
                    <p className="text-muted-foreground text-xs mt-2">{sitter.bio}</p>
                  )}
                  {sitter.availability && (
                    <p className="text-xs text-gray-600 mt-2">Available: {sitter.availability}</p>
                  )}
                  <button
                    onClick={() => setSelectedSitter(sitter)}
                    className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-colors"
                  >
                    Book Sitter
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedSitter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in relative">
            <button onClick={() => setSelectedSitter(null)} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-secondary">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-1">Book {selectedSitter.name}</h2>
            <p className="text-muted-foreground text-sm mb-6">{selectedSitter.experience}</p>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" /> Date
                </label>
                <input 
                  type="date" 
                  value={form.date} 
                  onChange={(e) => setForm({ ...form, date: e.target.value })} 
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4" /> Time
                </label>
                <input 
                  type="time" 
                  value={form.time} 
                  onChange={(e) => setForm({ ...form, time: e.target.value })} 
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4" /> Hours Needed
                </label>
                <input 
                  type="number" 
                  min={1} 
                  max={12} 
                  value={form.hours} 
                  onChange={(e) => setForm({ ...form, hours: e.target.value })} 
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" /> Your Name
                </label>
                <input 
                  type="text" 
                  value={form.yourName} 
                  onChange={(e) => setForm({ ...form, yourName: e.target.value })} 
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-accent hover:bg-baby-orange-dark text-accent-foreground font-bold py-3 rounded-xl transition-colors"
              >
                Submit Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BabysittingPage;
