import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Trophy } from "lucide-react";

const countries = [
  { name: "United Kingdom", code: "united-kingdom", flag: "🇬🇧" },
  { name: "United States", code: "united-states", flag: "🇺🇸" },
  { name: "Australia", code: "australia", flag: "🇦🇺" },
  { name: "Canada", code: "canada", flag: "🇨🇦" },
  { name: "Germany", code: "germany", flag: "🇩🇪" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [location] = useLocation();

  const isCasinoRoute = location === '/casino' || location === '/casino-bonuses' || location.startsWith('/casino');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCountryDropdown(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/casino-bonuses", label: "Casino Bonuses" },
    { href: "/betting-sites", label: "Betting Sites" },
    { href: "/casinos", label: "casinos" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-[#2563EB]/12 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" data-testid="link-logo">
              <div className="flex items-center gap-2 group cursor-pointer">
                <img
                  src="/logo.png"
                  alt="BetVoxa"
                  className="w-49 h-59 rounded-md object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      location === link.href
                        ? "text-[#2563EB]"
                        : isCasinoRoute && !scrolled
                        ? "text-[#1F1A17] hover:text-[#2563EB]"
                        : "text-[#1F1A17] hover:text-[#2563EB]"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}

              {/* Country Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCountryDropdown(true)}
                onMouseLeave={() => setCountryDropdown(false)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isCasinoRoute && !scrolled ? 'text-[#1F1A17] hover:text-[#2563EB]' : 'text-[#1F1A17] hover:text-[#2563EB]'
                  }`}
                  data-testid="button-country-dropdown"
                >
                  Country Pages
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${countryDropdown ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {countryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-white border border-[#E7E1D6] rounded-lg shadow-xl overflow-hidden"
                    >
                      {countries.map((c) => (
                        <Link key={c.code} href={`/country/${c.code}`} data-testid={`link-country-${c.code}`}>
                          <div className="flex items-center gap-2 px-4 py-3 text-sm text-[#1F1A17] hover:bg-[#2563EB]/8 hover:text-[#2563EB] transition-colors cursor-pointer">
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
                <Link href="/casino-bonuses" data-testid="button-claim-bonus-nav">
                  <button className={`flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] ${isCasinoRoute && !scrolled ? 'text-white' : 'text-[#1F1A17]'} rounded-md text-sm font-bold hover:bg-[#1D4ED8] transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.28)] active:scale-95`}>
                    <Trophy size={14} />
                    Claim Bonus
                  </button>
                </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 ${isCasinoRoute && !scrolled ? 'text-[#1F1A17] hover:text-[#2563EB]' : 'text-[#1F1A17] hover:text-[#2563EB]'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#eef6ff] pt-16 px-6 flex flex-col gap-2 overflow-y-auto"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="text-xl font-semibold py-4 border-b border-[#E7E1D6] text-[#1F1A17] hover:text-[#2563EB] transition-colors cursor-pointer">
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="text-xs font-bold uppercase text-[#8D847A] mt-4 mb-1 tracking-widest">
              Country Pages
            </div>
            {countries.map((c) => (
              <Link key={c.code} href={`/country/${c.code}`}>
                <div className="flex items-center gap-2 py-3 text-[#1F1A17] hover:text-[#2563EB] transition-colors cursor-pointer border-b border-[#ECE6DB]">
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </div>
              </Link>
            ))}
            <Link href="/casino-bonuses">
              <button className="mt-6 w-full py-4 bg-[#2563EB] text-[#1F1A17] rounded-lg font-bold text-lg hover:bg-[#1D4ED8] transition-colors">
                Claim Bonus
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


