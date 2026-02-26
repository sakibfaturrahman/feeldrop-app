import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Music, MessageSquareHeart, Eye } from "lucide-react";

const features = [
  {
    title: "send a message",
    desc: "write an anonymous message and pick a meaningful song to go with it.",
    icon: <MessageSquareHeart className="w-6 h-6 stroke-[1.5]" />,
  },
  {
    title: "explore messages",
    desc: "discover messages shared by others. who knows—one might be for you!",
    icon: <Music className="w-6 h-6 stroke-[1.5]" />,
  },
  {
    title: "view full story",
    desc: "tap a message card to read it fully and hear the song behind the story.",
    icon: <Eye className="w-6 h-6 stroke-[1.5]" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-100 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-50 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <Card className="relative h-full bg-transparent border-none shadow-none group-hover:bg-zinc-50/50 transition-colors duration-700 rounded-[2rem]">
                <CardContent className="p-10 flex flex-col items-center text-center">
                  {/* Icon Container - No colors, just soft borders */}
                  <div className="relative mb-8">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 flex items-center justify-center rounded-2xl border border-zinc-100 bg-white text-zinc-400 group-hover:text-zinc-900 group-hover:border-zinc-300 transition-all duration-500 shadow-sm"
                    >
                      {feature.icon}
                    </motion.div>

                    {/* Shadow Decor */}
                    <div className="absolute -bottom-2 inset-x-2 h-4 bg-zinc-100/50 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* Text Content - No bold/black weights */}
                  <h3 className="text-lg font-medium text-zinc-800 mb-4 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed text-[15px] font-normal px-2">
                    {feature.desc}
                  </p>

                  {/* Minimalist Indicator */}
                  <div className="mt-8 w-1 h-1 rounded-full bg-zinc-200 group-hover:w-8 group-hover:bg-zinc-800 transition-all duration-700 ease-in-out" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Soft Ornaments */}
      <div className="absolute -left-10 top-1/4 w-24 h-24 border border-zinc-50 rounded-full opacity-50" />
      <div className="absolute -right-10 bottom-1/4 w-40 h-40 border border-zinc-50 rounded-full opacity-50" />
    </section>
  );
};

export default FeaturesSection;
