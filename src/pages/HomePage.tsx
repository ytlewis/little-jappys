import { Link } from "react-router-dom";
import { ShoppingBag, Users, BookOpen, Heart, ArrowRight, Star, ShoppingCart, Lightbulb, Gift } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-mother-baby.png";

const features = [
  { icon: ShoppingBag, title: "Baby Shop", desc: "Quality Products for Every Milestone.", to: "/shop", color: "bg-baby-blue text-primary" },
  { icon: Users, title: "Babysitting", desc: "Verified & Caring Sitters.", to: "/babysitting", color: "bg-accent/20 text-accent-foreground" },
  { icon: BookOpen, title: "Parenting Tips", desc: "Milestone-Based Guidance.", to: "/parenting", color: "bg-secondary text-secondary-foreground" },
  { icon: Heart, title: "Give Back", desc: "Donate & Support Families.", to: "/donate", color: "bg-baby-cream text-foreground" },
];

const steps = [
  { icon: ShoppingCart, num: "1", title: "Shop & Book", desc: "Browse our shop and book trusted babysitters." },
  { icon: Lightbulb, num: "2", title: "Relax & Learn", desc: "Get parenting tips tailored to your baby's milestone." },
  { icon: Gift, num: "3", title: "Give Back", desc: "Donate gently used items to families in need." },
];

const testimonials = [
  { name: "Amina W.", text: "Little Jappy's made finding a trusted sitter so easy. I love the community feel!", rating: 5 },
  { name: "Grace K.", text: "The milestone-based parenting tips are a lifesaver for a first-time mom like me.", rating: 5 },
  { name: "Diana M.", text: "I donated my baby's outgrown clothes and it felt amazing knowing they'd help another family.", rating: 4 },
];

const HomePage = () => (
  <Layout>
    {/* Hero */}
    <section className="bg-baby-blue overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
            Where Care &<br />
            <span className="text-primary">Community</span> Meet
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-lg">
            Your one-stop platform for baby products, trusted babysitters, parenting guidance, and giving back to the community.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 bg-accent hover:bg-baby-orange-dark text-accent-foreground font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Explore the Shop <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img src={heroImage} alt="Mother and baby" className="w-full max-w-md animate-float" />
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-foreground mb-12">Everything Your Family Needs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <Link
            key={f.title}
            to={f.to}
            className="group bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-border"
          >
            <div className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
              <f.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
              Learn more <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>

    {/* How It Works */}
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                {s.num}
              </div>
              <s.icon className="w-8 h-8 mx-auto text-accent mb-3" />
              <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-foreground mb-12">What Moms Are Saying</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card rounded-2xl p-6 shadow-md border border-border">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm mb-4 italic">"{t.text}"</p>
            <p className="font-bold text-foreground text-sm">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default HomePage;
