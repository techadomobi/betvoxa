import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Shield, Zap, TrendingUp, Globe, Star, ChevronDown, ChevronUp,
  Trophy, CheckCircle, ArrowRight, ExternalLink, Flame, Clock,
  CreditCard, Smartphone, Award, BarChart2, Target, Gift, Lock, Users
} from "lucide-react";
import BonusCard from "@/components/BonusCard";

const topCasinos = [
  { rank: 1, initials: "JB", name: "Jackbit", reviews: 5120, rating: 5, bonusTitle: "Wager Free Bonus", bonusDetail: "Crypto specialist — instant payouts", wagering: "0x", minDeposit: "A$30", features: ["Crypto specialist", "Instant payouts", "Wager-free"], featured: true },
  { rank: 2, initials: "VL", name: "VipLuck", reviews: 4210, rating: 4.5, bonusTitle: "Welcome Bonus Package", wagering: "35x", minDeposit: "A$30", features: ["Fast payouts", "Live casino", "Great support"] },
  { rank: 3, initials: "GL", name: "Glorion", reviews: 3820, rating: 4, bonusTitle: "100% Deposit Match", wagering: "40x", minDeposit: "A$30", features: ["Huge game library", "Crypto accepted", "VIP program"] },
  { rank: 4, initials: "PS", name: "PokerStars", reviews: 15632, rating: 4.7, bonusTitle: "€600 + 100 Free Spins", bonusDetail: "3-step welcome package", wagering: "35x", minDeposit: "€10", features: ["Exclusive games", "Progressive jackpots", "VIP program"] },
  { rank: 5, initials: "OJO", name: "PlayOJO", reviews: 8934, rating: 4.7, bonusTitle: "50 Free Spins, No Wagering", bonusDetail: "The fairest bonus in the industry", wagering: "0x", minDeposit: "£10", features: ["Zero wagering", "Cashback rewards", "Fair play"] },
];

const countryOffers = [
  { flag: "🇬🇧", country: "United Kingdom", code: "united-kingdom", sites: ["Bet365", "LeoVegas", "Betway", "888 Casino"], topBonus: "£100 Welcome Bonus" },
  { flag: "🇺🇸", country: "United States", code: "united-states", sites: ["DraftKings", "FanDuel", "BetMGM", "Caesars"], topBonus: "$1,000 Match Bonus" },
  { flag: "🇦🇺", country: "Australia", code: "australia", sites: ["Sportsbet", "Ladbrokes", "Neds", "Pointsbet"], topBonus: "A$500 Welcome Bonus" },
  { flag: "🇨🇦", country: "Canada", code: "canada", sites: ["Sports Interaction", "Betway", "PointsBet", "TheScore"], topBonus: "C$1,000 Welcome Bonus" },
  { flag: "🇩🇪", country: "Germany", code: "germany", sites: ["Tipico", "Bet365", "Betway", "Unibet"], topBonus: "€200 Deposit Match" },
  { flag: "🇮🇪", country: "Ireland", code: "ireland", sites: ["Paddy Power", "Bet365", "BoyleSports", "Betfair"], topBonus: "€50 Free Bet" },
];

const trustFeatures = [
  { icon: Shield, title: "Secure Payments", desc: "All featured operators use industry-standard 256-bit SSL encryption and secure payment methods to protect your funds and personal information." },
  { icon: CheckCircle, title: "Verified Operators", desc: "We only recommend licensed and regulated operators with proven track records of fair play and customer satisfaction." },
  { icon: Zap, title: "Fast Payouts", desc: "Get your winnings quickly with operators offering same-day withdrawals and multiple payment options including e-wallets." },
  { icon: TrendingUp, title: "Best Odds", desc: "Compare odds across multiple operators to ensure you always get the best value for your bets and maximise your returns." },
  { icon: Globe, title: "Global Coverage", desc: "Exclusive bonuses spanning 50+ countries so you always find an offer tailored to your region and payment methods." },
  { icon: Trophy, title: "Exclusive Deals", desc: "BetVoxa negotiates bonuses you won't find anywhere else — higher limits, lower wagering, more free spins." },
];

