import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Music, Calendar, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/config";

interface Menfess {
  _id: string;
  to: string;
  message: string;
  song: {
    title: string;
    artist: string;
    coverUrl: string;
  };
  createdAt: string;
}

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
      {/* Soft Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 border border-zinc-50 rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-96 h-96 border border-zinc-50 rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 px-3 py-1 rounded-full border border-zinc-100 bg-zinc-50/50 text-[11px] text-zinc-400 font-medium tracking-tight"
          >
            community feed
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium text-zinc-900 mb-8 tracking-tight text-center"
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
              className="pl-12 py-7 rounded-[2rem] border-zinc-100 bg-zinc-50/30 focus:bg-white focus:ring-0 focus:border-zinc-300 transition-all duration-500 placeholder:text-zinc-300 text-sm"
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
                className="h-64 bg-zinc-50 rounded-[2.5rem] animate-pulse border border-zinc-100"
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
                  <Card className="h-full rounded-[2.5rem] border-zinc-100 bg-white hover:bg-zinc-50/30 shadow-none hover:border-zinc-200 transition-all duration-500 overflow-hidden relative">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-400 font-medium lowercase mb-1">
                            recipient
                          </span>
                          <span className="text-sm font-medium text-zinc-900 lowercase">
                            {msg.to}
                          </span>
                        </div>
                        <div className="flex items-center text-zinc-300 gap-1.5 text-[10px] font-medium">
                          <Calendar className="w-3 h-3 stroke-[1.5]" />
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <p className="text-zinc-500 mb-10 line-clamp-3 leading-relaxed text-[15px] font-normal">
                        "{msg.message.toLowerCase()}"
                      </p>

                      <div className="flex items-center gap-4 p-4 rounded-3xl bg-zinc-50/50 border border-zinc-100 group-hover:bg-white group-hover:border-zinc-200 transition-all duration-500">
                        <img
                          src={msg.song.coverUrl}
                          alt="cover"
                          className="w-12 h-12 rounded-[1rem] object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-zinc-900 text-[13px] truncate lowercase">
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
            <div className="w-12 h-12 border border-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-4 h-4 text-zinc-200" />
            </div>
            <p className="text-sm text-zinc-400 font-normal lowercase tracking-tight">
              no stories found for "{search.toLowerCase()}"
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BrowseMessages;
