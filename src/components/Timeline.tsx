import { motion } from "motion/react";
import { MessageSquareHeart, Sparkles, Coffee, Heart, Milestone } from "lucide-react";
import { TimelineItem } from "../types";

const timelineData: TimelineItem[] = [
  {
    id: "1",
    date: "The First Dialogue",
    title: "A Serendipitous Hello",
    description: "What began as a simple, polite greeting quickly sparked into a conversation that would change my entire horizon. Your natural grace, sweet words, and refreshing perspective made an impression that stayed in my heart.",
    iconName: "MessageSquareHeart",
  },
  {
    id: "2",
    date: "Evolving Echoes",
    title: "Shared Smiles & Laughter",
    description: "Discovering how easily our thoughts aligned, laughing over tiny inside jokes, and talking about everything and nothing for hours. Each dialogue left me with a lighter heart and an eagerness for the next morning.",
    iconName: "Sparkles",
  },
  {
    id: "3",
    date: "The Sanctuary of Voice",
    title: "Comfort in Encouragement",
    description: "When times were busy or hurdles appeared, your gentle, reassuring voice and encouraging notes became a beautiful sanctuary. You have this rare, beautiful power to make everything feel hopeful, structured, and manageable.",
    iconName: "Coffee",
  },
  {
    id: "4",
    date: "Grateful Resonance",
    title: "Inspiration & Realization",
    description: "Realizing how deeply your pure presence inspires me to grow, listen, and see the good. This digital letter is a small, glowing testament to that gratitude. You have a special place in my heart, always.",
    iconName: "Heart",
  },
];

const IconResolver = ({ name, className }: { name: string; className: string }) => {
  switch (name) {
    case "MessageSquareHeart":
      return <MessageSquareHeart className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Coffee":
      return <Coffee className={className} />;
    case "Heart":
      return <Heart className={className} />;
    default:
      return <Milestone className={className} />;
  }
};

export default function Timeline() {
  return (
    <section id="timeline-section" className="py-24 px-4 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-500 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3 shadow-sm"
        >
          <Milestone className="w-3.5 h-3.5" />
          The Memory Path
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-4">
          Our Chapters
        </h2>
        <p className="text-sm text-rose-950/60 max-w-md mx-auto font-light">
          A gentle vertical stroll through milestones and memories, celebrating the beautiful progress of our conversations.
        </p>
      </div>

      {/* Timeline core construct */}
      <div className="relative">
        {/* Continuous central track glass line */}
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-rose-200/50 via-rose-300/40 to-amber-200/50 rounded-full" />

        <div className="space-y-12 md:space-y-24">
          {timelineData.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div key={item.id} className="relative flex flex-col md:flex-row items-start md:items-center">
                {/* Responsive alignment container */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:order-last md:text-left"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel border border-white/60 rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(183,110,121,0.05)] hover:shadow-[0_20px_40px_rgba(183,110,121,0.08)] transition-shadow duration-500 relative"
                  >
                    {/* Floating corner indicator for item card */}
                    <div className={`absolute top-6 hidden md:block ${isLeft ? "-right-3 border-y-8 border-y-transparent border-l-[12px] border-l-white/90" : "-left-3 border-y-8 border-y-transparent border-r-[12px] border-r-white/90"}`} />

                    {/* Date subtitle */}
                    <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-rose-400">
                      {item.date}
                    </span>

                    {/* Chapter Title */}
                    <h3 className="text-xl font-serif font-bold text-rose-950 mt-1 mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm font-sans font-light text-rose-950/70 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Central active flashing junction node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                    className="w-10 h-10 rounded-full bg-white border-2 border-rose-200/80 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,114,182,0.3)] hover:text-rose-500 hover:border-rose-300 transition-all duration-300"
                  >
                    <IconResolver name={item.iconName} className="w-4 h-4 fill-rose-50/50" />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
