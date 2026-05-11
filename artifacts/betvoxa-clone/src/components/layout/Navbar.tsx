import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Menu, X, Trophy, Gift, BookOpen, Globe, Shield, FileText } from "lucide-react";

const countries = [
  { name: "United Kingdom", code: "united-kingdom", flag: "🇬🇧" },
  { name: "United States", code: "united-states", flag: "🇺🇸" },
  { name: "Australia", code: "australia", flag: "🇦🇺" },
  { name: "Canada", code: "canada", flag: "🇨🇦" },
  { name: "Germany", code: "germany", flag: "🇩🇪" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => undefined;
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/casino-bonuses", label: "Casino Bonuses", icon: Gift },
    { href: "/betting-sites", label: "Betting Sites", icon: Trophy },
    { href: "/casinos", label: "Live Offers", icon: Globe },
    { href: "/blog", label: "Blog", icon: BookOpen },
  ];

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 w-full border-b border-[#1d3565] bg-[linear-gradient(180deg,rgba(7,17,34,0.96),rgba(11,22,48,0.94))] shadow-[0_8px_24px_rgba(8,17,34,0.28)] backdrop-blur-md"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="w-full px-3 sm:px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left menu */}
            <button
              className="p-2 rounded-md text-[#e8edff] hover:text-white hover:bg-white/8 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <Link href="/" data-testid="link-logo">
              <div className="flex items-center gap-2 group cursor-pointer h-14">
                <img
                  src="/logo.png"
                  alt="BetVoxa"
                  className="w-auto h-32 sm:h-32 max-h-32 object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            <div className="w-9" aria-hidden="true" />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#071122]/56 pt-14 px-3 flex items-start justify-start backdrop-blur-[2px]"
          >
            <div className="w-full max-w-[320px] bg-[linear-gradient(180deg,rgba(11,22,48,0.98),rgba(7,17,34,0.98))] text-[#e8edff] rounded-r-[20px] shadow-2xl mt-2 overflow-auto border border-[#1d3565]" style={{ maxHeight: '90vh' }}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1d3565]">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="BetVoxa" className="h-9 w-auto" />
                    <div className="text-base font-bold text-[#e8edff]">BetVoxa</div>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="text-[#e8edff]">
                    <X size={20} />
                  </button>
                </div>

                <nav className="grid grid-cols-1 gap-2">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div className="flex items-center gap-3 w-full text-left px-4 py-3 bg-[#0d1b39] text-[#e8edff] rounded-lg cursor-pointer hover:bg-[#14254b] transition-colors border border-[#1d3565]">
                        <link.icon size={16} className="text-[#60a5fa] shrink-0" />
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  ))}
                </nav>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <Link href="/privacy"><a className="flex items-center gap-2 px-3 py-2 bg-[#0d1b39] border border-[#1d3565] text-[#c5cce2] rounded text-xs"><Shield size={14} className="text-[#60a5fa]" />Privacy Policy</a></Link>
                  <Link href="/terms-and-conditions"><a className="flex items-center gap-2 px-3 py-2 bg-[#0d1b39] border border-[#1d3565] text-[#c5cce2] rounded text-xs"><FileText size={14} className="text-[#60a5fa]" />Terms & Conditions</a></Link>
                  <Link href="/responsible-gambling"><a className="flex items-center gap-2 px-3 py-2 bg-[#0d1b39] border border-[#1d3565] text-[#c5cce2] rounded text-xs"><Shield size={14} className="text-[#60a5fa]" />Disclaimer</a></Link>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#6F665D] mb-2">Country Pages</div>
                  <div className="grid grid-cols-2 gap-2">
                    {countries.map((c) => (
                      <Link key={c.code} href={`/country/${c.code}`}>
                        <div className="flex items-center gap-2 px-3 py-2 text-[#c5cce2] bg-[#0d1b39] border border-[#1d3565] hover:text-white rounded-md cursor-pointer text-xs">
                          <Globe size={13} className="text-[#60a5fa] shrink-0" />
                          <span>{c.flag}</span>
                          <span className="truncate">{c.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <Link href="/casino-bonuses">
                    <button className="w-full py-3 bg-[#2563EB] text-white rounded-lg font-bold shadow-[0_0_18px_rgba(37,99,235,0.18)]">Claim Bonus</button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