const faqs = [
  { q: "How do casino bonuses work?", a: "Casino bonuses are promotional offers given by online casinos to attract and retain players. They typically come as matched deposits, free spins, or no-deposit bonuses. When you claim a bonus, the casino adds extra funds or spins to your account based on the offer's terms." },
  { q: "What are wagering requirements?", a: "Wagering requirements (also called playthrough requirements) specify how many times you must bet the bonus amount before you can withdraw any winnings. For example, a 35x wagering requirement on a £100 bonus means you need to wager £3,500 before withdrawing." },
  { q: "How long does verification take?", a: "KYC (Know Your Customer) verification typically takes 24–48 hours at most operators. You'll need to provide proof of identity (passport or driving licence) and proof of address (utility bill or bank statement). Some operators offer instant verification." },
  { q: "Are these sites safe and licensed?", a: "Every site featured on BetVoxa is licensed by reputable gambling authorities such as the UK Gambling Commission, Malta Gaming Authority, Gibraltar Regulatory Authority, or similar bodies. We conduct thorough checks before recommending any operator." },
  { q: "How fast are withdrawals?", a: "Withdrawal speeds vary by method and operator. E-wallets (PayPal, Skrill, Neteller) are typically instant to 24 hours. Bank transfers take 3–5 business days. Credit/debit cards take 1–3 business days. We highlight operators with the fastest payouts." },
  { q: "Can I claim bonuses from multiple sites?", a: "Yes, you can claim welcome bonuses from multiple sites as long as you haven't previously registered with them. This is known as bonus hunting or bonus bagging and is completely legal." },
  { q: "What payment methods are supported?", a: "Most operators accept Visa, Mastercard, PayPal, Skrill, Neteller, bank transfers, and increasingly cryptocurrency. Each site page shows accepted methods. E-wallets are usually fastest for deposits and withdrawals." },
  { q: "Is there a minimum age to bet?", a: "Yes. The minimum age is 18+ in most countries (21+ in some US states). All recommended operators enforce strict age verification and will require proof of age before processing withdrawals." },
];

const popularSports = [
  { name: "Football", emoji: "⚽", markets: "1,200+", bestSite: "Bet365" },
  { name: "Horse Racing", emoji: "🏇", markets: "800+", bestSite: "William Hill" },
  { name: "Basketball", emoji: "🏀", markets: "600+", bestSite: "DraftKings" },
  { name: "Tennis", emoji: "🎾", markets: "500+", bestSite: "Unibet" },
  { name: "Cricket", emoji: "🏏", markets: "400+", bestSite: "Bet365" },
  { name: "Golf", emoji: "⛳", markets: "300+", bestSite: "Betfair" },
  { name: "MMA / UFC", emoji: "🥊", markets: "250+", bestSite: "DraftKings" },
  { name: "Esports", emoji: "🎮", markets: "200+", bestSite: "Unibet" },
];

const recentWinners = [
  { name: "James T.", country: "🇬🇧", amount: "£12,400", game: "Live Roulette", time: "2h ago" },
  { name: "Maria G.", country: "🇦🇺", amount: "A$8,920", game: "Mega Moolah Slots", time: "4h ago" },
  { name: "Carlos R.", country: "🇺🇸", amount: "$22,100", game: "Football Parlay", time: "6h ago" },
  { name: "Sophie L.", country: "🇩🇪", amount: "€5,600", game: "Blackjack Live", time: "8h ago" },
  { name: "Alex M.", country: "🇨🇦", amount: "C$9,880", game: "NHL Same-Game Parlay", time: "10h ago" },
  { name: "Priya K.", country: "🇬🇧", amount: "£4,200", game: "Baccarat", time: "12h ago" },
];

