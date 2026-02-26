import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  User,
  MessageCircle,
  Music,
  X,
  AlertCircle,
  Search,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";

// --- KOMPONEN ORNAMEN BACKGROUND ---
const BackgroundOrnaments = () => {
  // Partikel acak untuk efek debu/bintang halus
  const particles = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Soft Gradient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-100 rounded-full blur-[100px] opacity-40" />

      {/* Animated Floating Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.3,
          }}
          animate={{
            y: ["-10%", "110%"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          className="absolute w-1 h-1 bg-zinc-300 rounded-full blur-[1px]"
        />
      ))}

      {/* Decorative Lines/Ornaments */}
      <div className="absolute top-[20%] right-[15%] w-64 h-64 border border-zinc-100/50 rounded-full" />
      <div className="absolute top-[18%] right-[13%] w-72 h-72 border border-zinc-50/30 rounded-full" />
      <div className="absolute bottom-[10%] left-[10%] w-px h-64 bg-gradient-to-t from-zinc-200/50 to-transparent" />
      <div className="absolute top-[40%] left-[5%] flex flex-col gap-4">
        <div className="w-1 h-1 rounded-full bg-zinc-100" />
        <div className="w-1 h-1 rounded-full bg-zinc-100" />
        <div className="w-1 h-1 rounded-full bg-zinc-100" />
      </div>
    </div>
  );
};

const SubmitMessage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [, setIsSearching] = useState(false);

  // State untuk Modals & Notifications
  const [showQuotaModal, setShowQuotaModal] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [formData, setFormData] = useState({
    to: "",
    message: "",
    song: "",
    songTitle: "",
  });

  useEffect(() => {
    fetchSongs("");
  }, []);

  const fetchSongs = async (query: string) => {
    setIsSearching(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/search-song?q=${query}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.song) {
      setNotification({ type: "error", message: "please select a song first" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/kirim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.to,
          message: formData.message,
          song: formData.song,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        const newId = result.data._id;
        navigate(`/menfess/${newId}`);
      } else {
        const result = await res.json();
        setNotification({
          type: "error",
          message: result.error || "failed to send message",
        });
      }
    } catch (err) {
      setNotification({
        type: "error",
        message: "connection error. check your server",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification({ type: null, message: "" }), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6 relative overflow-hidden font-sans">
      {/* Noise Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* New Smooth Ornaments & Particles */}
      <BackgroundOrnaments />

      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium text-zinc-900 mb-4 lowercase tracking-tighter">
            spill your feelings.
          </h1>
          <p className="text-zinc-400 text-sm lowercase">
            let the song speak for you.
          </p>
        </div>

        <Card className="rounded-[2.5rem] border-zinc-100 shadow-none bg-zinc-50/30 overflow-visible relative">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* To */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-zinc-400 lowercase flex items-center gap-2 px-1">
                  <User size={14} /> to:
                </label>
                <Input
                  required
                  className="rounded-2xl border-zinc-100 bg-white py-6 focus:ring-0 lowercase shadow-none placeholder:text-zinc-200"
                  placeholder="enter name..."
                  value={formData.to}
                  onChange={(e) =>
                    setFormData({ ...formData, to: e.target.value })
                  }
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-zinc-400 lowercase flex items-center gap-2 px-1">
                  <MessageCircle size={14} /> message:
                </label>
                <Textarea
                  required
                  className="rounded-2xl border-zinc-100 bg-white min-h-[120px] focus:ring-0 lowercase resize-none shadow-none placeholder:text-zinc-200"
                  placeholder="write your secret..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              {/* Song Search */}
              <div className="space-y-2 relative">
                <label className="text-[11px] font-medium text-zinc-400 lowercase flex items-center gap-2 px-1">
                  <Music size={14} /> song:
                </label>

                {formData.songTitle ? (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-between p-4 bg-zinc-900 text-white rounded-2xl"
                  >
                    <span className="text-xs truncate lowercase flex-1 px-1">
                      {formData.songTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, song: "", songTitle: "" })
                      }
                      className="hover:opacity-70 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <div className="relative group">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none"
                      size={16}
                    />
                    <Input
                      onFocus={() => setShowDropdown(true)}
                      onChange={(e) => fetchSongs(e.target.value)}
                      className="rounded-2xl border-zinc-100 bg-white pl-12 py-6 focus:ring-0 lowercase shadow-none placeholder:text-zinc-200"
                      placeholder="search on spotify..."
                    />
                  </div>
                )}

                <AnimatePresence>
                  {showDropdown && !formData.song && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-50 w-full mt-2 bg-white border border-zinc-100 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] max-h-60 overflow-y-auto p-2"
                    >
                      {searchResults.map((song: any) => (
                        <div
                          key={song.id}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              song: song.id,
                              songTitle: song.text,
                            });
                            setShowDropdown(false);
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-2xl cursor-pointer transition-colors"
                        >
                          <img
                            src={song.coverUrl}
                            className="w-10 h-10 rounded-lg object-cover grayscale-[0.2]"
                            alt="cover"
                          />
                          <span className="text-xs text-zinc-600 truncate lowercase">
                            {song.text}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                disabled={loading}
                className="w-full py-7 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all lowercase shadow-none font-normal relative overflow-hidden"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>delivering...</span>
                  </div>
                ) : (
                  "send story"
                )}
              </Button>
            </form>

            {/* --- STATUS NOTIFICATION OVERLAY --- */}
            <AnimatePresence>
              {notification.type && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 flex items-center justify-center p-6 bg-zinc-50/90 backdrop-blur-sm rounded-[2.5rem]"
                >
                  <div className="text-center flex flex-col items-center">
                    {notification.type === "success" ? (
                      <CheckCircle2
                        className="w-12 h-12 text-zinc-900 mb-4 animate-bounce"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <XCircle
                        className="w-12 h-12 text-zinc-400 mb-4"
                        strokeWidth={1.5}
                      />
                    )}
                    <p
                      className={`text-sm font-medium lowercase tracking-tight ${notification.type === "success" ? "text-zinc-900" : "text-zinc-500"}`}
                    >
                      {notification.message}
                    </p>
                    {notification.type === "success" && (
                      <p className="text-[10px] text-zinc-400 mt-2 lowercase">
                        redirecting to feed...
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* --- MODAL ATTENTION & LIMIT --- */}
      <AnimatePresence>
        {showQuotaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuotaModal(false)}
              className="absolute inset-0 bg-white/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] text-center border border-zinc-100"
            >
              <div className="w-14 h-14 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="w-5 h-5 text-zinc-400 stroke-[1.5]" />
              </div>
              <h2 className="text-xl font-medium text-zinc-900 mb-4 tracking-tight lowercase">
                before you spill...
              </h2>
              <div className="text-zinc-400 text-[14px] mb-8 leading-relaxed lowercase font-normal space-y-3">
                <p>
                  once your message is sent,{" "}
                  <span className="text-zinc-900 font-medium">
                    it cannot be deleted
                  </span>
                  . please check your words twice.
                </p>

                <div className="pt-4 border-t border-zinc-50 flex flex-col items-center gap-2">
                  <div className="flex gap-1 text-zinc-200">
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                    <Star size={10} fill="currentColor" />
                  </div>
                  <p className="text-[11px] italic text-zinc-300">
                    * daily limit: you can send up to{" "}
                    <span className="text-zinc-500 font-medium">
                      3 messages
                    </span>{" "}
                    per day.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowQuotaModal(false)}
                className="w-full py-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-normal lowercase shadow-none transition-all"
              >
                i understand
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmitMessage;
