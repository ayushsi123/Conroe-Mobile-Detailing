import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Car, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isMobile, cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Book Now', path: '/book' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? cn("py-4 shadow-2xl border-b border-white/5", isMobile ? "bg-slate-950" : "bg-slate-950/80 backdrop-blur-xl")
          : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-premium border border-white/10 overflow-hidden">
                <img src="/logo.png" alt="Conroe Detailing Logo" className="w-full h-full object-contain p-2" />
              </div>
              <motion.div 
                animate={isMobile ? {} : { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-3 -right-3 text-blue-400 transform-gpu"
              >
                <Sparkles size={24} fill="currentColor" />
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl sm:text-3xl font-black tracking-tighter leading-none transition-colors duration-500 ${isScrolled || isOpen ? 'text-white' : 'text-white'}`}>CONROE</span>
              <span className={`text-[10px] sm:text-[12px] font-bold tracking-[0.4em] uppercase leading-none transition-colors duration-500 ${isScrolled || isOpen ? 'text-blue-500' : 'text-blue-400'}`}>Detailing Co.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-xs font-black uppercase tracking-widest transition-all duration-500 hover:text-blue-500 relative group/link ${
                  location.pathname === link.path 
                    ? 'text-blue-500' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-500 group-hover/link:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
              </Link>
            ))}
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-sm font-black uppercase tracking-widest shadow-glow transition-all duration-500 hover:scale-105">
              <Link to="/book">Reserve Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-3 rounded-full transition-all duration-500 shadow-premium",
                isOpen 
                  ? "bg-white text-slate-950 fixed right-4 top-6 z-[10001] rotate-90" 
                  : isScrolled 
                    ? "bg-blue-600 text-white shadow-blue-500/30" 
                    : cn("border border-white/20 text-white", isMobile ? "bg-slate-900" : "bg-white/10 backdrop-blur-xl")
              )}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className={cn(
                "fixed inset-0 z-[9999] md:hidden",
                isMobile ? "bg-slate-950" : "bg-slate-950/90 backdrop-blur-xl"
              )}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={isMobile ? { duration: 0.3 } : { type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[85%] max-w-sm bg-slate-950 bg-noise z-[10000] p-12 pt-40 md:hidden flex flex-col shadow-3xl border-l border-white/5 transform-gpu"
            >
              <div className="flex flex-col space-y-10">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link 
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-black tracking-tighter transition-all duration-500 uppercase ${
                        location.pathname === link.path ? 'text-blue-500 scale-105 inline-block' : 'text-white hover:text-blue-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 space-y-12">
                <Button asChild className="w-full rounded-2xl h-20 text-xl font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 shadow-glow" onClick={() => setIsOpen(false)}>
                  <Link to="/book">Reserve Now</Link>
                </Button>
                
                <div className="pt-12 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4">Inquiry Hotline</p>
                  <a href="tel:9365550123" className="text-3xl font-black text-white hover:text-blue-400 transition-colors tracking-tight">
                    (936) 555-0123
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
