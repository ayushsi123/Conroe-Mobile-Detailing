import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Star, Sparkles, MapPin, Clock, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll';
import SEO from '@/components/SEO';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 1.6 
      });

      gsap.from(".hero-desc", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 1.9
      });

      gsap.from(".hero-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 2.1
      });

      // Parallax Hero
      gsap.to(".hero-img", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 200,
        ease: "none"
      });

      // Scroll Reveal
      const revealElements = gsap.utils.toArray<HTMLElement>(".scroll-reveal");
      revealElements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });

      // Stats Animation
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 75%",
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden bg-slate-950 bg-noise">
      <SEO 
        title="Home" 
        description="Experience the pinnacle of automotive care in Conroe, TX. Award-winning mobile detailing, ceramic coating, and paint correction."
      />
      {/* Decorative Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="hero-section relative h-[100svh] min-h-[700px] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=75&w=1600" 
              alt="Clean car dashboard" 
              className="hero-img w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="inline-flex items-center space-x-3 glass-dark px-5 py-2.5 rounded-full mb-10"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              <span className="text-blue-400 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase">Conroe's Premier Detailing Studio</span>
            </motion.div>
            
            <h1 className="hero-title text-6xl sm:text-7xl md:text-[9rem] font-black font-display text-white tracking-tighter leading-[0.85] mb-10 drop-shadow-2xl text-gradient">
              THE ART OF <br className="hidden sm:block" /> <span className="text-blue-500">PERFECTION</span>.
            </h1>
            
            <p className="hero-desc text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto md:mx-0 mb-14 leading-relaxed font-medium">
              We don't just wash cars; we curate experiences. Elevating every surface through meticulous craftsmanship and scientific precision.
            </p>
            
            <div className="hero-btn flex flex-col sm:flex-row justify-center md:justify-start gap-6">
              <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-12 h-20 text-xl font-bold shadow-glow group transition-all duration-500 hover:scale-105">
                <Link to="/book" className="flex items-center">
                  Start Your Transformation <motion.span animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="ml-3">→</motion.span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-white/10 text-white hover:bg-white/5 px-12 h-20 text-xl font-bold backdrop-blur-md transition-all duration-500 hover:border-white/30">
                <Link to="/services">Discover Services</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-blue-600 to-transparent" />
        </motion.div>
      </section>

      {/* Features - Asymmetric Editorial Layout */}
      <section className="py-20 sm:py-32 relative bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-20 lg:gap-32 items-start">
            <div className="space-y-12 sticky top-32">
              <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Why Us</span>
              </div>
              <h2 className="scroll-reveal text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                UNCOMPROMISED <br /> <span className="text-blue-600 text-gradient-blue">STANDARDS</span>.
              </h2>
              <p className="scroll-reveal text-slate-400 text-lg md:text-2xl leading-relaxed max-w-xl">
                In a world of quick washes, we choose the long road. Every vehicle that enters our care is treated as a masterpiece in waiting.
              </p>
              <div className="scroll-reveal pt-8">
                <div className="flex items-center space-x-6 text-white/20">
                  <div className="h-px w-16 bg-white/20" />
                  <span className="text-xs uppercase tracking-[0.5em] font-black">Elite Detailing</span>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10">
              {[
                {
                  icon: <ShieldCheck className="text-blue-500" size={56} />,
                  title: "Molecular Protection",
                  desc: "We use advanced ceramic compounds that bond at a molecular level for lifetime durability."
                },
                {
                  icon: <Clock className="text-blue-500" size={56} />,
                  title: "Concierge Service",
                  desc: "Our mobile studio comes to you, providing a seamless luxury experience without leaving your home."
                },
                {
                  icon: <Sparkles className="text-blue-500" size={56} />,
                  title: "Master Detailers",
                  desc: "Certified professionals with over 15 years of experience in exotic and classic car restoration."
                },
                {
                  icon: <MapPin className="text-blue-500" size={56} />,
                  title: "Conroe Exclusive",
                  desc: "The highest-rated detailing service in the region, trusted by the local enthusiast community."
                }
              ].map((item, idx) => (
                <div key={idx} className="scroll-reveal glass-dark p-12 lg:p-16 rounded-[4rem] hover:bg-slate-900/90 transition-all duration-700 hover:-translate-y-4 group border border-white/10 hover:border-blue-500/40 shadow-premium">
                  <div className="mb-12 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 text-blue-500 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">{item.icon}</div>
                  <h3 className="text-3xl md:text-4xl font-black mb-6 text-white tracking-tight uppercase">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20 sm:py-32 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <h2 className="scroll-reveal text-6xl md:text-9xl font-black tracking-tighter text-white/5 absolute left-1/2 -translate-x-1/2 top-[-10%] select-none">PORTFOLIO</h2>
          <h2 className="scroll-reveal text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            THE <span className="text-blue-600">GALLERY</span>.
          </h2>
          <p className="scroll-reveal text-slate-500 max-w-2xl mx-auto text-lg">
            A visual testament to our obsession with detail. Hover to explore our recent transformations.
          </p>
        </div>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {[
              "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=70&w=1000",
              "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=70&w=1000",
              "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=70&w=1000",
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=70&w=1000",
              "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=70&w=1000",
              "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=70&w=1000"
            ].map((img, idx) => (
              <div key={idx} className="embla__slide flex-[0_0_90%] sm:flex-[0_0_60%] lg:flex-[0_0_45%] min-w-0 pr-8">
                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden group shadow-2xl border border-white/5">
                  <img 
                    src={img} 
                    alt={`Project ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.5] group-hover:grayscale-0" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                    <span className="text-blue-500 text-xs font-black tracking-[0.5em] mb-4 uppercase">Project {idx + 1}</span>
                    <h4 className="text-3xl font-bold text-white tracking-tighter">Full Ceramic Coating & Restoration</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview - Luxury Cards */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="scroll-reveal text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8">
              LEVELS OF <span className="text-blue-600">LUXURY</span>.
            </h2>
            <p className="scroll-reveal text-slate-400 text-xl max-w-2xl mx-auto">
              Tailored protection and restoration packages designed for the most discerning automotive enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "The Essential",
                price: "$150",
                img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=70&w=600",
                features: ["Paint Decontamination", "Deep Wheel Clean", "Leather Enrichment"]
              },
              {
                name: "The Signature",
                price: "$350",
                img: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=70&w=600",
                features: ["Clay Bar Mastery", "1-Step Paint Enhancement", "Engine Bay Aesthetic"],
                popular: true
              },
              {
                name: "The Bespoke",
                price: "$850+",
                img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=70&w=600",
                features: ["Ceramic Pro Coating", "Paint Correction Level 2", "Interior Nano-Shield"]
              }
            ].map((pkg, idx) => (
              <div 
                key={idx} 
                className={`scroll-reveal relative group rounded-[3.5rem] overflow-hidden transition-all duration-700 ${pkg.popular ? 'bg-blue-600 shadow-[0_0_80px_-20px_rgba(37,99,235,0.4)] scale-105 z-10' : 'bg-slate-900/50 hover:bg-slate-900 shadow-xl'}`}
              >
                <div className="h-80 overflow-hidden relative">
                  <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute bottom-8 left-10">
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{pkg.name}</h3>
                  </div>
                </div>
                <div className="p-10">
                  <div className={`font-black text-4xl mb-8 ${pkg.popular ? 'text-white' : 'text-blue-500'}`}>{pkg.price}</div>
                  <ul className="space-y-5 mb-12">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center text-slate-300 font-medium">
                        <CheckCircle2 size={20} className={`mr-4 ${pkg.popular ? 'text-white' : 'text-blue-500'} shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className={`w-full rounded-full h-16 text-lg font-bold shadow-xl transition-all duration-500 ${pkg.popular ? 'bg-white text-blue-600 hover:bg-slate-100' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                    <Link to="/book">Reserve Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Ultra Premium */}
      <section className="py-24 sm:py-40 px-4 relative">
        <div className="max-w-6xl mx-auto glass rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-premium">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10" />
          
          <div className="relative z-10">
            <h2 className="scroll-reveal sm:text-6xl text-4xl md:text-[8rem] font-black font-display text-white mb-10 tracking-tighter leading-none">
              EXPERIENCE <br /> <span className="text-blue-600">IMMORTALITY</span>.
            </h2>
            <p className="scroll-reveal text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed">
              Protect your investment with the world's most advanced detailing techniques. Limited slots available for Conroe's finest vehicles.
            </p>
            <div className="scroll-reveal flex flex-col sm:flex-row justify-center items-center gap-8">
              <Button
  asChild
  className="rounded-full bg-blue-600 hover:bg-blue-700
  px-8 sm:px-14
  h-14 sm:h-20
  text-base sm:text-xl
  font-bold
  shadow-glow
  transition-all duration-500 hover:scale-105
  w-full sm:w-auto"
>
                <Link to="/book">Schedule Transformation</Link>
              </Button>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex -space-x-4 mb-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-950 overflow-hidden shadow-2xl">
                      <img src={`/avatar${i}.png`} alt={`Happy Customer ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-slate-950 bg-blue-600 flex items-center justify-center text-white text-xs font-black shadow-2xl">
                    +150
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex text-yellow-500 mb-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                  <p className="text-xs uppercase tracking-widest font-black text-white/40">Verified Local Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
