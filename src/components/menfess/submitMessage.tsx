import React, { useState, useEffect, useRef } from "react";
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
  Loader2,
} from "lucide-react";

// --- KOMPONEN ORNAMEN BACKGROUND ---
const BackgroundOrnaments = () => {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-50 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-100 rounded-full blur-[100px] opacity-40" />
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.3,
          }}
          animate={{ y: ["-10%", "110%"], opacity: [0, 0.3, 0] }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          className="absolute w-1 h-1 bg-zinc-300 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

const SubmitMessage = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State Management
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showQuotaModal, setShowQuotaModal] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState({
    to: "",
    message: "",
    song: "",
    songTitle: "",
  });

  // 1. Ambil 10 Rekomendasi Awal saat aplikasi dimuat
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/search-song?q=`);
        const data = await res.json();
        // Mengambil 10 lagu pertama sebagai rekomendasi default
        setRecommendations(data.results?.slice(0, 10) || []);
      } catch (err) {
        console.error("Gagal mengambil rekomendasi:", err);
      }
    };
    fetchInitial();
  }, []);

  // 2. Klik di luar area dropdown untuk menutupnya
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fungsi Search
  const handleSearchChange = async (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    setShowDropdown(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/search-song?q=${encodeURIComponent(val)}`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Global search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Logika tampilan lagu: Rekomendasi jika kosong, Hasil jika mengetik
  const displaySongs = searchQuery.trim() === "" ? recommendations : results;

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
        navigate(`/menfess/${result.data._id}`);
      } else {
        const result = await res.json();
        setNotification({
          type: "error",
          message: result.error || "failed to send",
        });
      }
    } catch (err) {
      setNotification({ type: "error", message: "connection error" });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification({ type: null, message: "" }), 4000);
    }
  };

  return (
    <div className="relative min-h-screen px-6 py-24 overflow-hidden font-sans bg-white text-zinc-900">
      <BackgroundOrnaments />

      <div className="max-w-xl mx-auto">
        <header className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-medium tracking-tighter lowercase"
          >
            spill your feelings.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm lowercase text-zinc-400"
          >
            let the song speak for you.
          </motion.p>
        </header>

        <Card className="rounded-[2.5rem] border-zinc-100 shadow-none bg-zinc-50/30 overflow-visible relative">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Receiver Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-zinc-400 lowercase flex items-center gap-2 px-1">
                  <User size={14} /> to:
                </label>
                <Input
                  required
                  className="py-6 lowercase bg-white shadow-none rounded-2xl border-zinc-100 focus:ring-0"
                  placeholder="enter name..."
                  value={formData.to}
                  onChange={(e) =>
                    setFormData({ ...formData, to: e.target.value })
                  }
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-zinc-400 lowercase flex items-center gap-2 px-1">
                  <MessageCircle size={14} /> message:
                </label>
                <Textarea
                  required
                  className="rounded-2xl border-zinc-100 bg-white min-h-[120px] focus:ring-0 lowercase resize-none shadow-none"
                  placeholder="write your secret..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              {/* Song Selector Field */}
              <div className="relative space-y-2" ref={dropdownRef}>
                <label className="text-[11px] font-medium text-zinc-400 lowercase flex items-center gap-2 px-1">
                  <Music size={14} /> song:
                </label>

                {formData.songTitle ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-between p-4 text-white bg-zinc-900 rounded-2xl"
                  >
                    <span className="flex-1 px-1 text-xs lowercase truncate">
                      {formData.songTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, song: "", songTitle: "" });
                        handleSearchChange("");
                      }}
                      className="transition-opacity hover:opacity-70"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <div className="relative group">
                    <Search
                      className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2 text-zinc-300"
                      size={16}
                    />
                    <Input
                      onFocus={() => setShowDropdown(true)}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      value={searchQuery}
                      className="py-6 pl-12 pr-10 lowercase bg-white shadow-none rounded-2xl border-zinc-100 focus:ring-0"
                      placeholder="search for any song globally..."
                    />
                    {showDropdown && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowDropdown(false);
                          setSearchQuery("");
                        }}
                        className="absolute transition-colors -translate-y-1/2 right-4 top-1/2 text-zinc-300 hover:text-zinc-900"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                )}

                {/* Dropdown Results */}
                <AnimatePresence>
                  {showDropdown && !formData.song && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-0 right-0 z-[60] mt-1 bg-white border border-zinc-100 rounded-3xl shadow-2xl max-h-64 overflow-y-auto p-2"
                    >
                      <div className="px-3 py-2 mb-1 text-[10px] font-medium tracking-widest uppercase text-zinc-400 border-b border-zinc-50 flex justify-between">
                        <span>
                          {searchQuery.trim()
                            ? "Global Results"
                            : "Top Recommendations"}
                        </span>
                        {!searchQuery.trim() && <span>10 Songs</span>}
                      </div>

                      {isSearching ? (
                        <div className="flex items-center justify-center gap-2 p-8 text-zinc-400">
                          <Loader2 size={16} className="animate-spin" />
                          <span className="text-xs">searching universe...</span>
                        </div>
                      ) : displaySongs.length > 0 ? (
                        displaySongs.map((song: any) => (
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
                            className="flex items-center gap-3 p-3 transition-colors cursor-pointer hover:bg-zinc-50 rounded-2xl"
                          >
                            <img
                              src={song.coverUrl}
                              className="w-10 h-10 rounded-lg object-cover grayscale-[0.2]"
                              alt="cover"
                            />
                            <span className="text-xs lowercase truncate text-zinc-600">
                              {song.text}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center">
                          <XCircle size={24} className="mb-2 text-zinc-200" />
                          <span className="mb-4 text-xs text-zinc-400">
                            song not found.
                          </span>
                          <Button
                            type="button"
                            variant="secondary"
                            className="h-8 px-4 text-[10px] rounded-full"
                            onClick={() => {
                              setShowDropdown(false);
                              setSearchQuery("");
                            }}
                          >
                            close
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <Button
                disabled={loading}
                className="relative w-full overflow-hidden font-normal text-white lowercase transition-all shadow-none py-7 rounded-2xl bg-zinc-900 hover:bg-zinc-800"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>delivering...</span>
                  </div>
                ) : (
                  "send story"
                )}
              </Button>
            </form>

            {/* Notification Overlays */}
            <AnimatePresence>
              {notification.type && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[70] flex items-center justify-center p-6 bg-white/90 backdrop-blur-sm rounded-[2.5rem]"
                >
                  <div className="text-center">
                    {notification.type === "success" ? (
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-zinc-900 animate-bounce" />
                    ) : (
                      <XCircle className="w-12 h-12 mx-auto mb-4 text-zinc-400" />
                    )}
                    <p className="text-sm font-medium lowercase">
                      {notification.message}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Quota Modal */}
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
              className="relative bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl text-center border border-zinc-100"
            >
              <div className="flex items-center justify-center mx-auto mb-8 border rounded-full w-14 h-14 bg-zinc-50">
                <AlertCircle className="w-5 h-5 text-zinc-400" />
              </div>
              <h2 className="mb-4 text-xl font-medium lowercase text-zinc-900">
                before you spill...
              </h2>
              <p className="mb-8 text-sm font-normal leading-relaxed lowercase text-zinc-400">
                once your message is sent, it cannot be deleted. please check
                twice. limit{" "}
                <span className="font-medium text-zinc-900">
                  3 messages/day
                </span>
                .
              </p>
              <Button
                onClick={() => setShowQuotaModal(false)}
                className="w-full py-6 font-normal text-white lowercase transition-colors rounded-2xl bg-zinc-900 hover:bg-zinc-800"
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
