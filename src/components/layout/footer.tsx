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
      href: "https://sakibdev.my.id",
    },
  ];

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden bg-white border-t border-zinc-100">
      {/* Soft Ornaments */}
      <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-zinc-100 via-transparent to-transparent opacity-50" />
      <div className="absolute left-0 w-24 h-24 -ml-12 border rounded-full opacity-50 top-20 border-zinc-50" />

      <div className="max-w-6xl px-6 mx-auto">
        <div className="grid grid-cols-1 gap-16 mb-24 md:grid-cols-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-6 md:col-span-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium tracking-tight lowercase text-zinc-900">
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
                  className="p-3 transition-all duration-500 border rounded-full border-zinc-100 text-zinc-400 hover:text-zinc-900"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 md:col-span-3">
            <h3 className="text-[11px] font-medium tracking-[0.2em] text-zinc-300 lowercase">
              navigation
            </h3>
            <nav className="flex flex-col gap-4">
              {["submit message", "browse feed", "developer portfolio"].map(
                (item) => (
                  <a
                    key={item}
                    href="https://sakibdev.my.id"
                    className="text-sm font-normal lowercase transition-all duration-300 text-zinc-400 hover:text-zinc-900 w-fit"
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>
          </div>

          {/* Inspiration Section */}
          <div className="flex flex-col gap-6 md:col-span-3">
            <h3 className="text-[11px] font-medium tracking-[0.2em] text-zinc-300 lowercase">
              acknowledgements
            </h3>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-normal leading-relaxed lowercase text-zinc-400">
                inspired by the soul of{" "}
                <a
                  href="https://sendthesong.xyz"
                  target="_blank"
                  className="transition-colors border-b text-zinc-900 border-zinc-100 hover:border-zinc-900"
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
        <div className="flex flex-col items-center justify-between gap-6 pt-10 border-t border-zinc-50 md:flex-row">
          <div className="text-[11px] text-zinc-300 font-medium tracking-widest lowercase">
            © {currentYear} feeldrop. all rights reserved.
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium lowercase">
            crafted with{" "}
            <Heart className="w-3 h-3 text-zinc-200 fill-zinc-200" /> by
            <span className="underline text-zinc-900 underline-offset-4 decoration-zinc-100">
              sakib faturrahman
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
