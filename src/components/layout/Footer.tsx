import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { isMobile, cn } from '@/lib/utils';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 bg-noise text-slate-400 pt-32 pb-16 relative overflow-hidden">
      {/* Decorative Blur - Optimized */}
      <div className={cn(
        "absolute bottom-0 right-0 w-[30%] h-[30%] bg-blue-600/5 rounded-full pointer-events-none",
        !isMobile && "blur-[100px]"
      )} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center space-x-4 mb-10 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-premium overflow-hidden">
                <img src="/logo.png" alt="Conroe Detailing Logo" className="w-full h-full object-contain p-2" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white leading-none">CONROE</span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-500 leading-none">Detailing Co.</span>
              </div>
            </Link>
            <p className="text-lg leading-relaxed mb-10 max-w-sm font-medium">
              The pinnacle of mobile automotive restoration. We bring the studio experience to your doorstep, serving the most exclusive collections in Conroe.
            </p>
            <div className="flex space-x-6">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-500 shadow-glow-sm">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Navigation</h4>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-500 transition-colors">Services</Link></li>
              <li><Link to="/book" className="hover:text-blue-500 transition-colors">Reserve Now</Link></li>
              <li><Link to="/admin/login" className="hover:text-blue-500 transition-colors">Personnel</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Specialties</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Ceramic Coating Mastery</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Multi-Stage Correction</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Interior Sterilization</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Exotic Material Care</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Concierge Maintenance</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-10">Connect</h4>
            <ul className="space-y-8 text-sm">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Direct Line</div>
                  <span>(936) 555-0123</span>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin size={18} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Service Area</div>
                  <span>Conroe, The Woodlands & Houston Region</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          <p>© {new Date().getFullYear()} Conroe Detailing Co. — Artisans of Automotive Perfection.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Engagement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
