import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SendHorizontal,
  Music,
  User,
  MessageCircle,
  AlertCircle,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE_URL } from "@/config";
import { useNavigate } from "react-router-dom";

const SubmitMessage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(true);

  const [formData, setFormData] = useState({
    to: "",
    message: "",
    song: "",
    songTitle: "",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Mengambil rekomendasi default dari backend saat komponen dimuat
  useEffect(() => {
    fetchDefaultRecommendations();
  }, []);

  const fetchDefaultRecommendations = async () => {
    try {
      // Sesuai logic backend: jika query kosong, return default list
      const res = await fetch(`${API_BASE_URL}/api/search-song?q=`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("error fetching defaults:", err);
    }
  };

  const handleSongSearch = async (query: string) => {
    if (query.trim() === "") {
      fetchDefaultRecommendations();
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/search-song?q=${query}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("error searching song:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/kirim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.to,
          message: formData.message,
          song: formData.song, // URL spotify
        }),
      });

      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6 relative overflow-hidden font-sans">
      {/* Soft Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[15%] right-[10%] w-72 h-72 border border-zinc-50 rounded-full" />
        <div className="absolute bottom-[20%] left-[5%] w-px h-48 bg-gradient-to-b from-zinc-100 to-transparent" />
      </div>

      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-100 bg-zinc-50/50 text-[11px] text-zinc-400 font-medium mb-6 lowercase tracking-tight">
            <Sparkles className="w-3 h-3" /> craft your secret message
          </div>
          <h1 className="text-4xl font-medium text-zinc-900 mb-4 tracking-tighter lowercase">
            spill your feelings.
          </h1>
          <p className="text-zinc-400 text-sm lowercase font-normal">
            sometimes a song says it better than words could.
          </p>
        </motion.div>

        <Card className="border-zinc-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] rounded-[3rem] bg-white relative">
          <CardContent className="p-10 sm:p-14">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Field: To */}
              <div className="space-y-3">
                <label className="text-[11px] font-medium text-zinc-300 lowercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <User className="w-3.5 h-3.5 stroke-[1.5]" /> recipient:
                </label>
                <Input
                  required
                  placeholder="who is this for?"
                  className="rounded-2xl border-zinc-100 bg-zinc-50/30 py-7 focus:bg-white focus:ring-0 focus:border-zinc-300 transition-all lowercase placeholder:text-zinc-300 shadow-none"
                  value={formData.to}
                  onChange={(e) =>
                    setFormData({ ...formData, to: e.target.value })
                  }
                />
              </div>

              {/* Field: Message */}
              <div className="space-y-3">
                <label className="text-[11px] font-medium text-zinc-300 lowercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <MessageCircle className="w-3.5 h-3.5 stroke-[1.5]" />{" "}
                  message:
                </label>
                <Textarea
                  required
                  placeholder="write what's on your mind..."
                  className="rounded-[2rem] border-zinc-100 bg-zinc-50/30 min-h-[160px] focus:bg-white focus:ring-0 focus:border-zinc-300 transition-all resize-none p-6 lowercase placeholder:text-zinc-300 shadow-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              {/* Field: Song Search */}
              <div className="space-y-3 relative">
                <label className="text-[11px] font-medium text-zinc-300 lowercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <Music className="w-3.5 h-3.5 stroke-[1.5]" />{" "}
                  {formData.songTitle ? "attached song:" : "pick a melody:"}
                </label>

                {formData.songTitle ? (
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-between p-4 rounded-2xl border border-zinc-900 bg-zinc-900 text-white transition-all shadow-lg shadow-zinc-200"
                  >
                    <div className="flex items-center gap-3 overflow-hidden px-1">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center animate-pulse">
                        <Music className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[13px] truncate lowercase font-medium">
                        {formData.songTitle}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, song: "", songTitle: "" })
                      }
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    <Input
                      required
                      placeholder="search for a song on spotify..."
                      onFocus={() => setShowDropdown(true)}
                      className="rounded-2xl border-zinc-100 bg-zinc-50/30 pl-12 py-7 focus:bg-white focus:ring-0 focus:border-zinc-300 transition-all lowercase placeholder:text-zinc-300 shadow-none"
                      onChange={(e) => handleSongSearch(e.target.value)}
                    />
                  </div>
                )}

                {/* Dropdown Results & Recommendations */}
                <AnimatePresence>
                  {showDropdown && !formData.song && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute z-50 w-full mt-3 bg-white border border-zinc-100 rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] max-h-[320px] overflow-y-auto p-3 scrollbar-hide"
                    >
                      <div className="flex items-center justify-between px-4 py-2 mb-2">
                        <p className="text-[10px] text-zinc-300 font-bold lowercase tracking-widest">
                          {isSearching ? "searching..." : "curated for you"}
                        </p>
                        {!isSearching && (
                          <Sparkles className="w-3 h-3 text-zinc-200" />
                        )}
                      </div>

                      <div className="space-y-1">
                        {searchResults.map((song: any) => (
                          <div
                            key={song.id}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                song: `http://googleusercontent.com/open.spotify.com/track/${song.id}`,
                                songTitle: song.text,
                              });
                              setShowDropdown(false);
                            }}
                            className="flex items-center gap-4 p-3 hover:bg-zinc-50 rounded-[1.25rem] cursor-pointer transition-all group"
                          >
                            <img
                              src={song.coverUrl}
                              className="w-11 h-11 rounded-xl object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 shadow-sm"
                            />
                            <div className="flex flex-col overflow-hidden">
                              <p className="text-[13px] font-medium text-zinc-800 truncate lowercase group-hover:text-black">
                                {song.text.split(" - ")[0]}
                              </p>
                              <p className="text-[11px] text-zinc-400 lowercase truncate font-normal">
                                {song.text.split(" - ")[1] || "spotify artist"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                disabled={loading || !formData.song}
                className="w-full py-8 rounded-[2rem] bg-zinc-900 hover:bg-zinc-800 text-white font-medium shadow-none transition-all active:scale-[0.98] flex gap-3 lowercase mt-4"
              >
                {loading ? "delivering your message..." : "send message"}
                <SendHorizontal className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* --- QUOTA MODAL --- */}
      <AnimatePresence>
        {showQuotaModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuotaModal(false)}
              className="absolute inset-0 bg-white/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] text-center border border-zinc-100"
            >
              <div className="w-14 h-14 bg-zinc-50 border border-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="w-5 h-5 text-zinc-400 stroke-[1.5]" />
              </div>
              <h2 className="text-xl font-medium text-zinc-900 mb-4 tracking-tight lowercase">
                daily limit reached?
              </h2>
              <p className="text-zinc-400 text-[14px] mb-10 leading-relaxed lowercase font-normal">
                to keep this space sincere, we limit shared stories to{" "}
                <span className="text-zinc-900 font-medium">3 messages</span>{" "}
                per day. use them wisely.
              </p>
              <Button
                onClick={() => setShowQuotaModal(false)}
                className="w-full py-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium lowercase shadow-none transition-all border-none"
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
