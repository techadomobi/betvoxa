import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, ExternalLink, BookOpen, Zap, Globe, TrendingUp, Shield, Clock, ChevronDown, ChevronUp, BarChart2, Target } from "lucide-react";

const sportsbooks = [
  {
    initials: "BET", name: "Bet365", reviews: 18234, rating: 4.9, featured: true,
    desc: "Industry-leading sportsbook with extensive live betting options, competitive odds, and comprehensive coverage of sports worldwide. The benchmark all others are measured against.",
    bonus: "Up to $500 in Bet Credits",
    features: ["Live streaming on 140,000+ events", "Cash out on pre-match and in-play bets", "Best odds guaranteed on horse racing", "Mobile app for iOS and Android"],
    sports: ["Football", "Horse Racing", "Tennis", "Cricket", "Basketball", "Golf"],
    pros: ["Widest market coverage", "Unbeatable live streaming", "Best odds guarantee"],
    cons: ["Account restrictions for winners", "Complex bonus terms"],
  },
  {
    initials: "DK", name: "DraftKings", reviews: 15678, rating: 4.8, featured: true,
    desc: "Leading US sportsbook combining daily fantasy sports with traditional sports betting. Excellent same game parlays and competitive promotions make it a top choice in legal US states.",
    bonus: "Up to $1,000 Deposit Match",
    features: ["Same game parlay builder", "Daily fantasy sports integration", "Live betting with real-time odds", "Exclusive odds boosts"],
    sports: ["NFL", "NBA", "MLB", "NHL", "Soccer", "MMA"],
    pros: ["Best parlay builder", "Daily fantasy integration", "Generous promotions"],
    cons: ["US only", "Complex interface for beginners"],
  },
  {
    initials: "FD", name: "FanDuel", reviews: 16234, rating: 4.8, featured: false,
    desc: "Top-rated US sportsbook with user-friendly interface, competitive odds, and excellent customer service. Strong focus on responsible gambling tools.",
    bonus: "No-Sweat First Bet up to $1,000",
    features: ["No sweat first bet up to $1,000", "Live betting on all major sports", "Easy parlay builder", "Fast payouts via PayPal"],
    sports: ["NFL", "NBA", "MLB", "NHL", "Soccer", "Golf"],
    pros: ["User-friendly app", "Fast PayPal withdrawals", "No-sweat bet offer"],
    cons: ["US only", "Smaller international market"],
  },
  {
    initials: "BF", name: "Betfair", reviews: 12456, rating: 4.7, featured: false,
    desc: "Revolutionary betting exchange allowing you to bet against other customers. Better odds and unique trading opportunities unavailable at traditional bookmakers.",
    bonus: "Commission-free month for new customers",
    features: ["Betting exchange with best odds", "Traditional sportsbook option", "Cash out on exchange bets", "Commission-free promotions"],
    sports: ["Horse Racing", "Football", "Tennis", "Cricket", "Golf", "Greyhounds"],
    pros: ["Best odds on the market", "Unique lay betting", "Huge liquidity"],
    cons: ["Commission on exchange", "Complex for beginners"],
  },
  {
    initials: "WH", name: "William Hill", reviews: 14567, rating: 4.7, featured: false,
    desc: "Established UK bookmaker with over 80 years of experience. Comprehensive sports coverage and competitive odds on major events. Retail betting shops across the UK.",
    bonus: "£30 in Free Bets",
    features: ["Best odds guaranteed", "Extensive horse racing coverage", "Live streaming available", "Retail betting shops"],
    sports: ["Football", "Horse Racing", "Cricket", "Rugby", "Tennis", "Boxing"],
    pros: ["Trusted 80+ year brand", "Excellent horse racing", "Retail presence"],
    cons: ["Slower to innovate", "Account limits for winners"],
  },
  {
    initials: "UB", name: "Unibet", reviews: 11234, rating: 4.6, featured: false,
    desc: "European sportsbook with excellent live betting platform, competitive odds, and comprehensive sports coverage including niche markets and esports.",
    bonus: "Up to £40 in Free Bets",
    features: ["Live streaming on 35,000+ events", "Extensive European sports coverage", "Esports betting", "Award-winning app"],
    sports: ["Football", "Tennis", "Basketball", "Ice Hockey", "Esports", "Darts"],
    pros: ["Great esports coverage", "Excellent European football odds", "Top mobile app"],
    cons: ["Not available in US", "Lower horse racing coverage"],
  },
  {
    initials: "PP", name: "Paddy Power", reviews: 9870, rating: 4.5, featured: false,
    desc: "Irish bookmaker known for its fun personality, generous offers, and Money Back specials. Strong coverage of Irish and UK racing and football.",
    bonus: "£20 Risk-Free First Bet",
    features: ["Money back specials", "Power Price boosts", "Live streaming", "Acca insurance"],
    sports: ["Football", "Horse Racing", "GAA", "Boxing", "Darts", "Rugby"],
    pros: ["Unique money-back offers", "Great promotions", "Excellent GAA coverage"],
    cons: ["Limited Asian markets", "Withdrawal times variable"],
  },
  {
    initials: "888", name: "888sport", reviews: 8750, rating: 4.5, featured: false,
    desc: "Established sportsbook offering competitive odds, a solid live betting platform, and regular promotions for existing customers alongside a decent welcome bonus.",
    bonus: "Up to £30 in Free Bets",
    features: ["Live betting", "Statistics centre", "Live streaming", "Bet builder"],
    sports: ["Football", "Basketball", "Tennis", "Cricket", "Golf", "American Sports"],
    pros: ["Great in-play interface", "Good existing customer offers", "Solid statistics"],
    cons: ["Lower racing coverage", "Smaller bonus than competitors"],
  },
];

