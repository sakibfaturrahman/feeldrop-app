import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Music } from "lucide-react";
import { API_BASE_URL } from "@/config";

interface MarqueeItem {
  _id: string;
  to: string;
  message: string;
  song: {
    title: string;
    coverUrl: string;
  };
}

const MarqueeRow = ({
  items,
  direction = "left",
}: {
  items: MarqueeItem[];
  direction?: "left" | "right";
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (items.length === 0) return null;

  // Duplikasi untuk loop yang mulus
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative flex overflow-hidden py-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex flex-nowrap gap-5"
        animate={
          isHovered
            ? { x: 0 }
            : { x: direction === "left" ? [0, -1500] : [-1500, 0] }
        }
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50, // Lebih lambat agar lebih soft
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <Card
            key={`${item._id}-${idx}`}
            className="flex-shrink-0 w-80 bg-white border-zinc-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_-5px_rgba(0,0,0,0.08)] hover:border-zinc-200 transition-all duration-500 rounded-2xl p-5"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium tracking-tight text-zinc-400 bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100/50">
                  to: {item.to.toLowerCase()}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
              </div>

              <p className="text-[13px] text-zinc-600 leading-relaxed line-clamp-2 font-normal">
                "{item.message.toLowerCase()}"
              </p>

              <div className="flex items-center gap-3 mt-1 pt-4 border-t border-zinc-50">
                <div className="relative group">
                  <img
                    src={item.song.coverUrl}
                    alt="cover"
                    className="w-9 h-9 rounded-lg object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <p className="text-[12px] font-medium text-zinc-800 truncate">
                    {item.song.title.toLowerCase()}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-normal">
                    attachment
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export const MessageMarqueeSection = () => {
  const [messages, setMessages] = useState<MarqueeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/menfess`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
        <span className="text-xs font-medium text-zinc-400 tracking-widest lowercase">
          fetching stories...
        </span>
      </div>
    );
  }

  const firstRow = messages.slice(0, Math.ceil(messages.length / 2));
  const secondRow = messages.slice(Math.ceil(messages.length / 2));

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      {/* Soft Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-100 to-transparent opacity-50" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-100 to-transparent opacity-50" />

      {/* Gradient Vignette - Memberikan fokus ke tengah */}
      <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-4">
            <MarqueeRow items={firstRow} direction="left" />
            <MarqueeRow items={secondRow} direction="right" />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-sm text-zinc-400 font-normal tracking-tight">
              the feed is quiet. be the first to share a melody.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