const bonusTypes = [
  { icon: Gift, title: "Welcome Bonus", desc: "Match your first deposit up to a specified amount. Standard at most casinos. Check wagering before claiming.", tag: "Most Popular" },
  { icon: Zap, title: "Free Spins", desc: "Spin slot reels without using your own money. Often attached to welcome bonuses or given as loyalty rewards.", tag: "Great for Slots" },
  { icon: Target, title: "No Deposit Bonus", desc: "Free cash or spins with no deposit required. Usually small but risk-free — perfect for testing a casino.", tag: "Risk Free" },
  { icon: BarChart2, title: "Cashback Bonus", desc: "Get a percentage of your losses back, typically weekly. Reduces the house edge and extends your bankroll.", tag: "Great Value" },
  { icon: Award, title: "Reload Bonus", desc: "Bonus on subsequent deposits after your welcome offer. Rewarding loyalty with ongoing matched bonuses.", tag: "Loyal Players" },
  { icon: Trophy, title: "VIP / Loyalty", desc: "Exclusive high-roller bonuses, personal account managers, faster withdrawals and luxury gifts.", tag: "High Rollers" },
];

const paymentMethods = [
  { name: "PayPal", speed: "Instant", fee: "Free", logo: "PP" },
  { name: "Visa / Mastercard", speed: "1–3 days", fee: "Free", logo: "CARD" },
  { name: "Skrill", speed: "Instant", fee: "Free", logo: "SK" },
  { name: "Neteller", speed: "Instant", fee: "Free", logo: "NE" },
  { name: "Bitcoin", speed: "Instant", fee: "Network", logo: "BTC" },
  { name: "Bank Transfer", speed: "3–5 days", fee: "Free", logo: "BANK" },
];

const testimonials = [
  { name: "Richard M.", rating: 5, text: "BetVoxa helped me find a no-wagering bonus I'd never have found myself. Claimed £200 on PlayOJO and cashed out the same day. Brilliant resource.", country: "🇬🇧" },
  { name: "Samantha P.", rating: 5, text: "I was new to online betting and BetVoxa made everything simple. Clear explanations of wagering requirements and only recommending legitimate sites — exactly what I needed.", country: "🇦🇺" },
  { name: "Marcus K.", rating: 5, text: "The US sportsbook comparisons are fantastic. DraftKings vs FanDuel side by side saved me a lot of research. The bonus tracking is a great feature.", country: "🇺🇸" },
  { name: "Lena W.", rating: 4, text: "Very thorough reviews. I appreciate that they highlight the downsides of each bonus too, not just the headline offer. Transparent and honest.", country: "🇩🇪" },
];