const methodologyPoints = [
  { icon: Shield, title: "Licensing & Regulation", pct: "30%", desc: "We verify gambling licence validity from UKGC, MGA, Gibraltar, and other bodies." },
  { icon: TrendingUp, title: "Odds Competitiveness", pct: "25%", desc: "We compare odds on 50+ markets across dozens of events to benchmark payout percentages." },
  { icon: Zap, title: "Payout Speed", pct: "20%", desc: "We test withdrawal times across all payment methods including e-wallets, cards, and bank transfers." },
  { icon: Globe, title: "Market Coverage", pct: "15%", desc: "We count sports, leagues, and in-play markets available." },
  { icon: BookOpen, title: "Bonus Value", pct: "5%", desc: "We calculate the true value of welcome offers after accounting for wagering requirements." },
  { icon: Clock, title: "Customer Support", pct: "5%", desc: "We test live chat, email, and phone support response times and quality." },
];

const sportsGrid = [
  { sport: "Football", sites: ["Bet365", "William Hill", "Betfair", "Unibet"], markets: "1,200+" },
  { sport: "Horse Racing", sites: ["Bet365", "William Hill", "Betfair", "Paddy Power"], markets: "800+" },
  { sport: "Tennis", sites: ["Bet365", "Unibet", "Betfair", "888sport"], markets: "500+" },
  { sport: "Basketball / NBA", sites: ["DraftKings", "FanDuel", "Unibet", "Bet365"], markets: "600+" },
  { sport: "Cricket", sites: ["Bet365", "William Hill", "Betfair", "Unibet"], markets: "400+" },
  { sport: "Esports", sites: ["Unibet", "Bet365", "DraftKings", "888sport"], markets: "200+" },
  { sport: "Golf", sites: ["Betfair", "Bet365", "William Hill", "Paddy Power"], markets: "300+" },
  { sport: "MMA / UFC", sites: ["DraftKings", "FanDuel", "Bet365", "Unibet"], markets: "150+" },
];

