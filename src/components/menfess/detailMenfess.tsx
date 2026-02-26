import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Music,
  Calendar,
  ArrowLeft,
  Heart,
  Copy,
  Share2,
  MessageSquare,
  ThumbsUp,
  CornerDownRight,
} from "lucide-react";
import { API_BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import type { Menfess } from "@/types/menfess";

const DetailMenfess = () => {
  const { id } = useParams();
  const [data, setData] = useState<Menfess | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/menfess/${id}`);
        const result = await res.json();
        const actualData = result.data || result;
        if (actualData && (actualData.to || actualData.message)) {
          setData(actualData);
        }
      } catch (err) {
        console.error("error loading detail:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-5 h-5 border-2 border-zinc-100 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );

  const trackId = data?.song?.url?.split("/track/")[1]?.split("?")[0] || "";

  return (
    <section className="min-h-screen bg-white py-20 px-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[-5%] w-72 h-72 border border-zinc-50 rounded-full opacity-50" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-zinc-50 to-transparent mx-[15%]" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-12">
          <Link
            to="/browse-message"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-medium lowercase tracking-tight">
              back to stories
            </span>
          </Link>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={handleCopyLink}
              className="rounded-full gap-2 text-[11px] font-medium lowercase text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50"
            >
              <Share2 className="w-3.5 h-3.5" />{" "}
              {copied ? "link copied" : "share story"}
            </Button>
          </div>
        </div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[3rem] border border-zinc-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden mb-16"
        >
          {/* Header */}
          <div className="p-10 sm:p-14 text-center border-b border-zinc-50">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-100"
            >
              <Heart className="w-5 h-5 text-zinc-400 stroke-[1.5]" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-medium text-zinc-900 mb-3 tracking-tight lowercase">
              hello,{" "}
              <span className="text-zinc-400 underline underline-offset-8 decoration-zinc-100">
                {data.to.toLowerCase()}
              </span>
            </h1>
            <p className="text-zinc-400 text-sm font-normal lowercase">
              someone left a melody for you.
            </p>
          </div>

          {/* Spotify Player Section */}
          <div className="px-10 sm:px-14 py-8 bg-zinc-50/30">
            <div className="rounded-[2rem] overflow-hidden shadow-sm border border-zinc-100">
              <iframe
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>

          {/* Message Area */}
          <div className="p-10 sm:p-20 relative">
            <div className="text-[17px] sm:text-xl text-zinc-600 leading-[1.8] text-center font-normal lowercase whitespace-pre-line">
              {data.message.toLowerCase()}
            </div>

            <div className="mt-16 pt-10 border-t border-zinc-50 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[10px] text-zinc-300 font-medium tracking-[0.2em] lowercase">
                <Calendar className="w-3 h-3" />
                {new Date(data.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- COMMENTS SECTION --- */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-[1px] bg-zinc-100" />
            <span className="text-[11px] font-bold text-zinc-400 tracking-[0.2em] lowercase">
              comments
            </span>
          </div>

          {/* New Comment Input */}
          <div className="group bg-white border border-zinc-100 focus-within:border-zinc-300 p-2 rounded-[2rem] flex flex-col gap-2 transition-all duration-500 mb-12">
            <textarea
              placeholder="share your thoughts..."
              className="bg-transparent border-none focus:ring-0 text-[14px] text-zinc-600 placeholder:text-zinc-300 resize-none h-24 w-full p-4 font-normal"
            />
            <div className="flex justify-end p-2">
              <Button
                size="sm"
                className="rounded-full bg-zinc-900 hover:bg-zinc-800 text-white px-8 h-10 text-[13px] font-medium lowercase transition-all"
              >
                post
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex gap-5"
            >
              <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-100 flex-shrink-0 flex items-center justify-center text-[13px] font-medium text-zinc-400">
                a
              </div>
              <div className="flex-grow">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-sm font-medium text-zinc-900 lowercase">
                    anonymous
                  </span>
                  <span className="text-[10px] text-zinc-300 font-normal lowercase">
                    2h ago
                  </span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed font-normal lowercase">
                  this song fits perfectly with the words. stay strong for the
                  sender.
                </p>

                <div className="flex items-center gap-6 mt-5">
                  <button className="flex items-center gap-2 text-[11px] text-zinc-300 hover:text-zinc-900 transition-colors lowercase">
                    <ThumbsUp className="w-3.5 h-3.5" /> 12
                  </button>
                  <button className="text-[11px] text-zinc-300 hover:text-zinc-900 font-medium transition-colors lowercase">
                    reply
                  </button>
                </div>

                {/* Nested Reply */}
                <div className="mt-8 ml-4 pl-8 border-l border-zinc-100 space-y-8">
                  <div className="flex gap-5">
                    <div className="w-8 h-8 rounded-xl bg-zinc-900 flex-shrink-0 flex items-center justify-center text-[11px] font-medium text-white">
                      s
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-sm font-medium text-zinc-900 lowercase">
                          sender
                        </span>
                        <span className="text-[10px] text-zinc-300 font-normal lowercase">
                          1h ago
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed font-normal lowercase">
                        thank you for the support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-32 text-center pb-20">
          <p className="text-zinc-300 text-[13px] font-normal lowercase tracking-tight">
            want to reply?{" "}
            <Link
              to="/message"
              className="text-zinc-900 underline underline-offset-4 decoration-zinc-200 hover:decoration-zinc-900 transition-all"
            >
              send your own story
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailMenfess;
