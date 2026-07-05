import { motion } from "motion/react";
import {
  Heart,
  Sun,
  Music,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Star,
  Activity,
} from "lucide-react";
import { AmazingCard } from "../types";

const cardsData: AmazingCard[] = [
  {
    id: "kindness",
    title: "Your Kindness",
    description: "The selfless way you treat everyone around you, offering warmth, support, and understanding. Your gentle nature acts as a quiet sanctuary in a noisy world.",
    iconName: "Heart",
    colorClass: "from-rose-400/20 to-pink-500/5 shadow-[0_0_20px_rgba(244,63,94,0.04)] hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
  },
  {
    id: "smile",
    title: "Your Smile",
    description: "A genuine, radiant spark that immediately lights up the entire room and brings a sense of comfort and sheer joy. It has the rare magic to turn any day around.",
    iconName: "Sun",
    colorClass: "from-amber-400/20 to-orange-500/5 shadow-[0_0_20px_rgba(245,158,11,0.04)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  {
    id: "voice",
    title: "Your Sweet Voice",
    description: "Incredibly soothing, warm, and comforting. Simply hearing you talk can calm a busy mind and make everything feel peaceful, clear, and perfectly centered.",
    iconName: "Music",
    colorClass: "from-violet-400/20 to-indigo-500/5 shadow-[0_0_20px_rgba(139,92,246,0.04)] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  },
  {
    id: "words",
    title: "Your Encouraging Words",
    description: "Always thoughtful and perfectly timed. You speak belief into hearts, raising spirits and giving people the courage and inspiration to stand tall.",
    iconName: "MessageCircle",
    colorClass: "from-emerald-400/20 to-teal-500/5 shadow-[0_0_20px_rgba(16,185,129,0.04)] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  },
  {
    id: "heart",
    title: "Your Caring Heart",
    description: "Boundless in empathy and always looking out for others. You hold a rare, precious capacity to love and support that makes everyone feel deeply valued.",
    iconName: "Activity",
    colorClass: "from-rose-400/20 to-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.04)] hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
  },
  {
    id: "soul",
    title: "Your Beautiful Soul",
    description: "Pristine, sincere, and pure. There's a brilliant depth, wisdom, and authenticity to who you are that is truly one-of-a-kind and unforgettable.",
    iconName: "Sparkles",
    colorClass: "from-amber-300/20 to-yellow-500/5 shadow-[0_0_20px_rgba(212,163,115,0.04)] hover:shadow-[0_0_30px_rgba(212,163,115,0.15)]",
  },
  {
    id: "presence",
    title: "Your Presence",
    description: "Simply being there changes the room's energy. Your companionship is a beautiful reminder that some of the greatest things in life are experienced together.",
    iconName: "Star",
    colorClass: "from-sky-400/20 to-blue-500/5 shadow-[0_0_20px_rgba(56,189,248,0.04)] hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
  },
];

// Helper to resolve icon component dynamically
const IconResolver = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case "Heart":
      return <Heart className={className} />;
    case "Sun":
      return <Sun className={className} />;
    case "Music":
      return <Music className={className} />;
    case "MessageCircle":
      return <MessageCircle className={className} />;
    case "Activity":
      return <Activity className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Star":
      return <Star className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};

export default function AmazingCards() {
  return (
    <section id="amazing-section" className="py-24 px-4 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-500 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3 shadow-sm"
        >
          <Heart className="w-3 h-3 fill-rose-500" />
          The Radiance Grid
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-4">
          Why You Are Truly Amazing
        </h2>
        <p className="text-sm text-rose-950/60 max-w-md mx-auto font-light">
          There are countless details that make you unique, but these seven shining attributes are what stand out as truly extraordinary.
        </p>
      </div>

      {/* Bento-style Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {cardsData.map((card, idx) => {
          // Make the first card and last card slightly larger (span 3 out of 6 in desktop grid) to create dynamic Bento spacing
          const isLargeCard = idx === 0 || idx === 5 || idx === 6;
          const gridSpanClass = isLargeCard ? "md:col-span-3" : "md:col-span-2";

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`glass-panel border border-white/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 bg-gradient-to-br ${card.colorClass} group`}
            >
              {/* Radial glow background activated on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none" />

              <div>
                {/* Floating heart emblem badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-400 group-hover:text-rose-500 transition-colors duration-300 shadow-md border border-rose-100/50">
                    <IconResolver name={card.iconName} className="w-6 h-6" />
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-30 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-300" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-serif font-bold text-rose-950 mb-3 text-left">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-sans font-light text-rose-950/70 leading-relaxed text-left">
                  {card.description}
                </p>
              </div>

              {/* Subtle luxury brand-like tag */}
              <div className="mt-8 flex items-center justify-between border-t border-rose-100/30 pt-4 opacity-40 group-hover:opacity-75 transition-opacity duration-300">
                <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-rose-950/50">
                  Qualities of Grace
                </span>
                <span className="text-[10px] text-rose-400">❤️</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
