import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { API_BASE_URL } from "@/config";
import { Link } from "react-router-dom"; // Tambahkan Link agar bisa diklik

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
  if (items.length === 0) return null;

  // Duplikasi hanya 2 kali sudah cukup untuk infinity loop yang stabil
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden py-4 group">
      <motion.div
        className="flex flex-nowrap gap-6"
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 80, // Ditingkatkan agar lebih lambat dan elegan
            ease: "linear",
          },
        }}
        // Logic Hover Pause yang benar untuk Framer Motion
        whileHover={{ transition: { duration: 0 } }}
        style={{
          // Alternatif jika whileHover tidak cukup di beberapa browser:
          animationPlayState: "paused",
        }}
        // Tailwind 'group-hover' akan mengontrol class CSS di bawah
      >
        <div className="flex flex-nowrap gap-6 animate-marquee-pause">
          {duplicatedItems.map((item, idx) => (
            <Link key={`${item._id}-${idx}`} to={`/menfess/${item._id}`}>
              <Card className="flex-shrink-0 w-[350px] bg-white border-zinc-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-zinc-200 transition-all duration-500 rounded-[2rem] p-6 group/card">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 lowercase bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100/50">
                      to: {item.to.toLowerCase()}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-100 group-hover/card:bg-zinc-400 transition-colors" />
                  </div>

                  <p className="text-[14px] text-zinc-500 leading-relaxed line-clamp-2 font-normal lowercase italic">
                    "{item.message.toLowerCase()}"
                  </p>

                  <div className="flex items-center gap-4 mt-1 pt-5 border-t border-zinc-50">
                    <img
                      src={item.song.coverUrl}
                      alt="cover"
                      className="w-10 h-10 rounded-xl object-cover grayscale-[0.8] group-hover/card:grayscale-0 transition-all duration-700 shadow-sm"
                    />
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      <p className="text-[11px] font-bold text-zinc-900 truncate lowercase tracking-tight">
                        {item.song.title.toLowerCase()}
                      </p>
                      <p className="text-[9px] text-zinc-300 font-medium lowercase tracking-widest">
                        attached melody
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
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
        // Ambil data terbaru saja agar marquee tetap ringan
        setMessages(data.slice(0, 20));
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
      <div className="py-32 flex flex-col items-center justify-center gap-4">
        <div className="w-6 h-6 border-2 border-zinc-100 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  // Logic pembagian row
  const firstRow = messages.slice(0, Math.ceil(messages.length / 2));
  const secondRow = messages.slice(Math.ceil(messages.length / 2));

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Ornaments Subtil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Gradients Fading Mask */}
      <div className="absolute inset-y-0 left-0 w-32 sm:w-80 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 sm:w-80 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-0">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-6">
            <MarqueeRow items={firstRow} direction="left" />
            <MarqueeRow items={secondRow} direction="right" />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[12px] text-zinc-300 lowercase tracking-[0.2em]">
              the feed is currently quiet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