const bettingGuide = [
  { step: "1", title: "Choose a licensed sportsbook", desc: "Only bet with operators licensed by UKGC, MGA, or equivalent regulators. Check the footer of any site for their licence details." },
  { step: "2", title: "Register & verify your account", desc: "Provide your details and complete KYC verification. This is required to deposit, bet, and withdraw. Takes 24–48 hours at most operators." },
  { step: "3", title: "Claim your welcome bonus", desc: "Most sportsbooks offer a welcome bonus for new customers — matched bets, free bets, or a no-sweat first bet. Read the terms before claiming." },
  { step: "4", title: "Make your first deposit", desc: "Choose your preferred payment method. E-wallets are usually fastest for both deposits and withdrawals. Most bonuses exclude e-wallet deposits — check first." },
  { step: "5", title: "Place your bets", desc: "Browse markets, compare odds, and place your bets. Use the cash-out feature to secure profits or limit losses on in-play bets." },
  { step: "6", title: "Withdraw your winnings", desc: "Request withdrawals via the cashier. E-wallets are processed within hours. Bank transfers can take up to 5 business days." },
];

const oddsComparison = [
  { event: "Man City vs Arsenal (Man City)", bet365: "2.10", draftkings: "2.05", fanDuel: "2.08", betfair: "2.15" },
  { event: "Wimbledon Men's Final (Djokovic)", bet365: "1.85", draftkings: "1.83", fanDuel: "1.80", betfair: "1.92" },
  { event: "Super Bowl MVP (QB)", bet365: "3.50", draftkings: "3.40", fanDuel: "3.60", betfair: "3.70" },
  { event: "The Masters (top golfer)", bet365: "6.00", draftkings: "5.80", fanDuel: "6.20", betfair: "6.50" },
];

const faqs = [
  { q: "What is the best betting site for football?", a: "Bet365 is widely considered the best for football, offering over 1,200 markets per game including Asian handicaps, corners, cards, and player props. Betfair Exchange offers the best odds for football if you're comfortable using an exchange." },
  { q: "Can I bet on sports in the USA?", a: "Yes, in many states. Following PASPA repeal in 2018, over 30 US states have legalized online sports betting. DraftKings and FanDuel operate in most legal states. Always check your state's laws before signing up." },
  { q: "What does 'cash out' mean?", a: "Cash out lets you settle your bet before the event ends, for a reduced or enhanced return depending on how the event is going. It's useful for securing profits or cutting losses mid-game." },
  { q: "What is a same game parlay?", a: "A same game parlay (SGP) combines multiple outcomes from the same game into one bet. For example: team to win + a player to score + over 2.5 goals. Higher risk but much bigger returns. DraftKings and FanDuel are the best for SGPs." },
  { q: "How do free bets work?", a: "Free bets are bonus credits you can use to place wagers without risking your own money. If your free bet wins, you keep the winnings but not the stake itself. So a £10 free bet winning at 2.0 returns £10 profit, not £20." },
  { q: "What is a betting exchange?", a: "A betting exchange like Betfair lets you bet against other customers instead of against the bookmaker. You can 'lay' (bet against) an outcome as well as backing it. Exchanges typically offer better odds but charge commission on winnings." },
];

