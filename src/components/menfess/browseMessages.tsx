import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Music, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { API_BASE_URL } from "@/config";
import type { Menfess } from "@/types/menfess";

const BrowseMessages = () => {
  const [messages, setMessages] = useState<Menfess[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMessages = async () => {
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
    fetchAllMessages();
  }, []);

  const filteredMessages = messages.filter((msg) =>
    msg.to.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="min-h-screen bg-white py-24 px-6 relative overflow-hidden">
      {/* --- LAYER ORNAMEN BACKGROUND START --- */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* 1. Grain/Noise Texture (Subtle Paper Feel) */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* 2. Soft Ambient Glows (Abu-abu sangat muda) */}
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-zinc-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-[-5%] w-[40%] h-[40%] bg-zinc-100/30 rounded-full blur-[100px] opacity-40" />

        {/* 3. Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* 4. Large Decorative Outlines */}
        <div className="absolute top-[15%] right-[10%] w-96 h-96 border border-zinc-50 rounded-full opacity-40 rotate-12" />
        <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] border border-zinc-100/50 rounded-full opacity-20 -rotate-12" />
      </div>
      {/* --- LAYER ORNAMEN BACKGROUND END --- */}

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-100 bg-zinc-50/50 text-[11px] text-zinc-400 font-medium tracking-tight transition-colors hover:border-zinc-200"
          >
            <span>community feed</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium text-zinc-900 mb-8 tracking-tighter text-center lowercase"
          >
            explore all stories.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full max-w-md group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" />
            <Input
              placeholder="search by recipient..."
              className="pl-12 py-7 rounded-[2rem] border-zinc-100 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-0 focus:border-zinc-300 transition-all duration-500 placeholder:text-zinc-300 text-sm lowercase"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-zinc-50/50 rounded-[2.5rem] animate-pulse border border-zinc-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredMessages.map((msg, index) => (
                <motion.div
                  key={msg._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.05,
                  }}
                  onClick={() => navigate(`/menfess/${msg._id}`)}
                  className="group cursor-pointer"
                >
                  <Card className="h-full rounded-[2.5rem] border-zinc-100 bg-white/40 backdrop-blur-[2px] hover:bg-white/80 shadow-none hover:border-zinc-200 transition-all duration-700 overflow-hidden relative group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)]">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-300 font-medium lowercase mb-1">
                            recipient
                          </span>
                          <span className="text-sm font-medium text-zinc-800 lowercase">
                            {msg.to}
                          </span>
                        </div>
                        <div className="flex items-center text-zinc-200 gap-1.5 text-[10px] font-medium">
                          <Calendar className="w-3 h-3 stroke-[1.5]" />
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <p className="text-zinc-400 mb-10 line-clamp-3 leading-relaxed text-[15px] font-normal lowercase">
                        "{msg.message.toLowerCase()}"
                      </p>

                      <div className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-zinc-50/50 border border-zinc-100/50 group-hover:bg-white group-hover:border-zinc-200 transition-all duration-500">
                        <div className="relative">
                          <img
                            src={msg.song.coverUrl}
                            alt="cover"
                            className="w-12 h-12 rounded-xl object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700 shadow-sm"
                          />
                          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-zinc-800 text-[13px] truncate lowercase">
                            {msg.song.title}
                          </p>
                          <p className="text-zinc-400 text-[11px] truncate lowercase font-normal">
                            {msg.song.artist}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="w-14 h-14 border border-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 bg-zinc-50/30">
              <Search className="w-5 h-5 text-zinc-200" />
            </div>
            <p className="text-sm text-zinc-300 font-normal lowercase tracking-tight">
              no stories found for "{search.toLowerCase()}"
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BrowseMessages;
