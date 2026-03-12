import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Baby, User, LogOut } from "lucide-react";
import { getCartCount, getFromLocalStorage, removeFromLocalStorage } from "@/lib/storage";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Baby Shop" },
  { to: "/babysitting", label: "Babysitting" },
  { to: "/parenting", label: "Parenting Tips" },
  { to: "/donate", label: "Give Back" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const updateCount = () => setCartCount(getCartCount());
    updateCount();
    
    const auth = getFromLocalStorage<{ isAuthenticated: boolean; name: string }>("littlejappy_customer_auth");
    if (auth?.isAuthenticated) {
      setIsAuthenticated(true);
      setCustomerName(auth.name);
    }
    
    window.addEventListener("storage", updateCount);
    window.addEventListener("cartUpdated", updateCount);
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, [location]);

  const handleLogout = () => {
    removeFromLocalStorage("littlejappy_customer_auth");
    setIsAuthenticated(false);
    setCustomerName("");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Baby className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            Little Jappy's
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart" className="relative ml-2 p-2 rounded-lg hover:bg-secondary transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm font-medium text-foreground">Hi, {customerName}</span>
              <Button onClick={handleLogout} variant="outline" size="sm" className="gap-1">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate("/login")} variant="default" size="sm" className="ml-2 gap-1 bg-accent hover:bg-accent/90">
              <User className="w-4 h-4" />
              Login
            </Button>
          )}
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 text-sm font-semibold border-b border-border transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="px-6 py-3 border-b border-border">
              <p className="text-sm font-medium mb-2">Hi, {customerName}</p>
              <Button onClick={handleLogout} variant="outline" size="sm" className="w-full gap-1">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="px-6 py-3">
              <Button onClick={() => { navigate("/login"); setMenuOpen(false); }} variant="default" size="sm" className="w-full gap-1 bg-accent hover:bg-accent/90">
                <User className="w-4 h-4" />
                Login
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
