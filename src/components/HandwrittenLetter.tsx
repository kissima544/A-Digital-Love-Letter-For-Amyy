import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Edit3, RotateCcw } from "lucide-react";

export default function HandwrittenLetter() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const message =
    "Dear Amyy, meeting you has been one of the greatest blessings in my life. Your kindness, your beautiful smile, your sweet voice, and your words of encouragement have touched my heart more than you know. Every conversation with you leaves me feeling inspired, understood, and grateful. You have a beautiful soul, and that's what makes you truly one of a kind. Thank you for simply being yourself.";

  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const typingIntervalRef = useRef<any>(null);
  const replayTimeoutRef = useRef<any>(null);

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    setDisplayedText("");
    setIsTypingComplete(false);

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message.charAt(index));
        index++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        setIsTypingComplete(true);
      }
    }, 35); // Silky-smooth typing rate (35ms per character)

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      if (replayTimeoutRef.current) {
        clearTimeout(replayTimeoutRef.current);
      }
    };
  }, [isInView]);

  const handleReplay = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    if (replayTimeoutRef.current) {
      clearTimeout(replayTimeoutRef.current);
      replayTimeoutRef.current = null;
    }

    setDisplayedText("");
    setIsTypingComplete(false);
    
    // Slight timeout before triggering typing again to reset the cycle
    replayTimeoutRef.current = setTimeout(() => {
      let index = 0;
      typingIntervalRef.current = setInterval(() => {
        if (index < message.length) {
          setDisplayedText((prev) => prev + message.charAt(index));
          index++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTypingComplete(true);
        }
      }, 35);
    }, 300);
  };

  return (
    <section ref={containerRef} className="py-24 px-4 max-w-4xl mx-auto relative z-10">
      {/* Background glow halos */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-rose-200/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-200/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Beautiful luxury glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel rounded-[32px] p-8 sm:p-12 md:p-16 shadow-[0_30px_60px_rgba(183,110,121,0.08)] border border-white/60 relative overflow-hidden pulse-glow"
      >
        {/* Subtle lined pattern background mimicking fine writing paper */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: "linear-gradient(rgba(183, 110, 121, 0.6) 1px, transparent 1px)",
            backgroundSize: "100% 2.2rem",
            padding: "4rem 0"
          }}
        />

        {/* Card Header decoration */}
        <div className="flex justify-between items-center mb-10 border-b border-rose-100/50 pb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-400">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-gradient text-lg">A Handwritten Note</h3>
              <p className="text-[10px] tracking-widest font-mono font-semibold text-rose-950/40 uppercase">From the Heart</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: isTypingComplete ? 360 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="w-5 h-5 text-amber-500/50" />
            </motion.div>
          </div>
        </div>

        {/* Written Message Area */}
        <div className="relative min-h-[14rem] sm:min-h-[12rem] md:min-h-[10rem] z-10">
          <p className="font-handwriting text-3xl sm:text-4xl text-rose-950/80 leading-relaxed tracking-wide text-left break-words">
            {displayedText}
            {/* Blinking Cursive Gold Fountain Pen Nib Cursor */}
            {!isTypingComplete && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-7 bg-amber-500 ml-1 rounded-full align-middle shadow-[0_0_8px_rgba(212,163,115,0.8)]"
              />
            )}
          </p>
        </div>

        {/* Signature & Replay Footer controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-12 pt-6 border-t border-rose-100/30 gap-6 relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTypingComplete ? 0.8 : 0 }}
              transition={{ duration: 1 }}
              className="text-left"
            >
              <p className="text-xs uppercase tracking-widest font-mono font-semibold text-rose-950/40">With Love,</p>
              <p className="font-handwriting text-4xl text-gradient-rose mt-2">Kissima</p>
            </motion.div>
          </div>

          {/* Action replay controls */}
          <motion.button
            onClick={handleReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100/60 border border-rose-100 text-[10px] tracking-widest uppercase font-mono font-bold text-rose-600 transition-all duration-300 shadow-sm cursor-pointer ml-auto sm:ml-0"
            title="Read from the beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay Letter
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
