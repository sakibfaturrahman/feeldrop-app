import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Heart,
  Copy,
  Share2,
  ThumbsUp,
  Quote,
  Check,
  Laugh,
  Angry,
  X,
  Frown,
} from "lucide-react";
import { API_BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import type { Menfess } from "@/types/menfess";

const DetailMenfess = () => {
  const { id } = useParams();
  const [data, setData] = useState<Menfess | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // --- STATE INTERAKSI ---
  const [commentInput, setCommentInput] = useState("");
  const [replyState, setReplyState] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // State untuk melacak reaksi yang dipilih user di sesi ini (Exclusive Logic)
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [userCommentReactions, setUserCommentReactions] = useState<
    Record<string, string | null>
  >({});

  const REACTION_TYPES = [
    { type: "heart", icon: Heart, color: "text-red-400" },
    { type: "thumbsup", icon: ThumbsUp, color: "text-blue-400" },
    { type: "laugh", icon: Laugh, color: "text-yellow-400" },
    { type: "sad", icon: Frown, color: "text-purple-400" },
    { type: "mad", icon: Angry, color: "text-orange-400" },
  ];

  const fetchDetail = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/menfess/${id}`);
      const result = await res.json();
      const actualData = result.data || result;
      if (actualData) setData(actualData);
    } catch (err) {
      console.error("error loading detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  // --- AUTO RESIZE TEXTAREA ---
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [commentInput]);

  const handlePostComment = async () => {
    if (!commentInput.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/menfess/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: commentInput,
          name: "anonymous",
          replyTo: replyState?.id || null,
          replyToName: replyState?.name || null,
        }),
      });
      if (res.ok) {
        setCommentInput("");
        setReplyState(null);
        fetchDetail();
      }
    } catch (err) {
      console.error("failed comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleReaction = async (type: string, commentId?: string) => {
    // EXCLUSIVE LOGIC:
    // Jika user menekan tipe yang sama -> Unlike.
    // Jika user menekan tipe berbeda -> Unlike yang lama (secara logic) dan Like yang baru.

    const currentActive = commentId
      ? userCommentReactions[commentId]
      : userReaction;

    // Step 1: Jika ada reaksi lama yang berbeda, kurangi dulu di backend (optional logic)
    // Namun untuk simplifikasi UI anonim, kita langsung kirim POST baru.
    // Backend idealnya menangani: "Jika user X ganti reaksi, reactions[lama]-- dan reactions[baru]++"

    const endpoint = commentId
      ? `${API_BASE_URL}/menfess/${id}/comments/${commentId}/react`
      : `${API_BASE_URL}/menfess/${id}/react`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (res.ok) {
        if (commentId) {
          setUserCommentReactions((prev) => ({
            ...prev,
            [commentId]: currentActive === type ? null : type,
          }));
        } else {
          setUserReaction(currentActive === type ? null : type);
        }
        fetchDetail();
      }
    } catch (err) {
      console.error("reaction error:", err);
    }
  };

  if (loading || !data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-5 h-5 border-2 border-zinc-100 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );

  const trackId = data?.song?.url?.split("/track/")[1]?.split("?")[0] || "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyText = () => {
    if (!data) return;
    navigator.clipboard.writeText(
      `to: ${data.to}\n\n"${data.message}"\n\nshared via feeldrop.`,
    );
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <section className="min-h-screen bg-white py-12 px-6 relative overflow-hidden font-sans">
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/browse-message"
            className="text-zinc-400 hover:text-zinc-900 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={16} />{" "}
            <span className="text-[11px] font-medium lowercase">back</span>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleCopyText}
              className="h-8 rounded-full text-[10px] text-zinc-400 border border-zinc-100 px-3 lowercase"
            >
              {copiedText ? <Check size={12} /> : <Copy size={12} />} text
            </Button>
            <Button
              variant="ghost"
              onClick={handleCopyLink}
              className="h-8 rounded-full text-[10px] text-zinc-400 border border-zinc-100 px-3 lowercase"
            >
              {copiedLink ? <Check size={12} /> : <Share2 size={12} />} link
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden mb-12"
        >
          <div className="p-8 text-center border-b border-zinc-50">
            <h1 className="text-xl font-medium text-zinc-900 lowercase">
              hello,{" "}
              <span className="text-zinc-400">{data.to.toLowerCase()}</span>
            </h1>
          </div>
          <div className="px-8 py-8 bg-zinc-50/40">
            {" "}
            {/* Padding vertikal ditambah dari py-6 ke py-8 */}
            <div className="rounded-[2rem] overflow-hidden shadow-sm border border-zinc-100 bg-white p-1">
              <iframe
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
                width="100%"
                height="152" // Tinggi ditingkatkan dari 80 ke 152 untuk tampilan standard embed
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-[1.8rem]"
              />
            </div>
          </div>
          <div className="p-10 relative text-center">
            <Quote
              className="absolute top-6 left-6 text-zinc-50 rotate-180"
              size={32}
            />
            <p className="relative z-10 text-zinc-600 leading-relaxed lowercase whitespace-pre-line">
              {data.message.toLowerCase()}
            </p>
            <Quote
              className="absolute bottom-6 right-6 text-zinc-50"
              size={32}
            />

            <div className="mt-10 flex justify-center gap-6">
              {REACTION_TYPES.map((r) => {
                const reaction = data.reactions?.find((x) => x.type === r.type);
                const count = reaction?.count || 0;
                const isActive = userReaction === r.type;
                return (
                  <button
                    key={r.type}
                    onClick={() => handleToggleReaction(r.type)}
                    className={`flex flex-col items-center gap-1.5 transition-all ${isActive ? r.color : "text-zinc-200 hover:text-zinc-400"}`}
                  >
                    <r.icon
                      size={18}
                      fill={isActive ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                    <span className="text-[10px] font-medium">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-zinc-900 tracking-widest lowercase">
              comments ({data.comments?.length || 0})
            </span>
            <div className="h-px flex-1 bg-zinc-100" />
          </div>

          <div className="relative flex flex-col gap-0 group">
            <AnimatePresence>
              {replyState && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between px-5 py-2 bg-zinc-50 rounded-t-[1.5rem] border-x border-t border-zinc-100"
                >
                  <span className="text-[10px] text-zinc-400 lowercase">
                    replying to{" "}
                    <span className="font-bold text-zinc-900">
                      {replyState.name}
                    </span>
                  </span>
                  <X
                    size={12}
                    className="text-zinc-300 cursor-pointer"
                    onClick={() => setReplyState(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className={`bg-white border border-zinc-100 flex items-end p-2 ${replyState ? "rounded-b-[2rem]" : "rounded-[2rem]"} focus-within:border-zinc-300 shadow-sm`}
            >
              <textarea
                ref={textareaRef}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="share thoughts..."
                rows={1}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-zinc-600 px-4 py-2 resize-none max-h-40 lowercase"
              />
              <Button
                onClick={handlePostComment}
                disabled={!commentInput.trim() || isSubmitting}
                size="sm"
                className="rounded-full bg-zinc-900 text-white h-10 w-10 p-0 flex-shrink-0"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check size={16} />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-8 mt-12 pb-20">
            {data.comments?.map((comment: any) => {
              const isReply = comment.replyTo !== null;
              const activeCommentReaction = userCommentReactions[comment._id];
              return (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, x: isReply ? 10 : 0 }}
                  animate={{ opacity: 1, x: isReply ? 20 : 0 }}
                  className={`flex gap-4 group ${isReply ? "ml-8 sm:ml-12 border-l border-zinc-50 pl-4 sm:pl-6" : ""}`}
                >
                  <div
                    className={`rounded-2xl bg-zinc-50 border border-zinc-100 flex-shrink-0 flex items-center justify-center text-zinc-300 font-medium ${isReply ? "w-8 h-8 text-[10px]" : "w-10 h-10 text-[12px]"}`}
                  >
                    {comment.isSender ? "s" : "a"}
                  </div>
                  <div className="flex-grow pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`font-semibold text-zinc-900 lowercase ${isReply ? "text-[11px]" : "text-xs"}`}
                      >
                        {comment.isSender ? "sender" : "anonymous"}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-zinc-100" />
                      <span className="text-[9px] text-zinc-300 lowercase">
                        {new Date(comment.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p
                      className={`${isReply ? "text-xs" : "text-sm"} text-zinc-500 leading-relaxed lowercase`}
                    >
                      {comment.replyToName && (
                        <span className="text-zinc-400 font-medium mr-1.5 opacity-70">
                          @{comment.replyToName}
                        </span>
                      )}
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-5 mt-4">
                      <div className="flex gap-4">
                        {REACTION_TYPES.slice(0, 3).map((r) => {
                          const cCount =
                            comment.reactions?.find(
                              (x: any) => x.type === r.type,
                            )?.count || 0;
                          const isCommentActive =
                            activeCommentReaction === r.type;
                          return (
                            <button
                              key={r.type}
                              onClick={() =>
                                handleToggleReaction(r.type, comment._id)
                              }
                              className={`flex items-center gap-1.5 text-[10px] transition-all ${isCommentActive ? r.color : "text-zinc-200 hover:text-zinc-400"}`}
                            >
                              <r.icon
                                size={isReply ? 12 : 14}
                                fill={isCommentActive ? "currentColor" : "none"}
                                strokeWidth={1.5}
                              />
                              {cCount > 0 && <span>{cCount}</span>}
                            </button>
                          );
                        })}
                      </div>
                      {!isReply && (
                        <button
                          onClick={() => {
                            setReplyState({
                              id: comment._id,
                              name: comment.isSender ? "sender" : "anonymous",
                            });
                            textareaRef.current?.focus();
                          }}
                          className="text-[10px] text-zinc-300 hover:text-zinc-900 font-medium transition-colors lowercase"
                        >
                          reply
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailMenfess;
