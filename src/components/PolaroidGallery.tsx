import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, Heart, Sparkles } from "lucide-react";
import { PolaroidImage } from "../types";

// Import our custom generated images for a fully personalized gallery experience
const polaroidData: PolaroidImage[] = [
  {
    id: "sick-visit",
    url: "/src/assets/images/amyy_sick_visit_1783196989880.jpg",
    caption: "Visiting you when you were under the weather. Even then, your beautiful smile shined brighter than anything else ❤️",
    date: "A Caring Visit",
    aspect: "portrait",
    rotation: -4,
  },
  {
    id: "bedroom-selfie",
    url: "/src/assets/images/her_selfie_1783202874037.jpg",
    caption: "The day you grabbed my phone in your room and playfully snapped this beautiful selfie of us together. Your laughter filled the room, making it one of my absolute favorite moments ever ❤️",
    date: "Playful Bedroom Selfie",
    aspect: "portrait",
    rotation: -2.5,
  },
  {
    id: "signout-letter",
    url: "/src/assets/images/starry_dream_night_1783188870575.jpg",
    caption: "The beautiful letter you gave me on my sign out day. Holding your words in my hands made that milestone feel infinitely more special and unforgettable. I will treasure it forever ✉️🌌❤️",
    date: "Sign Out Letter",
    aspect: "portrait",
    rotation: 2,
  },
  {
    id: "sunset-beach",
    url: "/src/assets/images/sunset_warm_beach_1783188856783.jpg",
    caption: "That beautiful selfie you sent me on your way to class. Seeing your bright, lovely face lights up my entire day and makes every single second feel incredibly special. You are my absolute sunshine 🌅🎒💖",
    date: "Class Day Selfie",
    aspect: "portrait",
    rotation: -1.5,
  },
  {
    id: "lavender-dusk",
    url: "/src/assets/images/lavender_field_dusk_1783188896334-1.jpg",
    caption: "Your absolute favorite artwork—a stunning sketching of you. Seeing you captured on paper only shows how breathtaking, elegant, and timeless your beauty truly is 🎨✨💜",
    date: "Sketch of You",
    aspect: "portrait",
    rotation: 3,
  },
  {
    id: "rose-gold-rose",
    url: "/src/assets/images/rose_gold_rose_1783188883818-1.jpg",
    caption: "The gorgeous recent selfie you sent me. Every time I see your beautiful smile, it makes my heart skip a beat and reminds me of how lucky I am to have you in my life 🌹✨💖",
    date: "Your Lovely Selfie",
    aspect: "portrait",
    rotation: 1.5,
  },
];

export default function PolaroidGallery() {
  const [selectedImage, setSelectedImage] = useState<PolaroidImage | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("celestial-polaroids");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gallery-section" className="py-24 px-4 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-500 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Polaroid Archives
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-4">
          A Collection of Moments
        </h2>
        <p className="text-sm text-rose-950/60 max-w-md mx-auto font-light">
          Snapshots of dreamscapes, nature, and comfort. Each card captures a feeling that shines a little brighter when shared with you.
        </p>
      </div>

      {/* Masonry-style Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 [column-fill:_balance] box-border">
        {polaroidData.map((item) => {
          const imageUrl = customImages[item.id] || item.url;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ rotate: `${item.rotation}deg` }}
              whileHover={{
                rotate: 0,
                scale: 1.03,
                y: -5,
                zIndex: 20,
                transition: { duration: 0.3 },
              }}
              onClick={() => setSelectedImage(item)}
              className="break-inside-avoid relative inline-block w-full bg-white p-4 pb-6 rounded-sm shadow-[0_4px_20px_rgba(44,26,29,0.06)] border border-rose-100/50 cursor-pointer group"
            >
              {/* Polaroid Photo Frame */}
              <div className="relative overflow-hidden aspect-[3/4] rounded-[2px] bg-neutral-100">
                <img
                  src={imageUrl}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Indicator if user photo is loaded */}
                {customImages[item.id] && (
                  <div className="absolute top-3 left-3 bg-emerald-500/90 text-white text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 rounded shadow-sm backdrop-blur-sm z-10 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse animate-duration-1000"></span>
                    <span>Your Exact Photo</span>
                  </div>
                )}

                {/* Quick overlay controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 z-10">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => toggleFavorite(e, item.id)}
                      className="p-1.5 rounded-full bg-white/25 backdrop-blur-md text-white hover:bg-white/40 hover:scale-110 active:scale-95 transition-all duration-200"
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites[item.id] ? "fill-rose-500 text-rose-500" : "text-white"}`}
                      />
                    </button>
                  </div>
                  <div className="p-1.5 rounded-full bg-white/25 backdrop-blur-md text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Polaroid Bottom Notes Area */}
              <div className="mt-4 text-left px-1">
                <p className="font-handwriting text-2xl text-rose-950/80 leading-tight">
                  {item.caption}
                </p>
                <div className="flex justify-between items-center mt-2 border-t border-rose-50 pt-2 text-[10px] tracking-widest uppercase font-mono font-semibold text-rose-950/40">
                  <span>Memory card #{item.id}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:rotate-90 transition-all duration-300 z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Polaroid Container Zoomed */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-5 pb-8 rounded-md shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="aspect-[3/4] w-full rounded-sm overflow-hidden bg-neutral-100 relative">
                <img
                  src={customImages[selectedImage.id] || selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating love counter badge */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    onClick={(e) => toggleFavorite(e, selectedImage.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-rose-500 shadow-md font-sans text-xs font-semibold hover:scale-105 transition-all duration-200"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${favorites[selectedImage.id] ? "fill-rose-500" : ""}`}
                    />
                    <span>{favorites[selectedImage.id] ? "Loved" : "Save Love"}</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 text-left px-2">
                <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-rose-400">
                  {selectedImage.date}
                </span>
                <h3 className="font-handwriting text-4xl text-rose-950/90 leading-snug mt-1">
                  {selectedImage.caption}
                </h3>
                <p className="text-xs font-sans font-light text-rose-950/60 mt-3 leading-relaxed border-t border-rose-50 pt-3">
                  This snapshot remains preserved in the celestial archives as a token of comfort, inspiration, and bright smiles. May it serve as a gentle reminder of the wonderful, positive energy you bring to the world.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
