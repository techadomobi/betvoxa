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
        className={`w-full z-50 transition-all duration-300 bg-[#0B1120] border-b border-[#101623]/40 shadow-sm`}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" data-testid="link-logo">
              <div className="flex items-center gap-2 group cursor-pointer h-16">
                <img
                  src="/logo.png"
                  alt="BetVoxa"
                  className="w-auto h-59 sm:h-49 max-h-30 object-contain group-hover:scale-105 transition-transform"
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
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-md text-sm font-bold hover:bg-[#1D4ED8] transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.28)] active:scale-95">
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black/40 pt-16 px-6 flex items-start justify-center"
          >
            <div className="w-full max-w-2xl bg-[#0F1F33] rounded-b-xl shadow-2xl mt-6 overflow-auto" style={{ maxHeight: '90vh' }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="BetVoxa" className="h-10 w-auto" />
                    <div className="text-lg font-bold text-white">BetVoxa</div>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="text-white">
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div className="block w-full text-left px-4 py-3 bg-[#13253D] text-white rounded-md cursor-pointer hover:bg-[#1B3950] transition-colors">
                        {link.label}
                      </div>
                    </Link>
                  ))}
                </nav>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/disclaimer"><a className="px-3 py-2 bg-[#2563EB] text-white rounded text-sm">Disclaimer</a></Link>
                  <Link href="/privacy"><a className="px-3 py-2 bg-[#2563EB] text-white rounded text-sm">Privacy Policy</a></Link>
                  <Link href="/terms-and-conditions"><a className="px-3 py-2 bg-[#2563EB] text-white rounded text-sm">Terms & Conditions</a></Link>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-bold text-[#9DB3C9] mb-2">Country Pages</div>
                  <div className="grid gap-1">
                    {countries.map((c) => (
                      <Link key={c.code} href={`/country/${c.code}`}>
                        <div className="px-4 py-2 text-[#C7D5E6] hover:text-white rounded cursor-pointer">{c.flag} {c.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/casino-bonuses">
                    <button className="w-full py-3 bg-[#10B981] text-white rounded-md font-bold">Claim Bonus</button>
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


