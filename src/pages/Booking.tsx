import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CheckCircle2, Loader2, Calendar, Phone, Mail, User, Info, Clock, Sparkles } from 'lucide-react';
import SEO from '@/components/SEO';

const services = [
  { id: 'eco-wash', name: 'Eco Exterior Wash ($45)', price: 45 },
  { id: 'basic-interior', name: 'Basic Interior Refresh ($75)', price: 75 },
  { id: 'full-interior', name: 'Full Interior Deep Clean ($150)', price: 150 },
  { id: 'full-detail', name: 'Premium Full Detail ($280)', price: 280 },
  { id: 'paint-correction', name: 'Paint Correction ($400+)', price: 400 },
  { id: 'ceramic-coating', name: 'Ceramic Coating ($650+)', price: 650 },
];

const Booking: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    date: '',
    time: '09:00',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedService = services.find(s => s.id === formData.serviceId);
      
      await addDoc(collection(db, 'bookings'), {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        serviceId: formData.serviceId,
        serviceName: selectedService?.name || 'Unknown',
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        totalPrice: selectedService?.price || 0,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-4 flex items-center justify-center min-h-screen bg-slate-950 bg-noise relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md w-full glass p-12 rounded-[3rem] shadow-premium text-center relative z-10 border-white/10"
        >
          <div className="w-24 h-24 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-glow">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black mb-6 text-white tracking-tighter uppercase">Request Received</h2>
          <p className="text-slate-400 mb-10 leading-relaxed font-medium text-lg">
            Thank you for choosing Conroe's finest. We've received your request for <strong>{formData.date}</strong>. 
            A specialist will contact you within 2 hours to confirm your premium experience.
          </p>
          <Button asChild className="w-full rounded-2xl h-16 text-lg font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 shadow-glow transition-all duration-500">
            <a href="/">Return to Home</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 bg-slate-950 bg-noise min-h-screen relative overflow-hidden">
      <SEO 
        title="Reserve Your Session" 
        description="Book your premium detailing experience. Secure your slot for Conroe's finest automotive care."
      />
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="mb-14">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-3 glass-dark px-5 py-2.5 rounded-full mb-8"
              >
                <Sparkles size={14} className="text-blue-400" />
                <span className="text-blue-400 font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase">Elite Reservation</span>
              </motion.div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white text-gradient">
                RESERVE YOUR <br /> <span className="text-blue-600 text-gradient-blue">EXPERIENCE</span>.
              </h1>
              <p className="text-slate-400 text-xl max-w-xl font-medium leading-relaxed">
                Provide your details below to schedule a transformation. Our master detailers will bring the studio directly to your doorstep.
              </p>
            </div>

            <div className="glass-dark p-6 sm:p-10 md:p-14 rounded-[2.5rem] sm:rounded-[4rem] shadow-premium border-white/5">
              <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                  <div className="space-y-3 sm:space-y-4">
                    <Label htmlFor="name" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                      <Input 
                        id="name" 
                        placeholder="John Wick" 
                        required 
                        className="rounded-xl sm:rounded-2xl h-14 sm:h-16 bg-white/5 border-white/10 text-white pl-12 focus:ring-blue-600 focus:border-blue-600 transition-all placeholder:text-slate-700 text-sm sm:text-base"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <Label htmlFor="email" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@detailing.com" 
                        required 
                        className="rounded-xl sm:rounded-2xl h-14 sm:h-16 bg-white/5 border-white/10 text-white pl-12 focus:ring-blue-600 focus:border-blue-600 transition-all placeholder:text-slate-700 text-sm sm:text-base"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                  <div className="space-y-3 sm:space-y-4">
                    <Label htmlFor="phone" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="(936) 555-0123" 
                        required 
                        className="rounded-xl sm:rounded-2xl h-14 sm:h-16 bg-white/5 border-white/10 text-white pl-12 focus:ring-blue-600 focus:border-blue-600 transition-all placeholder:text-slate-700 text-sm sm:text-base"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <Label htmlFor="service" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Package Choice</Label>
                    <div className="relative">
                      <Info className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                      <select 
                        id="service"
                        className="flex h-14 sm:h-16 w-full items-center justify-between rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-12 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                        required
                        value={formData.serviceId}
                        onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                      >
                        <option value="" className="bg-slate-900">Select your mastery...</option>
                        {services.map(s => (
                          <option key={s.id} value={s.id} className="bg-slate-900">{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                  <div className="space-y-3 sm:space-y-4">
                    <Label htmlFor="date" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Preferred Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                      <Input 
                        id="date" 
                        type="date" 
                        required 
                        className="rounded-xl sm:rounded-2xl h-14 sm:h-16 bg-white/5 border-white/10 text-white pl-12 focus:ring-blue-600 focus:border-blue-600 transition-all text-sm"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <Label htmlFor="time" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Preferred Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                      <select 
                        id="time"
                        className="flex h-14 sm:h-16 w-full items-center justify-between rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-12 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      >
                        {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map(t => (
                          <option key={t} value={t} className="bg-slate-900">{t} AM/PM</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <Label htmlFor="notes" className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Bespoke Instructions</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="e.g. Vintage 1967 Mustang, handle with extreme care..." 
                    className="rounded-xl sm:rounded-2xl min-h-[120px] sm:min-h-[160px] bg-white/5 border-white/10 text-white focus:ring-blue-600 focus:border-blue-600 placeholder:text-slate-700 text-sm sm:text-base"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full rounded-xl sm:rounded-2xl h-16 sm:h-20 text-lg sm:text-xl font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 shadow-glow transition-all duration-500"
                >
                  {loading ? <><Loader2 className="animate-spin mr-3" /> Securing Slot...</> : "Confirm Reservation"}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 lg:sticky lg:top-40 space-y-10"
          >
            <div className="glass p-12 rounded-[4rem] border-white/10 shadow-premium">
              <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase text-white">The Protocol</h3>
              <div className="space-y-10">
                {[
                  {
                    icon: <Info size={24} />,
                    title: "Rapid Confirmation",
                    desc: "Our concierge team reviews every reservation within 2 hours. Expect a personalized call to discuss your vehicle's specific needs."
                  },
                  {
                    icon: <Clock size={24} />,
                    title: "Punctuality Guarantee",
                    desc: "Operating 8:00 AM - 6:00 PM. Our master detailers arrive with precision timing, respecting your schedule and your property."
                  },
                  {
                    icon: <Sparkles size={24} />,
                    title: "Bespoke Preparation",
                    desc: "While we bring our own purified water and silent power systems, please notify us of any restricted access points in advance."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-white text-lg uppercase tracking-tight mb-2">{item.title}</h4>
                      <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[2.5rem] sm:rounded-[4rem] h-64 sm:h-80 shadow-premium border border-white/10 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional Detailing" 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-8 sm:p-10">
                <div>
                  <div className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase mb-3">Legacy of Excellence</div>
                  <div className="text-2xl font-black text-white tracking-tighter uppercase leading-tight">100% Satisfaction or a <br /> Full Restitution.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
