import React from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, SendHorizontal } from "lucide-react";

const HeroSection = () => {
  // Animasi container yang lebih lambat dan elegan
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

  // Efek muncul dari bawah dengan durasi yang nyaman di mata
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
      {/* Ornamen Latar Belakang - Soft Gray Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-zinc-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[5%] right-[10%] w-96 h-96 bg-zinc-100/50 rounded-full blur-3xl opacity-40" />

        {/* Ornamen Garis Tipis (Grid Subtil) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge - Tanpa Uppercase & Rounded Penuh */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <span className="px-4 py-1.5 text-xs font-medium tracking-tight text-zinc-500 bg-zinc-50 border border-zinc-100 rounded-full">
            music-driven messages
          </span>
        </motion.div>

        {/* Main Heading - Menggunakan weight Medium/Semi-bold agar tidak terlalu tajam */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight text-zinc-900 mb-8 leading-[1.1]"
        >
          spill your feelings here. <br />
          <span className="text-zinc-400">let the song speak.</span>
        </motion.h1>

        {/* Subtitle - Soft & Readable */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-zinc-500 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          sometimes words aren't enough. pick a track, share your story, and let
          the melody bridge the gap between hearts.
        </motion.p>

        {/* Button Group - Desain Soft & Minimalist */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button className="h-14 px-8 text-sm font-medium rounded-full bg-zinc-900 hover:bg-zinc-800 text-white transition-all duration-300 flex gap-2 group shadow-sm">
            tell your story
            <SendHorizontal className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="ghost"
            className="h-14 px-8 text-sm font-medium rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-300 flex gap-2"
          >
            browse stories <Search className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Ornamen Geometris Lembut (Floating Icons) */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-visible">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-[10%] hidden lg:block opacity-30"
          >
            <div className="w-12 h-12 border border-zinc-200 rounded-2xl" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-[5%] hidden lg:block opacity-30"
          >
            <div className="w-16 h-16 border border-zinc-200 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
