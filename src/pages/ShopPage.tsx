import { useEffect, useState } from "react";
import { ShoppingCart, Star, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { products as defaultProducts } from "@/lib/data";
import { addToCart, getFromLocalStorage, saveToLocalStorage } from "@/lib/storage";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock?: number;
  category?: string;
  description?: string;
}

interface Review {
  productId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ShopPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const auth = getFromLocalStorage<{ isAuthenticated: boolean; name: string }>("littlejappy_customer_auth");
    if (auth?.isAuthenticated) {
      setIsAuthenticated(true);
      setCustomerName(auth.name);
    }

    // Clear cached products if stale (old format or fewer products than default)
    const storedProducts = getFromLocalStorage<Product[]>("littlejappy_products");
    if (
      !storedProducts ||
      storedProducts.length === 0 ||
      storedProducts[0].description === undefined ||
      storedProducts.length < defaultProducts.length
    ) {
      localStorage.removeItem("littlejappy_products");
      setProducts(defaultProducts);
    } else {
      setProducts(storedProducts);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    
    // Save order
    const orders = getFromLocalStorage<any[]>("littlejappy_orders") || [];
    orders.push({
      customerName,
      items: [{ ...product, quantity: 1 }],
      total: product.price,
      createdAt: new Date().toISOString()
    });
    saveToLocalStorage("littlejappy_orders", orders);
    
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Baby Shop</h1>
            <p className="text-muted-foreground">Quality products for every milestone.</p>
          </div>
          {!isAuthenticated && (
            <Button onClick={() => navigate("/login")} className="bg-accent hover:bg-accent/90">
              Login to Shop
            </Button>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
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

const ProductCard = ({ 
  product, 
  onAddToCart, 
  isAuthenticated,
  customerName 
}: { 
  product: Product; 
  onAddToCart: (product: Product) => void;
  isAuthenticated: boolean;
  customerName: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [product.id]);

  const loadReviews = () => {
    const allReviews = getFromLocalStorage<Review[]>("littlejappy_reviews") || [];
    const productReviews = allReviews.filter(r => r.productId === product.id);
    setReviews(productReviews);
  };

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      toast.error("Please login to leave a review");
      return;
    }

    const auth = getFromLocalStorage<{ email: string }>("littlejappy_customer_auth");
    const allReviews = getFromLocalStorage<Review[]>("littlejappy_reviews") || [];
    
    const newReview: Review = {
      productId: product.id,
      customerName,
      customerEmail: auth?.email || "",
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    allReviews.push(newReview);
    saveToLocalStorage("littlejappy_reviews", allReviews);
    
    toast.success("Review submitted successfully!");
    setComment("");
    setRating(5);
    setIsOpen(false);
    loadReviews();
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="bg-baby-blue overflow-hidden flex items-center justify-center h-48">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
        {product.category && (
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full mt-1 inline-block">{product.category}</span>
        )}
        {product.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews.length})</span>
        </div>

        <p className="text-primary font-extrabold text-xl mt-2">KSh {product.price.toFixed(0)}</p>
        {product.stock !== undefined && (
          <p className="text-xs text-gray-600 mt-1">Stock: {product.stock}</p>
        )}
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Reviews for {product.name}</DialogTitle>
                <DialogDescription>See what others think and share your feedback</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {reviews.map((review, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{review.customerName}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No reviews yet. Be the first!</p>
                )}

                {isAuthenticated && (
                  <div className="space-y-3 pt-4 border-t">
                    <div>
                      <Label>Your Rating</Label>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star 
                              className={`w-6 h-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Your Review</Label>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={handleSubmitReview} 
                      className="w-full bg-accent hover:bg-accent/90"
                      disabled={!comment.trim()}
                    >
                      Submit Review
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
