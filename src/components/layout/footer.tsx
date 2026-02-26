import { Github, Instagram, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4 stroke-[1.5]" />,
      href: "https://github.com/sakibfaturrahman",
    },
    {
      icon: <Instagram className="w-4 h-4 stroke-[1.5]" />,
      href: "https://instagram.com/sakibfaturrahman",
    },
    {
      icon: <Globe className="w-4 h-4 stroke-[1.5]" />,
      href: "https://ftrtech.web.id",
    },
  ];

  return (
    <footer className="bg-white border-t border-zinc-100 pt-24 pb-12 relative overflow-hidden">
      {/* Soft Ornaments */}
      <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-zinc-100 via-transparent to-transparent opacity-50" />
      <div className="absolute top-20 left-0 w-24 h-24 border border-zinc-50 rounded-full -ml-12 opacity-50" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Section */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium tracking-tight text-zinc-900 lowercase">
                feeldrop.
              </h2>
              <div className="w-8 h-0.5 bg-zinc-900 rounded-full" />
            </div>
            <p className="text-[15px] text-zinc-400 max-w-sm leading-relaxed font-normal lowercase">
              a minimalist space to convey unspoken emotions through melodies.
              let the music speak where words fail.
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{
                    y: -3,
                    backgroundColor: "#f4f4f5",
                    borderColor: "#18181b",
                  }}
                  href={social.href}
                  target="_blank"
                  className="p-3 rounded-full border border-zinc-100 text-zinc-400 hover:text-zinc-900 transition-all duration-500"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h3 className="text-[11px] font-medium tracking-[0.2em] text-zinc-300 lowercase">
              navigation
            </h3>
            <nav className="flex flex-col gap-4">
              {["submit message", "browse feed", "developer portfolio"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-900 transition-all duration-300 w-fit font-normal lowercase"
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>
          </div>

          {/* Inspiration Section */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h3 className="text-[11px] font-medium tracking-[0.2em] text-zinc-300 lowercase">
              acknowledgements
            </h3>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-zinc-400 font-normal leading-relaxed lowercase">
                inspired by the soul of{" "}
                <a
                  href="https://sendthesong.xyz"
                  target="_blank"
                  className="text-zinc-900 border-b border-zinc-100 hover:border-zinc-900 transition-colors"
                >
                  sendthesong.xyz
                </a>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-1 h-1 rounded-full bg-zinc-200" />
                <p className="text-[11px] text-zinc-300 font-medium tracking-tight lowercase">
                  tasikmalaya, indonesia 🇮🇩
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-zinc-300 font-medium tracking-widest lowercase">
            © {currentYear} feeldrop. all rights reserved.
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium lowercase">
            crafted with{" "}
            <Heart className="w-3 h-3 text-zinc-200 fill-zinc-200" /> by
            <span className="text-zinc-900 underline underline-offset-4 decoration-zinc-100">
              sakib faturrahman
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
