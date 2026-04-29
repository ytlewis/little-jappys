import { useState, useEffect } from "react";
import { Star, Clock, MapPin, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { sitters as defaultSitters } from "@/lib/data";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Sitter {
  id: string;
  name: string;
  experience: string;
  rate?: number;
  rating?: number;
  image: string;
  bio?: string;
  availability?: string;
  location?: string;
  distanceKm?: number;
  availableSlots?: string[];
  isBooked?: boolean;
}

interface Booking {
  id: string;
  sitterName: string;
  sitterId: string;
  customerName: string;
  date: string;
  time: string;
  hours: number;
  childAge: string;
  specialRequests: string;
  status: string;
  createdAt: string;
  rate: number;
  total: number;
}

// Enrich default sitters with location and availability data
const enrichSitters = (sitters: Sitter[]): Sitter[] => {
  const locations = ["Westlands, Nairobi", "Kilimani, Nairobi", "Karen, Nairobi", "Lavington, Nairobi", "Parklands, Nairobi", "Kileleshwa, Nairobi"];
  const slots = [
    ["Mon–Fri 8am–6pm", "Weekends 9am–5pm"],
    ["Mon–Wed 7am–4pm", "Fri–Sun 10am–8pm"],
    ["Tue–Sat 9am–7pm"],
    ["Mon–Thu 8am–5pm", "Sat 9am–3pm"],
    ["Weekdays 7am–6pm"],
    ["Mon–Fri 9am–6pm", "Sat–Sun 8am–4pm"],
  ];
  return sitters.map((s, i) => ({
    ...s,
    location: s.location || locations[i % locations.length],
    distanceKm: s.distanceKm || parseFloat((Math.random() * 9 + 0.5).toFixed(1)),
    availableSlots: s.availableSlots || slots[i % slots.length],
    rate: s.rate || 500,
  }));
};

const BabysittingPage = () => {
  const navigate = useNavigate();
  const [sitters, setSitters] = useState<Sitter[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [filter, setFilter] = useState<"all" | "available" | "booked">("all");

  useEffect(() => {
    const auth = getFromLocalStorage<{ isAuthenticated: boolean; name: string }>("littlejappy_customer_auth");
    if (auth?.isAuthenticated) {
      setIsAuthenticated(true);
      setCustomerName(auth.name);
    }

    const storedSitters = getFromLocalStorage<Sitter[]>("littlejappy_sitters");
    const base = storedSitters && storedSitters.length > 0 ? storedSitters : (defaultSitters as Sitter[]);
    setSitters(enrichSitters(base));

    const storedBookings = getFromLocalStorage<Booking[]>("littlejappy_bookings") || [];
    setBookings(storedBookings);
  }, []);

  const bookedSitterIds = new Set(
    bookings.filter(b => b.status === "confirmed" || b.status === "pending").map(b => b.sitterId)
  );

  const filteredSitters = sitters.filter(s => {
    if (filter === "available") return !bookedSitterIds.has(s.id);
    if (filter === "booked") return bookedSitterIds.has(s.id);
    return true;
  });

  const refreshBookings = () => {
    setBookings(getFromLocalStorage<Booking[]>("littlejappy_bookings") || []);
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Babysitting Services</h1>
            <p className="text-muted-foreground">Verified & caring sitters near you.</p>
          </div>
          {!isAuthenticated && (
            <Button onClick={() => navigate("/login")} className="bg-accent hover:bg-accent/90">
              Login to Book
            </Button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(["all", "available", "booked"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors capitalize ${filter === f ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              {f === "all" ? `All Sitters (${sitters.length})` : f === "available" ? `Available (${sitters.filter(s => !bookedSitterIds.has(s.id)).length})` : `Booked (${bookedSitterIds.size})`}
            </button>
          ))}
        </div>

        {filteredSitters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No sitters found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSitters.map((sitter) => (
              <SitterCard
                key={sitter.id}
                sitter={sitter}
                isAuthenticated={isAuthenticated}
                customerName={customerName}
                isBooked={bookedSitterIds.has(sitter.id)}
                bookings={bookings.filter(b => b.sitterId === sitter.id)}
                onBooked={refreshBookings}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default BabysittingPage;

const SitterCard = ({
  sitter,
  isAuthenticated,
  customerName,
  isBooked,
  bookings,
  onBooked,
}: {
  sitter: Sitter;
  isAuthenticated: boolean;
  customerName: string;
  isBooked: boolean;
  bookings: Booking[];
  onBooked: () => void;
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ date: "", time: "", hours: "2", childAge: "", specialRequests: "" });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to book a babysitter");
      navigate("/login");
      return;
    }
    const booking: Booking = {
      id: `b${Date.now()}`,
      sitterName: sitter.name,
      sitterId: sitter.id,
      customerName,
      date: bookingData.date,
      time: bookingData.time,
      hours: parseInt(bookingData.hours),
      childAge: bookingData.childAge,
      specialRequests: bookingData.specialRequests,
      status: "pending",
      createdAt: new Date().toISOString(),
      rate: sitter.rate || 500,
      total: (sitter.rate || 500) * parseInt(bookingData.hours),
    };
    const all = getFromLocalStorage<Booking[]>("littlejappy_bookings") || [];
    all.push(booking);
    saveToLocalStorage("littlejappy_bookings", all);
    toast.success(`Booking request sent to ${sitter.name}! You'll be notified once confirmed.`);
    setIsOpen(false);
    setBookingData({ date: "", time: "", hours: "2", childAge: "", specialRequests: "" });
    onBooked();
  };

  return (
    <div className={`bg-card rounded-2xl border shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 ${isBooked ? "border-orange-300" : "border-border"}`}>
      {/* Status banner */}
      {isBooked && (
        <div className="bg-orange-100 text-orange-700 text-xs font-semibold text-center py-1.5 flex items-center justify-center gap-1">
          <Calendar className="w-3 h-3" /> Currently Booked
        </div>
      )}
      {!isBooked && (
        <div className="bg-green-50 text-green-700 text-xs font-semibold text-center py-1.5 flex items-center justify-center gap-1">
          <CheckCircle className="w-3 h-3" /> Available
        </div>
      )}

      <div className="bg-baby-blue p-5 flex justify-center">
        <img src={sitter.image} alt={sitter.name} className="w-24 h-24 rounded-full object-cover border-4 border-card shadow-md" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold text-foreground">{sitter.name}</h3>
          {sitter.rating && (
            <div className="flex gap-0.5">
              {Array.from({ length: sitter.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
              ))}
            </div>
          )}
        </div>

        <p className="text-muted-foreground text-sm mb-3">{sitter.experience}</p>

        {sitter.bio && <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{sitter.bio}</p>}

        <div className="space-y-1.5 mb-4">
          {sitter.location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{sitter.location}</span>
              {sitter.distanceKm && (
                <Badge variant="secondary" className="ml-auto text-xs">{sitter.distanceKm} km away</Badge>
              )}
            </div>
          )}
          {sitter.availableSlots && sitter.availableSlots.map((slot, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>{slot}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-primary font-bold">KSh {sitter.rate || 500}/hr</span>
        </div>

        {/* Show existing bookings for this sitter */}
        {bookings.length > 0 && (
          <div className="mb-3 space-y-1">
            {bookings.slice(0, 2).map(b => (
              <div key={b.id} className="text-xs bg-orange-50 text-orange-700 rounded-lg px-3 py-1.5 flex items-center justify-between">
                <span>Booked: {b.date} at {b.time}</span>
                <Badge variant="outline" className="text-xs border-orange-300 text-orange-600">{b.status}</Badge>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => { if (!isAuthenticated) { toast.error("Please login to book"); navigate("/login"); return; } setIsOpen(true); }}
              className={`w-full font-semibold py-3 rounded-xl transition-colors ${isBooked ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-accent hover:bg-accent/90 text-white"}`}
            >
              {isBooked ? "Book Anyway" : "Book Sitter"}
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book {sitter.name}</DialogTitle>
              <DialogDescription>Fill in the details to request this babysitter</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input type="date" value={bookingData.date} onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })} min={new Date().toISOString().split("T")[0]} required />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input type="time" value={bookingData.time} onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hours Needed</Label>
                  <Input type="number" min="1" max="12" value={bookingData.hours} onChange={(e) => setBookingData({ ...bookingData, hours: e.target.value })} required />
                </div>
                <div>
                  <Label>Child's Age</Label>
                  <Input placeholder="e.g., 2 years" value={bookingData.childAge} onChange={(e) => setBookingData({ ...bookingData, childAge: e.target.value })} required />
                </div>
              </div>
              <div>
                <Label>Special Requests (Optional)</Label>
                <Textarea placeholder="Any special instructions..." value={bookingData.specialRequests} onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })} rows={3} />
              </div>
              <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                <div className="flex justify-between"><span>Rate/hr:</span><span className="font-semibold">KSh {sitter.rate || 500}</span></div>
                <div className="flex justify-between"><span>Hours:</span><span className="font-semibold">{bookingData.hours}</span></div>
                <div className="flex justify-between border-t border-border pt-2 mt-1"><span className="font-bold">Total:</span><span className="font-bold text-primary">KSh {((sitter.rate || 500) * parseInt(bookingData.hours || "0")).toFixed(0)}</span></div>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Confirm Booking</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
