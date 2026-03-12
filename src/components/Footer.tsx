import { Baby, Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-10 mt-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Baby className="w-8 h-8 text-teal-600" />
          </div>
          <span className="text-lg font-bold">Little Jappy's</span>
        </div>
        <p className="text-sm opacity-80 flex items-center gap-1">
          Made with <Heart className="w-4 h-4 fill-current" /> for families everywhere
        </p>
      </div>
      <div className="mt-6 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-70">
        © 2026 Little Jappy's. Developed by Sapenzia Musyoka. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
