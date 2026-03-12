import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { sitters as defaultSitters } from "@/lib/data";
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
}

const BabysittingPage = () => {
  const navigate = useNavigate();
  const [sitters, setSitters] = useState<Sitter[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const auth = getFromLocalStorage<{ isAuthenticated: boolean; name: string }>("littlejappy_customer_auth");
    if (auth?.isAuthenticated) {
      setIsAuthenticated(true);
      setCustomerName(auth.name);
    }

    const storedSitters = getFromLocalStorage<Sitter[]>("littlejappy_sitters");
    if (storedSitters && storedSitters.length > 0) {
      setSitters(storedSitters);
    } else {
      setSitters(defaultSitters as Sitter[]);
    }
  }, []);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Babysitting Services</h1>
            <p className="text-muted-foreground">Verified & caring sitters you can trust.</p>
          </div>
          {!isAuthenticated && (
            <Button onClick={() => navigate("/login")} className="bg-accent hover:bg-accent/90">
              Login to Book
            </Button>
          )}
        </div>

        {sitters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No sitters available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sitters.map((sitter) => (
              <SitterCard 
                key={sitter.id} 
                sitter={sitter} 
                isAuthenticated={isAuthenticated}
                customerName={customerName}
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
  customerName 
}: { 
  sitter: Sitter; 
  isAuthenticated: boolean;
  customerName: string;
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    hours: "2",
    childAge: "",
    specialRequests: "",
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to book a babysitter");
      navigate("/login");
      return;
    }

    const booking = {
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

    const bookings = getFromLocalStorage<any[]>("littlejappy_bookings") || [];
    bookings.push(booking);
    saveToLocalStorage("littlejappy_bookings", bookings);

    toast.success(`Booking confirmed with ${sitter.name}!`);
    setIsOpen(false);
    setBookingData({
      date: "",
      time: "",
      hours: "2",
      childAge: "",
      specialRequests: "",
    });
  };

  const handleBookClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a babysitter");
      navigate("/login");
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="bg-baby-blue p-6 flex justify-center">
        <img src={sitter.image} alt={sitter.name} className="w-28 h-28 rounded-full object-cover border-4 border-card shadow-md" />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-foreground">{sitter.name}</h3>
        <p className="text-muted-foreground text-sm">{sitter.experience}</p>
        {sitter.rate && (
          <p className="text-primary font-bold text-sm mt-1">KSh {sitter.rate.toFixed(0)}/hr</p>
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
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              onClick={handleBookClick}
              className="mt-4 w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Book Sitter
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book {sitter.name}</DialogTitle>
              <DialogDescription>
                Fill in the details to book this babysitter
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hours">Hours Needed</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="1"
                    max="12"
                    value={bookingData.hours}
                    onChange={(e) => setBookingData({ ...bookingData, hours: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="childAge">Child's Age</Label>
                  <Input
                    id="childAge"
                    type="text"
                    placeholder="e.g., 2 years"
                    value={bookingData.childAge}
                    onChange={(e) => setBookingData({ ...bookingData, childAge: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special instructions or requirements..."
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between text-sm mb-1">
                  <span>Rate per hour:</span>
                  <span className="font-semibold">KSh {sitter.rate || 500}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Hours:</span>
                  <span className="font-semibold">{bookingData.hours}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-primary">
                    KSh {((sitter.rate || 500) * parseInt(bookingData.hours || "0")).toFixed(0)}
                  </span>
                </div>
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                Confirm Booking
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