function CounterStat({ value, label, prefix = "", suffix = "" }: { value: number; label: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 60;
    const step = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-serif font-bold text-[#F97316] mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-[#6F665D] text-sm">{label}</div>
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          {/* background overlays removed to ensure hero text visibility */}
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-[#F97316]/30"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }} />
          ))}
        </div>
        <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#F97316]/8 border border-[#F97316]/12 rounded-full px-4 py-1.5 text-[#F97316] text-sm font-medium mb-6">
            <Star size={13} className="fill-[#F97316]" /> Trusted by 2M+ bettors worldwide
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif text-5xl md:text-7xl font-bold text-[#1F1A17] leading-tight mb-6">
            Best Betting <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[#F97316] text-glow">& </span> <span className="text-[#F97316] text-glow">Casino Offers</span> Worldwide
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="text-[#5F554C] text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Compare top operators, claim exclusive bonuses, and start winning today. Expert-verified offers updated daily.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/casino-bonuses" data-testid="button-hero-claim">
              <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(224,174,46,0.5)" }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[#F97316] text-[#0B0A09] rounded-xl font-bold text-lg hover:bg-[#DC6803] transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center gap-2">
                <Trophy size={18} /> Claim Bonus Now
              </motion.button>
            </Link>
            <Link href="/betting-sites" data-testid="button-hero-explore">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[#1B3950] border border-[#1B3950] text-white rounded-xl font-bold text-lg hover:bg-[#1B3950]/80 transition-all">
                Explore Sites
              </motion.button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#A39B92]">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ChevronDown size={16} /></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS TICKER ─── */}
      <section className="bg-[#F97316]/5 border-y border-[#F97316]/10 py-14">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <CounterStat value={250} suffix="+" label="Verified Operators" />
          <CounterStat value={50} suffix="+" label="Countries Covered" />
          <CounterStat value={2} suffix="M+" label="Happy Bettors" />
          <CounterStat value={500} suffix="+" label="Exclusive Bonuses" />
        </div>
      </section>

      {/* ─── LIVE WINNERS TICKER ─── */}
      <section className="bg-[#F3F1EA] border-b border-[#EFE9DE] py-4 overflow-hidden">
        <div className="flex items-center gap-4 px-4 mb-1">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Live Winners</span>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...recentWinners, ...recentWinners].map((w, i) => (
              <div key={i} className="flex items-center gap-2 text-sm flex-shrink-0">
                <span>{w.country}</span>
                <span className="text-[#4A433C] font-medium">{w.name}</span>
                <span className="text-[#8D847A]">won</span>
                <span className="text-[#F97316] font-bold">{w.amount}</span>
                <span className="text-[#8D847A]">on {w.game}</span>
                <span className="text-[#B4ADA3] text-xs">{w.time}</span>
                <span className="text-[#E4DED0] mx-2">|</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TOP CASINO OFFERS ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Hand-picked for you</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-4">Top Casino Offers</h2>
          <p className="text-[#6F665D] text-lg max-w-xl mx-auto">Exclusive bonuses from the world's leading operators, verified and updated daily.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topCasinos.map((casino) => <BonusCard key={casino.name} {...casino} />)}
        </div>
        <div className="text-center mt-8">
          <Link href="/casino-bonuses" data-testid="link-view-all-casinos">
            <motion.button whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-6 py-3 border border-[#F97316]/12 text-[#F97316] rounded-lg hover:bg-[#F97316]/8 transition-colors font-medium">
              View All Casino Bonuses <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ─── BONUS TYPES GUIDE ─── */}
      <section className="py-20 bg-[#F3F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Know before you claim</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-4">Types of Casino Bonuses</h2>
            <p className="text-[#6F665D] text-lg max-w-xl mx-auto">Understanding what each bonus type means helps you pick the right offer for your style of play.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bonusTypes.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.3)" }}
                  className="bg-white border border-[#ECE6DB] rounded-2xl p-6 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#F97316]/8 border border-[#F97316]/12 flex items-center justify-center">
                      <Icon size={20} className="text-[#F97316]" />
                    </div>
                    <span className="bg-[#1B3950]/60 border border-[#1B3950] text-[#5F554C] text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider">{b.tag}</span>
                  </div>
                  <h3 className="font-semibold text-[#1F1A17] text-lg mb-2">{b.title}</h3>
                  <p className="text-[#6F665D] text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── OFFERS BY COUNTRY ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Localised for you</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-4">Offers by Country</h2>
            <p className="text-[#6F665D] text-lg max-w-xl mx-auto">Find the best bonuses available in your region, tailored to local regulations and payment methods.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryOffers.map((c, i) => (
              <motion.div key={c.code}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.4)" }}
                className="bg-white border border-[#ECE6DB] rounded-2xl p-6 group transition-all duration-300 cursor-pointer">
                <Link href={`/country/${c.code}`} data-testid={`link-country-card-${c.code}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{c.flag}</span>
                    <div>
                      <div className="font-semibold text-[#1F1A17] text-lg">{c.country}</div>
                      <div className="text-[#F97316] text-sm font-medium">{c.topBonus}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.sites.map((site) => (
                      <span key={site} className="bg-white border border-[#E7E1D6] text-[#5F554C] text-xs px-2 py-0.5 rounded-full">{site}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[#F97316] text-sm font-medium group-hover:gap-2 transition-all">
                    View all offers <ArrowRight size={13} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR SPORTS ─── */}
      <section className="py-20 bg-[#F3F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Bet on anything</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-4">Popular Sports &amp; Markets</h2>
            <p className="text-[#6F665D] text-lg max-w-xl mx-auto">From football to esports — find the best sportsbook for your favourite sport.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popularSports.map((s, i) => (
              <motion.div key={s.name}
                initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, borderColor: "rgba(224,174,46,0.35)" }}
                className="bg-white border border-[#ECE6DB] rounded-2xl p-5 text-center transition-all duration-300 cursor-pointer">
                <div className="text-4xl mb-3">{s.emoji}</div>
                <div className="font-semibold text-[#1F1A17] mb-1">{s.name}</div>
                <div className="text-[#F97316] text-xs font-medium mb-2">{s.markets} markets</div>
                <div className="text-[#8D847A] text-xs">Best: {s.bestSite}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/betting-sites">
              <motion.button whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-6 py-3 border border-[#F97316]/12 text-[#F97316] rounded-lg hover:bg-[#F97316]/8 transition-colors font-medium" data-testid="link-sports-all">
                Compare All Betting Sites <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY BETVOXA ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Our promise</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-4">Why Choose BetVoxa</h2>
          <p className="text-[#6F665D] text-lg max-w-xl mx-auto">Your trusted partner for safe and rewarding betting. We do the research so you don't have to.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-[#ECE6DB] rounded-2xl p-6 hover:border-[#F97316]/12 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#F97316]/8 border border-[#F97316]/12 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#F97316]" />
                </div>
                <h3 className="font-semibold text-[#1F1A17] text-lg mb-2">{f.title}</h3>
                <p className="text-[#6F665D] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─── PAYMENT METHODS ─── */}
      <section className="py-20 bg-[#F3F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Deposit &amp; withdraw</div>
            <h2 className="font-serif text-4xl font-bold text-[#1F1A17] mb-4">Accepted Payment Methods</h2>
            <p className="text-[#6F665D] max-w-xl mx-auto">All recommended operators support a wide range of safe payment options with fast processing times.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {paymentMethods.map((pm, i) => (
              <motion.div key={pm.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ borderColor: "rgba(224,174,46,0.35)", y: -3 }}
                className="bg-white border border-[#ECE6DB] rounded-xl p-4 text-center transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-[#F97316]/8 flex items-center justify-center mx-auto mb-3">
                  <CreditCard size={18} className="text-[#F97316]" />
                </div>
                <div className="text-[#1F1A17] text-sm font-medium mb-1">{pm.name}</div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-[#8D847A]">
                  <Clock size={9} /> {pm.speed}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW WE RATE ─── */}
      <section className="py-20 bg-gradient-to-b from-[#0B0A09] via-[#1B3950]/10 to-[#0B0A09]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Transparency first</div>
            <h2 className="font-serif text-4xl font-bold text-[#1F1A17] mb-4">How We Rate Operators</h2>
            <p className="text-[#6F665D] max-w-xl mx-auto">Our expert team evaluates every operator on a strict set of criteria before recommending them to you.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Licensing & Safety", score: "30%" }, { label: "Bonus Value", score: "25%" },
              { label: "Game Selection", score: "20%" }, { label: "Payout Speed", score: "15%" },
              { label: "Customer Support", score: "5%" }, { label: "Mobile Experience", score: "5%" },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white border border-[#ECE6DB] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#F97316] mb-1">{item.score}</div>
                <div className="text-[#6F665D] text-xs">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOP BETTING SITES PREVIEW ─── */}
      <section className="py-20 bg-[#F3F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Sports betting</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-4">Top Betting Sites</h2>
            <p className="text-[#6F665D] text-lg max-w-xl mx-auto">Expert-reviewed sportsbooks with the best odds, widest markets, and fastest payouts.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { initials: "BET", name: "Bet365", reviews: "18,234", rating: 5, tags: ["Live Streaming", "Cash Out", "Best Odds"], bonus: "$500 Welcome" },
              { initials: "DK", name: "DraftKings", reviews: "15,678", rating: 4.8, tags: ["Parlays", "Daily Fantasy", "Live Betting"], bonus: "$1,000 Match" },
              { initials: "FD", name: "FanDuel", reviews: "16,234", rating: 4.8, tags: ["No-Sweat Bet", "Live Betting", "Fast Payouts"], bonus: "$1,000 Bonus" },
              { initials: "BF", name: "Betfair", reviews: "12,456", rating: 4.7, tags: ["Exchange", "Best Odds", "Cash Out"], bonus: "Free Month" },
              { initials: "WH", name: "William Hill", reviews: "14,567", rating: 4.7, tags: ["Racing", "80 Years Exp", "Retail"], bonus: "£30 Free Bets" },
              { initials: "UB", name: "Unibet", reviews: "11,234", rating: 4.6, tags: ["Esports", "Live Stream", "European Sports"], bonus: "€40 Free Bets" },
            ].map((site, i) => (
              <motion.div key={site.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, borderColor: "rgba(224,174,46,0.35)" }}
                className="bg-white border border-[#ECE6DB] rounded-2xl p-6 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316]/20 to-[#1B3950]/40 border border-[#E7E1D6] flex items-center justify-center font-bold text-[#F97316] text-sm font-mono">{site.initials}</div>
                  <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={11} className={j < Math.round(site.rating) ? "fill-[#F97316] text-[#F97316]" : "fill-white/20 text-[#C9C3B8]"} />)}</div>
                </div>
                <h3 className="font-semibold text-[#1F1A17] text-lg mb-1">{site.name}</h3>
                <div className="text-[#8D847A] text-xs mb-2">({site.reviews} reviews)</div>
                <div className="text-[#F97316] font-medium text-sm mb-3">{site.bonus}</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {site.tags.map((tag) => <span key={tag} className="bg-white text-[#6F665D] text-xs px-2 py-0.5 rounded-full border border-[#ECE6DB]">{tag}</span>)}
                </div>
                <Link href="/betting-sites">
                  <button className="w-full py-2.5 border border-[#F97316]/12 text-[#F97316] rounded-lg text-sm font-medium hover:bg-[#F97316]/8 transition-colors flex items-center justify-center gap-1.5" data-testid={`button-visit-preview-${site.name.toLowerCase()}`}>
                    Visit Site <ExternalLink size={12} />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/betting-sites">
              <motion.button whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-6 py-3 border border-[#F97316]/12 text-[#F97316] rounded-lg hover:bg-[#F97316]/8 transition-colors font-medium" data-testid="link-all-betting-sites">
                View All Betting Sites <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">What bettors say</div>
            <h2 className="font-serif text-4xl font-bold text-[#1F1A17] mb-4">Real Player Reviews</h2>
            <p className="text-[#6F665D] max-w-xl mx-auto">Thousands of bettors trust BetVoxa to find the best offers. Here's what they say.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(224,174,46,0.25)" }}
                className="bg-white border border-[#ECE6DB] rounded-2xl p-6 transition-all duration-300">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} className="fill-[#F97316] text-[#F97316]" />)}
                </div>
                <p className="text-[#4A433C] text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F97316]/15 flex items-center justify-center text-[#F97316] font-bold text-xs">{t.name[0]}</div>
                  <div>
                    <div className="text-[#1F1A17] text-sm font-medium">{t.name}</div>
                    <div className="text-[#8D847A] text-xs">Verified player {t.country}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MOBILE APP CTA ─── */}
      <section className="py-20 bg-[#F3F1EA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1B3950]/40 via-[#F97316]/5 to-[#1B3950]/40 border border-[#F97316]/12 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Mobile experience</div>
              <h2 className="font-serif text-4xl font-bold text-[#1F1A17] mb-4">Bet On the Go</h2>
              <p className="text-[#5F554C] mb-6 leading-relaxed">All recommended operators have award-winning mobile apps for iOS and Android. Full feature parity, live streaming, and push notifications for your bets.</p>
              <div className="flex flex-wrap gap-3">
                {["iOS App", "Android App", "Mobile Browser", "Live Betting", "Push Notifications"].map((feat) => (
                  <span key={feat} className="flex items-center gap-1.5 bg-white border border-[#E7E1D6] text-[#5F554C] text-sm px-3 py-1.5 rounded-lg">
                    <CheckCircle size={12} className="text-[#F97316]" /> {feat}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#F97316]/8 border border-[#F97316]/12 flex items-center justify-center"><Smartphone size={28} className="text-[#F97316]" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B3950]/30 via-[#F97316]/5 to-[#1B3950]/30" />
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Stay ahead</div>
            <h2 className="font-serif text-4xl font-bold text-[#1F1A17] mb-4">Get Exclusive Bonus Alerts</h2>
            <p className="text-[#6F665D] mb-8">Be first to know about limited-time offers, new operator launches, and bonus code drops.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white border border-[#DAD3C6] rounded-lg text-[#1F1A17] placeholder-white/30 focus:outline-none focus:border-[#F97316]/50 text-sm"
                data-testid="input-newsletter-email" />
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-[#F97316] text-[#0B0A09] rounded-lg font-bold text-sm hover:bg-[#DC6803] transition-colors shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                data-testid="button-newsletter-subscribe">
                Subscribe
              </motion.button>
            </div>
            <p className="text-[#B4ADA3] text-xs mt-3">No spam. Unsubscribe anytime. 18+ only.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-[#F3F1EA]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest mb-3">Got questions?</div>
            <h2 className="font-serif text-4xl font-bold text-[#1F1A17] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#6F665D]">Everything you need to know about bonuses, wagering, and betting safely.</p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-[#F97316]/12" : "border-[#ECE6DB]"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left" data-testid={`button-faq-${i}`}>
                  <span className="font-medium text-[#1F1A17]">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-[#F97316] flex-shrink-0" /> : <ChevronDown size={16} className="text-[#8D847A] flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-6 pb-5 text-[#5F554C] text-sm leading-relaxed border-t border-[#EFE9DE] pt-3">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESPONSIBLE GAMBLING ─── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#ECE6DB] rounded-2xl p-8 flex flex-col md:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#1B3950]/50 flex items-center justify-center flex-shrink-0">
              <Shield size={24} className="text-[#F97316]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1F1A17] mb-3">Responsible Gambling</h3>
              <p className="text-[#5F554C] text-sm leading-relaxed mb-4">
                Gambling should always be a form of entertainment, never a way to make money. Set limits before you play, take regular breaks, and never chase losses. If gambling stops being fun, it's time to stop.
              </p>
              <div className="flex flex-wrap gap-3">
                {["GamCare", "BeGambleAware", "GamStop", "Gamblers Anonymous"].map((org) => (
                  <span key={org} className="bg-white border border-[#E7E1D6] text-[#5F554C] text-xs px-3 py-1.5 rounded-lg">{org}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-28 relative overflow-hidden bg-[#F8F7F2]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#1F1A17] mb-4">
            Ready to <span className="text-[#F97316] text-glow">Win Big?</span>
          </h2>
          <p className="text-[#6F665D] text-lg mb-8 max-w-xl mx-auto">Join millions of bettors who trust BetVoxa to find the best offers. Your next big win is waiting.</p>
          <Link href="/casino-bonuses">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(224,174,46,0.5)" }} whileTap={{ scale: 0.97 }}
              className="px-10 py-5 bg-[#F97316] text-[#0B0A09] rounded-xl font-bold text-xl hover:bg-[#DC6803] transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]"
              data-testid="button-final-cta">
              Explore All Bonuses
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
