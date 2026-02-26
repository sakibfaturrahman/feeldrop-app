import React from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Music, Search, SendHorizontal, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-40">
      {/* --- BACKGROUND ORNAMENTS START --- */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* 1. Grain/Noise Texture (Subtle Paper Feel) */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3 Frederic %3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* 2. Soft Ambient Glows */}
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-zinc-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[-5%] w-[40%] h-[40%] bg-zinc-50 rounded-full blur-[100px]" />

        {/* 3. Subtle Grid with Masking */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* 4. Decorative Floating Lines (Soft Gray) */}
        <svg
          className="absolute top-20 left-10 w-64 h-64 opacity-[0.05]"
          viewBox="0 0 200 200"
        >
          <path
            d="M0 100 Q 50 50 100 100 T 200 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      {/* --- BACKGROUND ORNAMENTS END --- */}

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight text-zinc-900 mb-8 leading-[1.1] lowercase"
        >
          spill your feelings here. <br />
          <span className="text-zinc-300">let the song speak.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed lowercase"
        >
          sometimes words aren't enough. pick a track, share your story, and let
          the melody bridge the gap between hearts.
        </motion.p>

        {/* Button Group */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/message">
            <Button className="h-14 px-10 text-[13px] font-medium rounded-full bg-zinc-900 hover:bg-zinc-800 text-white transition-all duration-500 flex gap-2 group shadow-none lowercase">
              tell your story
              <SendHorizontal className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Tombol ke halaman jelajah pesan */}
          <Link to="/browse-message">
            <Button
              variant="ghost"
              className="h-14 px-10 text-[13px] font-medium rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-500 flex gap-2 lowercase"
            >
              browse stories <Search className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Enhanced Floating Shapes */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-visible">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20px] left-[-5%] opacity-[0.08]"
          >
            <div className="w-24 h-24 border border-zinc-900 rounded-[2rem]" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-[-5%] opacity-[0.08]"
          >
            <div className="w-32 h-32 border border-zinc-900 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
