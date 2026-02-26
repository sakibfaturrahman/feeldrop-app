import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Efek transparansi saat scroll agar lebih soft
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      name: "submit story",
      href: "/message",
      icon: <Send className="w-3.5 h-3.5" />,
    },
    {
      name: "browse feed",
      href: "/browse-message",
      icon: <Search className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl py-3 border-b border-zinc-100 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            {/* <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div> */}
            <Link
              to="/"
              className="text-xl font-medium tracking-tighter text-zinc-900 lowercase"
            >
              feeldrop.
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-5 py-2 text-[13px] font-medium transition-all duration-300 rounded-full lowercase relative group ${
                    isActive
                      ? "text-zinc-900"
                      : "text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Soft Background Hover/Active */}
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-zinc-50 rounded-full border border-zinc-100/50"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-zinc-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0 opacity-50" />
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-100 text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            {isOpen ? (
              <X size={18} strokeWidth={1.5} />
            ) : (
              <Menu size={18} strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="sm:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-6 pb-4">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between py-4 px-5 rounded-2xl transition-all duration-300 border ${
                        isActive
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-200"
                          : "bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300"
                      }`}
                    >
                      <span className="text-[14px] font-medium lowercase tracking-tight">
                        {item.name}
                      </span>
                      <div
                        className={isActive ? "text-white/70" : "text-zinc-300"}
                      >
                        {item.icon}
                      </div>
                    </Link>
                  );
                })}

                {/* Decoration Ornaments for Mobile Menu */}
                <div className="mt-4 flex justify-center gap-1.5 opacity-20">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-zinc-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top Thin Ornament Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-100 to-transparent" />
    </nav>
  );
};

export default Navbar;
