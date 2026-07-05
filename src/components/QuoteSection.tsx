import { motion } from "motion/react";
import { Quote, Sparkles } from "lucide-react";

export default function QuoteSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden select-none">
      {/* Immersive shifting luxury ambient halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-rose-200/20 via-pink-100/30 to-amber-100/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 mb-8 border border-rose-100/50"
        >
          <Quote className="w-5 h-5 fill-rose-100" />
        </motion.div>

        {/* Elegant display blockquote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gradient leading-snug tracking-tight mb-8 px-4"
        >
          “Some people come into your life <br className="hidden sm:block" />
          <span className="italic font-normal">unexpectedly</span> and make everything <br className="hidden sm:block" />
          feel a <span className="text-gradient-rose">little brighter.</span>”
        </motion.blockquote>

        {/* Small sparkling subtitle details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest font-mono font-bold text-rose-950"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>A Cosmic Realization</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </motion.div>
      </div>
    </section>
  );
}