export default function BettingSites() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* hero background removed to improve text contrast */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-3">Expert Reviews</div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#FFD54A] mb-4">Best Betting Sites</h1>
            <p className="text-[#C7D5E6] text-lg max-w-xl">Compare top sportsbooks, read expert reviews, and find the best odds for every bet. All operators independently verified.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── QUICK STATS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Sites Reviewed", value: "50+" },
            { label: "Sports Markets", value: "150+" },
            { label: "Countries Covered", value: "50+" },
            { label: "Expert Review Hours", value: "5,000+" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[#0F1724] border border-[#162233] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#FFD54A] mb-1">{stat.value}</div>
              <div className="text-[#C7D5E6] text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SPORTSBOOK LIST ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-serif text-2xl font-bold text-[#FFD54A] mb-6">Top Recommended Sportsbooks</h2>
        <div className="flex flex-col gap-6">
          {sportsbooks.map((site, i) => (
            <motion.div key={site.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ borderColor: "rgba(37,99,235,0.3)" }}
              className={`bg-[#0F1724] border rounded-2xl p-6 transition-all duration-300 ${site.featured ? "border-[#2563EB]/20" : "border-[#162233]"}`}>
              {site.featured && (
                <div className="inline-flex items-center gap-1.5 bg-[#2563EB]/8 border border-[#2563EB]/12 text-[#2563EB] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4">
                  <Star size={9} className="fill-[#2563EB]" /> Editor's Choice
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-linear-to-br from-[#2563EB]/20 to-[#1B3950]/40 border border-[#162233] flex items-center justify-center font-bold text-[#FFD54A] text-xl font-mono mb-3">{site.initials}</div>
                  <div className="flex mb-1">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} className={j < Math.round(site.rating) ? "fill-[#2563EB] text-[#2563EB]" : "fill-white/20 text-[#C9C3B8]"} />)}</div>
                  <div className="text-[#8D847A] text-xs">({site.reviews.toLocaleString()})</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-[#F4F8FC] text-2xl mb-1">{site.name}</h3>
                  <div className="text-[#2563EB] font-medium text-sm mb-3">{site.bonus}</div>
                  <p className="text-[#C7D5E6] text-sm leading-relaxed mb-4">{site.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
                    {site.features.map((f) => <div key={f} className="flex items-center gap-2 text-sm text-[#C7D5E6]"><Check size={12} className="text-[#2563EB] shrink-0" />{f}</div>)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-green-400 font-bold mb-1">Pros</div>
                      {site.pros.map((p) => <div key={p} className="text-xs text-[#C7D5E6] flex items-center gap-1"><span className="text-green-400">+</span>{p}</div>)}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-red-400 font-bold mb-1">Cons</div>
                      {site.cons.map((c) => <div key={c} className="text-xs text-[#C7D5E6] flex items-center gap-1"><span className="text-red-400">−</span>{c}</div>)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {site.sports.map((s) => <span key={s} className="bg-[#0B1220] border border-[#162233] text-[#C7D5E6] text-xs px-2 py-0.5 rounded-full">{s}</span>)}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0 justify-start md:items-end">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-lg font-bold text-sm hover:bg-[#1D4ED8] transition-colors shadow-[0_0_16px_rgba(37,99,235,0.2)]"
                    data-testid={`button-visit-${site.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    Visit Site <ExternalLink size={13} />
                  </motion.button>
                  <button className="flex items-center gap-2 px-5 py-2.5 border border-[#162233] text-[#C7D5E6] rounded-lg font-medium text-sm hover:border-[#2563EB]/30 hover:text-[#F4F8FC] transition-colors"
                    data-testid={`button-review-${site.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    Read Review <BookOpen size={13} />
                  </button>
                  <div className="text-[#B4ADA3] text-[10px] text-right">T&Cs Apply. 18+</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── HOW WE RATE ─── */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-3">Our methodology</div>
            <h2 className="font-serif text-4xl font-bold text-[#FFD54A] mb-4">How We Rate Betting Sites</h2>
            <p className="text-[#C7D5E6] max-w-xl mx-auto">Our rigorous scoring system ensures every recommendation is backed by real testing and independent analysis.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {methodologyPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-[#0F1724] border border-[#162233] rounded-xl p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/8 flex items-center justify-center shrink-0"><Icon size={18} className="text-[#2563EB]" /></div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-[#F4F8FC]">{p.title}</span>
                      <span className="text-[#2563EB] text-sm font-bold">{p.pct}</span>
                    </div>
                    <p className="text-[#C7D5E6] text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── BETTING GUIDE ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-3">Start here</div>
          <h2 className="font-serif text-4xl font-bold text-[#FFD54A] mb-4">Beginner's Guide to Sports Betting</h2>
          <p className="text-[#C7D5E6] max-w-xl mx-auto">New to online betting? Follow these six steps to get started safely and claim your first bonus.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bettingGuide.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-[#0F1724] border border-[#162233] rounded-2xl p-6 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#2563EB] text-[#0B0A09] font-bold text-sm flex items-center justify-center shadow-lg">{s.step}</div>
              <h3 className="font-semibold text-[#F4F8FC] text-lg mb-2 mt-1">{s.title}</h3>
              <p className="text-[#C7D5E6] text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── ODDS COMPARISON ─── */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-3">Find the best price</div>
            <h2 className="font-serif text-4xl font-bold text-[#FFD54A] mb-4">Odds Comparison Snapshot</h2>
            <p className="text-[#C7D5E6] max-w-xl mx-auto">Small differences in odds add up significantly over time. Always compare before placing your bet.</p>
          </motion.div>
          <div className="overflow-x-auto rounded-xl border border-[#162233]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0B1220] border-b border-[#162233]">
                  <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Event / Selection</th>
                  <th className="text-center px-5 py-3 text-[#C7D5E6] font-medium">Bet365</th>
                  <th className="text-center px-5 py-3 text-[#C7D5E6] font-medium">DraftKings</th>
                  <th className="text-center px-5 py-3 text-[#C7D5E6] font-medium">FanDuel</th>
                  <th className="text-center px-5 py-3 text-[#FFD54A] font-medium">Betfair</th>
                </tr>
              </thead>
              <tbody>
                {oddsComparison.map((row, i) => {
                  const odds = [parseFloat(row.bet365), parseFloat(row.draftkings), parseFloat(row.fanDuel), parseFloat(row.betfair)];
                  const best = Math.max(...odds);
                  return (
                    <tr key={row.event} className={`border-b border-[#162233] ${i % 2 === 0 ? "bg-[#0F1724]" : "bg-[#111B2C]"}`}>
                      <td className="px-5 py-3.5 text-[#F4F8FC] text-sm">{row.event}</td>
                      {[row.bet365, row.draftkings, row.fanDuel, row.betfair].map((odd, j) => (
                        <td key={j} className={`text-center px-5 py-3.5 font-medium ${parseFloat(odd) === best ? "text-[#FFD54A] font-bold" : "text-[#C7D5E6]"}`}>{odd}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[#9AA6B8] text-xs mt-3 text-center">Odds are indicative and may change. Betfair exchange often offers best prices due to peer-to-peer betting.</p>
        </div>
      </section>

      {/* ─── SPORTS COVERAGE GRID ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-[#FFD54A] mb-4">Sports Coverage Guide</h2>
          <p className="text-[#C7D5E6]">Find the best sportsbook for your favourite sport.</p>
        </motion.div>
        <div className="overflow-x-auto rounded-xl border border-[#162233]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0B1220] border-b border-[#162233]">
                <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Sport</th>
                <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Top Sites</th>
                <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Markets</th>
              </tr>
            </thead>
            <tbody>
              {sportsGrid.map((row, i) => (
                <tr key={row.sport} className={`border-b border-[#162233] ${i % 2 === 0 ? "bg-[#0F1724]" : "bg-[#111B2C]"}`}>
                  <td className="px-5 py-3.5 text-[#F4F8FC] font-medium">{row.sport}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2 flex-wrap">
                      {row.sites.map((s) => <span key={s} className="bg-[#071122] border border-[#162233] text-[#C7D5E6] text-xs px-2 py-0.5 rounded-full">{s}</span>)}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[#C7D5E6] text-xs">{row.markets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── LIVE BETTING GUIDE ─── */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-3">Real-time action</div>
              <h2 className="font-serif text-3xl font-bold text-[#FFD54A] mb-4">Guide to Live (In-Play) Betting</h2>
                <p className="text-[#C7D5E6] mb-4 leading-relaxed">Live betting lets you place wagers after an event has started, with odds updating in real-time based on what's happening. It requires quick decision-making and a good understanding of the sport.</p>
                <p className="text-[#C7D5E6] mb-6 leading-relaxed">Bet365 is the market leader for live betting, offering streaming on 140,000+ events per year alongside live odds. The cash-out feature lets you settle bets before the event ends.</p>
              <div className="flex flex-col gap-2">
                {["Watch the game — don't bet blind", "Use cash out to manage risk", "Odds move fast — be decisive", "Pre-match research gives you an edge"].map((tip) => (
                  <div key={tip} className="flex items-center gap-2 text-sm text-[#5F554C]"><Check size={12} className="text-[#2563EB]" />{tip}</div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-[#0F1724] border border-[#162233] rounded-2xl p-6">
              <h3 className="font-semibold text-[#F4F8FC] mb-4">Best Sites for Live Betting</h3>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Bet365", feature: "140,000+ live events with streaming" },
                  { name: "Betfair", feature: "Exchange for live lay/back bets" },
                  { name: "Unibet", feature: "35,000+ live events, excellent stats" },
                  { name: "DraftKings", feature: "Real-time odds on all US sports" },
                  { name: "William Hill", feature: "Strong horse racing live markets" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3 py-2 border-b border-[#162233] last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 flex items-center justify-center text-[#2563EB] text-xs font-bold">{item.name.slice(0, 2)}</div>
                    <div>
                        <div className="text-[#F4F8FC] text-sm font-medium">{item.name}</div>
                        <div className="text-[#9AA6B8] text-xs">{item.feature}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PAYMENT METHODS ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-[#FFD54A] mb-4">Payment Methods Comparison</h2>
          <p className="text-[#C7D5E6] max-w-xl mx-auto">Choose the right payment method for fast deposits and even faster withdrawals.</p>
        </motion.div>
        <div className="overflow-x-auto rounded-xl border border-[#162233]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0B1220] border-b border-[#162233]">
                <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Method</th>
                <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Deposit Speed</th>
                <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Withdrawal Speed</th>
                <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Fee</th>
                <th className="text-left px-5 py-3 text-[#C7D5E6] font-medium">Bonus Eligible</th>
              </tr>
            </thead>
            <tbody>
              {[
                { method: "PayPal", dep: "Instant", with: "Up to 24h", fee: "Free", bonus: "Often excluded" },
                { method: "Visa / Mastercard", dep: "Instant", with: "1–3 days", fee: "Free", bonus: "Yes" },
                { method: "Skrill", dep: "Instant", with: "Up to 24h", fee: "Free", bonus: "Often excluded" },
                { method: "Neteller", dep: "Instant", with: "Up to 24h", fee: "Free", bonus: "Often excluded" },
                { method: "Bitcoin / Crypto", dep: "Instant", with: "Instant", fee: "Network fee", bonus: "Sometimes" },
                { method: "Bank Transfer", dep: "1–3 days", with: "3–5 days", fee: "Free", bonus: "Yes" },
                { method: "Paysafecard", dep: "Instant", with: "Not available", fee: "Free", bonus: "Yes" },
              ].map((row, i) => (
                <tr key={row.method} className={`border-b border-[#162233] ${i % 2 === 0 ? "bg-[#0F1724]" : "bg-[#111B2C]"}`}>
                  <td className="px-5 py-3.5 text-[#F4F8FC] font-medium">{row.method}</td>
                  <td className="px-5 py-3.5 text-green-400 text-xs font-medium">{row.dep}</td>
                  <td className="px-5 py-3.5 text-[#C7D5E6] text-xs">{row.with}</td>
                  <td className="px-5 py-3.5 text-[#C7D5E6] text-xs">{row.fee}</td>
                  <td className={`px-5 py-3.5 text-xs font-medium ${row.bonus === "Yes" ? "text-[#FFD54A]" : "text-[#9AA6B8]"}`}>{row.bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-[#FFD54A] mb-3">Sports Betting FAQ</h2>
            <p className="text-[#6F665D]">Common questions about sports betting, explained clearly.</p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`bg-white border rounded-xl overflow-hidden transition-all ${openFaq === i ? "border-[#2563EB]/12" : "border-[#ECE6DB]"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left" data-testid={`button-faq-betting-${i}`}>
                  <span className="font-medium text-[#1F1A17] text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={15} className="text-[#2563EB] shrink-0" /> : <ChevronDown size={15} className="text-[#8D847A] shrink-0" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield size={32} className="text-[#2563EB] mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold text-[#FFD54A] mb-4">Bet Responsibly</h2>
          <p className="text-[#6F665D] mb-6 leading-relaxed">Gambling should always be entertaining. Set deposit limits, take breaks, and never chase losses. All sites recommended by BetVoxa offer responsible gambling tools including self-exclusion, deposit limits, and reality checks.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["GamStop", "BeGambleAware", "GamCare", "Gamblers Anonymous", "National Council on Problem Gambling"].map((org) => (
              <span key={org} className="bg-white border border-[#E7E1D6] text-[#5F554C] text-sm px-4 py-2 rounded-lg">{org}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

