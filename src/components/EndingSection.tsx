import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Heart, Sparkles, Send } from "lucide-react";

interface FireworkSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
  decay: number;
}

export default function EndingSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });
  const [hasSentNote, setHasSentNote] = useState(false);
  const [noteMessage, setNoteMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let sparks: FireworkSpark[] = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Warm elegant firework palette
    const colors = [
      "rgba(255, 182, 193, ", // pink
      "rgba(212, 163, 115, ", // gold
      "rgba(230, 230, 250, ", // lavender
      "rgba(245, 235, 240, ", // cream
    ];

    const createExplosion = (x: number, y: number) => {
      const sparkCount = 45 + Math.floor(Math.random() * 20);
      const colorPrefix = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5, // slight upward float
          color: colorPrefix,
          alpha: 1.0,
          size: Math.random() * 2 + 1,
          decay: Math.random() * 0.015 + 0.008,
        });
      }
    };

    let explosionTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isInView) {
        explosionTimer++;
        // Periodic launch of fireworks (every 2.5 seconds)
        if (explosionTimer % 150 === 0) {
          const launchX = Math.random() * (canvas.width * 0.6) + canvas.width * 0.2;
          const launchY = Math.random() * (canvas.height * 0.4) + canvas.height * 0.2;
          createExplosion(launchX, launchY);
        }
      }

      // Update and draw sparkles
      sparks.forEach((spark, idx) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.02; // soft gravity
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0) {
          sparks.splice(idx, 1);
          return;
        }

        ctx.beginPath();
        ctx.fillStyle = spark.color + spark.alpha + ")";
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteMessage.trim()) return;
    setHasSentNote(true);
    // Simulates saving love notes with elegant fade success feedback
    setTimeout(() => {
      setNoteMessage("");
    }, 3000);
  };

  return (
    <section
      ref={containerRef}
      className="py-32 px-4 text-center relative overflow-hidden select-none min-h-[90vh] flex flex-col justify-center items-center"
    >
      {/* Background canvas for fireworks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Luxury radial glow backing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
        {/* Large Beating Glassmorphic Heart */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1, 1.12, 1],
            rotate: [0, -2, 2, -2, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 bg-white/45 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(244,63,94,0.18)] mb-10 border border-white/60 cursor-pointer"
        >
          <Heart className="w-12 h-12 text-rose-500 fill-rose-400" />
        </motion.div>

        {/* Small sparkling introductory banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-500 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Final Chapter
        </motion.div>

        {/* Thank You Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl font-serif font-bold text-gradient leading-tight mb-4"
        >
          Thank you for being one of the <br />
          <span className="italic font-normal">most wonderful people</span> <br />
          I've ever met.
        </motion.h2>

        {/* Closing Love Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl font-handwriting text-gradient-rose font-medium tracking-wide mb-14"
        >
          You'll always have a special place in my heart ❤️
        </motion.p>

        {/* Interactive Love Note Form to let users leave beautiful feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-sm glass-panel border border-white/60 p-6 rounded-3xl shadow-lg mb-8"
        >
          <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-rose-950/50 mb-3 text-left">
            Leave a Secret Wish
          </h4>
          
          {hasSentNote ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-4 text-center"
            >
              <Heart className="w-8 h-8 text-rose-500 fill-rose-300 mx-auto mb-2 animate-bounce" />
              <p className="text-xs font-sans font-medium text-rose-800">Your wish has been cast into the stars!</p>
              <p className="text-[10px] text-rose-950/40 mt-1">Thank you for sharing your thoughts.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSendNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Write a little reply or smiley..."
                value={noteMessage}
                onChange={(e) => setNoteMessage(e.target.value)}
                maxLength={120}
                className="flex-1 px-4 py-2 bg-white/50 focus:bg-white border border-rose-100 focus:border-rose-300 rounded-full text-xs text-rose-950 font-sans outline-none placeholder:text-rose-950/30 transition-all duration-300 shadow-inner"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md border border-rose-200"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
