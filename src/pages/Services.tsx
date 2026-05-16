import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Info, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const services = [
  {
    id: 'eco-wash',
    category: 'Exterior',
    name: 'Eco Exterior Wash',
    description: 'A gentle yet effective hand wash for regular maintenance.',
    price: '$45',
    duration: '45 mins',
    features: ['Hand Wash & Dry', 'Wheel Cleaning', 'Tire Dressing', 'Exterior Glass Cleaning']
  },
  {
    id: 'basic-interior',
    category: 'Interior',
    name: 'Basic Interior Refresh',
    description: 'Essential cleaning for a tidy cabin.',
    price: '$75',
    duration: '1.5 hours',
    features: ['Vacuum Seats & Carpets', 'Dashboard Dusting', 'Interior Glass', 'Door Jamb Cleaning']
  },
  {
    id: 'full-interior',
    category: 'Interior',
    name: 'Full Interior Deep Clean',
    description: 'Comprehensive restorative cleaning for the inside of your vehicle.',
    price: '$150',
    duration: '3 hours',
    features: ['Steam Cleaning', 'Stain Extraction', 'Leather/Vinyl Conditioning', 'Odor Neutralization'],
    hot: true
  },
  {
    id: 'full-detail',
    category: 'Full Detail',
    name: 'Premium Full Detail',
    description: 'The ultimate care package for both inside and out.',
    price: '$280',
    duration: '5 hours',
    features: ['Exterior Hand Wax', 'Clay Bar Treatment', 'Full Interior Deep Clean', 'Engine Bay Cleaning'],
    hot: true
  },
  {
    id: 'paint-correction',
    category: 'Full Detail',
    name: 'Paint Correction',
    description: 'Remove swirls and scratches to restore that mirror-like finish.',
    price: '$400+',
    duration: '8+ hours',
    features: ['Multi-Stage Machine Polishing', 'Surface Decontamination', 'Iron Removal', 'Swirl Free Finish']
  },
  {
    id: 'ceramic-coating',
    category: 'Full Detail',
    name: 'Ceramic Coating',
    description: 'Long-term protection and insane gloss for years to come.',
    price: '$650+',
    duration: '12+ hours',
    features: ['3+ Year Protection', 'Extreme Water Beading', 'UV Resistance', 'Easier Maintenance']
  }
];

const Services: React.FC = () => {
  return (
    <div className="pt-40 pb-32 bg-slate-950 bg-noise min-h-screen relative overflow-hidden">
      <SEO 
        title="Our Services" 
        description="Explore our elite detailing packages. From ceramic coating to master paint correction, we provide bespoke care for Conroe's finest collections."
      />
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 glass-dark px-5 py-2.5 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-blue-400 font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase">Our Curated Packages</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white text-gradient"
          >
            CHOOSE YOUR <br /> <span className="text-blue-600 text-gradient-blue">MASTERY</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Specialized detailing protocols tailored for the world's most discerning owners. 
            Mobile, meticulous, and unmatched.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <Card className={`h-full flex flex-col glass-dark border-none shadow-premium hover:shadow-glow transition-all duration-700 relative overflow-hidden group hover:-translate-y-4`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {service.hot && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/20">
                      Signature Series
                    </div>
                  </div>
                )}
                
                <CardHeader className="p-10 pb-6">
                  <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">{service.category}</div>
                  <CardTitle className="text-3xl font-black text-white tracking-tighter uppercase group-hover:text-blue-400 transition-colors duration-500">{service.name}</CardTitle>
                  <CardDescription className="text-slate-500 mt-4 text-base font-medium leading-relaxed italic">
                    "{service.description}"
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-10 pb-10 flex-grow">
                  <div className="flex items-center space-x-3 text-[10px] text-slate-500 mb-10 font-black uppercase tracking-widest border-b border-white/5 pb-4">
                    <Clock size={14} className="text-blue-500" />
                    <span>Duration: {service.duration}</span>
                  </div>
                  <div className="space-y-5">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start text-sm">
                        <CheckCircle2 size={18} className="text-blue-600 mr-4 mt-0.5 shrink-0" />
                        <span className="text-slate-400 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-10 pt-0 flex flex-col space-y-6">
                  <div className="flex items-baseline justify-between w-full border-t border-white/5 pt-8">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Pricing From</div>
                    <div className="text-4xl font-black text-white tracking-tighter text-gradient">{service.price}</div>
                  </div>
                  <Button asChild className="w-full rounded-2xl h-16 text-lg font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-500/20 transition-all duration-500" variant={service.hot ? "default" : "secondary"}>
                    <Link to="/book" className="flex items-center justify-center">
                      Reserve Slot <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Extra Info - High End Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-16 glass rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between border-white/10 shadow-premium overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent" />
          <div className="max-w-2xl mb-12 lg:mb-0 relative z-10">
            <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase">Bespoke Solutions</h3>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              For exotic collections, maritime vessels, or private aviation. 
              Our master detailers provide customized quote structures for multi-vehicle fleets and specialty restorations.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full px-12 h-20 text-xl font-black uppercase tracking-widest bg-white text-slate-900 hover:bg-blue-50 transition-all duration-500 relative z-10">
            <a href="tel:9365550123" className="flex items-center">
              Direct Inquiry <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="ml-3">📞</motion.span>
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
