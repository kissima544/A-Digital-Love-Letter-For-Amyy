import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";

import AmbientBackground from "./components/AmbientBackground";
import AudioPlayer from "./components/AudioPlayer";
import LandingPage from "./components/LandingPage";
import PolaroidGallery from "./components/PolaroidGallery";
import AmazingCards from "./components/AmazingCards";
import Timeline from "./components/Timeline";
import HandwrittenLetter from "./components/HandwrittenLetter";
import QuoteSection from "./components/QuoteSection";
import EndingSection from "./components/EndingSection";

export default function App() {
  const [isExperienceStarted, setIsExperienceStarted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scrolling to drive the top liquid gold progress bar
  useEffect(() => {
    if (!isExperienceStarted) return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExperienceStarted]);

  return (
    <div className="relative min-h-screen font-sans bg-[#fffafb] overflow-x-hidden select-none">
      <AnimatePresence mode="wait">
        {!isExperienceStarted ? (
          /* Landing Entrance Page overlay */
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <LandingPage onEnter={() => setIsExperienceStarted(true)} />
          </motion.div>
        ) : (
          /* Fully-unlocked Romantic Storyboard */
          <motion.div
            key="experience"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            {/* Top Liquid Gold Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-rose-100 z-50">
              <div
                className="h-full bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300 rounded-r-full shadow-[0_2px_8px_rgba(244,114,182,0.4)] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Immersive background elements */}
            <AmbientBackground />
            <AudioPlayer isExperienceStarted={isExperienceStarted} />

            {/* Minimalist Header Branding */}
            <header className="absolute top-0 left-0 right-0 py-8 px-6 flex justify-between items-center z-30 max-w-6xl mx-auto pointer-events-none">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-200 animate-pulse" />
                <span className="font-serif font-bold text-gradient text-sm tracking-wide">
                  A Digital Love Letter
                </span>
              </div>
              <div className="flex items-center gap-1 opacity-60 text-[10px] tracking-widest font-mono font-bold text-rose-950 uppercase">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Made for Amyy</span>
              </div>
            </header>

            {/* Main Scrolling Content Sequence */}
            <main className="relative pt-24 pb-12">
              {/* Introduction Greeting section */}
              <section className="py-20 px-4 text-center max-w-3xl mx-auto relative z-10">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.8, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-xs uppercase tracking-widest font-mono font-bold text-rose-400"
                >
                  Unveiling the Note
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-serif font-bold text-rose-950 mt-3 mb-6"
                >
                  A Celestial Tribute to <br />
                  <span className="italic font-normal">Amyy's Beautiful Presence</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="text-sm sm:text-base font-sans font-light text-rose-950/70 leading-relaxed max-w-xl mx-auto"
                >
                  This space is designed to hold feelings that are too deep for standard messaging. Scroll gently, interact with the snapshots, read the words at your own pace, and enjoy the delicate ambient space created just for you.
                </motion.p>
              </section>

              {/* Bento Attributes grid */}
              <AmazingCards />

              {/* Memories Timeline */}
              <Timeline />

              {/* Photo Polaroid masonry gallery */}
              <PolaroidGallery />

              {/* Typed Handwritten Letter Card */}
              <HandwrittenLetter />

              {/* Parallax Quote block */}
              <QuoteSection />

              {/* Heart Fireworks outro */}
              <EndingSection />
            </main>

            {/* Aesthetic Minimal Footer */}
            <footer className="py-12 border-t border-rose-100/40 relative z-10 text-center text-[11px] font-mono tracking-wider font-semibold text-rose-950/40 flex flex-col sm:flex-row items-center justify-between px-6 max-w-6xl mx-auto gap-4 pointer-events-none">
              <div>
                <span>© {new Date().getFullYear()} All Rights Reserved.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>With love, admiration, and gratitude</span>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-300" />
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
