import { motion } from "motion/react";
import { Heart, Sparkles, ChevronDown } from "lucide-react";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 select-none">
      {/* Decorative Floating Blobs for Aurora effect */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full aurora-glow-1 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full aurora-glow-2 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full aurora-glow-3 blur-3xl opacity-30 pointer-events-none" />

      {/* Main glass card container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl px-8 py-14 text-center glass-panel rounded-3xl shadow-2xl relative z-10 border border-white/60"
      >
        {/* Sparkle icons floating */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -left-4 text-amber-500/40 hidden sm:block"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-6 -right-4 text-rose-400/40 hidden sm:block"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>

        {/* Pulsing heart logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center shadow-md mb-8 cursor-pointer border border-rose-100"
        >
          <Heart className="w-8 h-8 text-rose-500 fill-rose-300" />
        </motion.div>

        {/* Small Tagline */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          animate={{ opacity: 0.6, letterSpacing: "0.15em" }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xs uppercase font-sans font-semibold tracking-widest text-rose-900/80 mb-4"
        >
          A Celestial Digital Note for Amyy
        </motion.p>

        {/* High-end cinematic display title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient leading-tight tracking-tight mb-6"
        >
          Amyy, <br />
          <span className="italic font-normal">You Deserve Something</span> <br />
          <span className="text-gradient-rose">Truly Special ❤️</span>
        </motion.h1>

        {/* Brief elegant message descriptor */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-sm md:text-base font-sans font-light text-rose-950/70 max-w-md mx-auto leading-relaxed mb-10"
        >
          Welcome to a cinematic tribute of moments, feelings, and promises. Take a breath, put on your headphones to hear the beautiful celestial ambient melody, and embark on a little journey of the heart.
        </motion.p>

        {/* Immersive magnetic style button */}
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(183,110,121,0.15)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="px-8 py-4 bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300 text-white rounded-full font-sans font-semibold shadow-lg text-sm tracking-wider uppercase cursor-pointer hover:brightness-105 transition-all duration-300 flex items-center gap-2 mx-auto border border-rose-200"
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "8s" }} />
          Open My Heart
        </motion.button>
      </motion.div>

      {/* Decorative footer scrolling hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 text-[11px] uppercase tracking-widest font-medium text-rose-950/50"
      >
        <span>Interact to unlock sound</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </div>
  );
}
