import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Car, Sparkles } from 'lucide-react';

export const Preloader: React.FC = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      }
    });

    // Safety timeout to ensure preloader always clears
    const safetyTimeout = setTimeout(() => {
      if (preloaderRef.current && preloaderRef.current.style.display !== 'none') {
        preloaderRef.current.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }, 5000);

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "expo.out"
    })
    .to(textRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 0.4,
      delay: 0.3,
      ease: "power2.in"
    })
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "expo.inOut"
    }, "-=0.1");

    return () => {
      clearTimeout(safetyTimeout);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 w-screen h-screen overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div 
        ref={textRef}
        className="relative z-10 flex flex-col items-center opacity-0 translate-y-10"
      >
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/10 overflow-hidden mb-10">
          <img src="/logo.png" alt="Conroe Detailing Logo" className="w-full h-full object-contain p-3 scale-110" />
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-[0.3em] uppercase mb-4 text-gradient">Conroe</h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-12 bg-blue-600" />
            <p className="text-blue-500 font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase whitespace-nowrap">Detailing Co.</p>
            <div className="h-px w-12 bg-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
