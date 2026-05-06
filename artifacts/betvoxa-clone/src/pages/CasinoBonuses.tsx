import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Star, Check, Trophy, TrendingUp, Gift, Zap, ChevronDown, ChevronUp, Shield, Clock, CreditCard } from "lucide-react";
import BonusCard from "@/components/BonusCard";

const allBonuses = [
  { initials: "JB", name: "Jackbit", reviews: 5120, rating: 5, bonusTitle: "Wager Free Bonus", bonusDetail: "500 free spins + crypto welcome pack", wagering: "0x", minDeposit: "$30", features: ["Crypto specialist", "Instant payouts", "Wager-free"], featured: true, country: "global", type: "no-wagering", badge: "Editor's Pick" },
  { initials: "BET", name: "Bet365 Casino", reviews: 12847, rating: 4.8, bonusTitle: "£100 Welcome Bonus", bonusDetail: "50 free spins on Starburst", wagering: "35x", minDeposit: "£10", features: ["Live casino", "Slots", "Table games"], featured: true, country: "uk", type: "welcome" },
  { initials: "LV", name: "LeoVegas", reviews: 11456, rating: 4.8, bonusTitle: "€1,000 + 200 Free Spins", bonusDetail: "4-part welcome package", wagering: "35x", minDeposit: "€10", features: ["Mobile casino", "Live dealers", "Fast withdrawals"], country: "uk", type: "welcome" },
  { initials: "PS", name: "PokerStars Casino", reviews: 15632, rating: 4.7, bonusTitle: "€600 + 100 Free Spins", bonusDetail: "3-step welcome bonus", wagering: "35x", minDeposit: "€10", features: ["Exclusive games", "Progressive jackpots", "VIP program"], country: "uk", type: "welcome" },
  { initials: "OJO", name: "PlayOJO", reviews: 8934, rating: 4.7, bonusTitle: "50 Free Spins", bonusDetail: "Wager-free, no strings attached", wagering: "No wagering", minDeposit: "£10", features: ["No wagering", "Fair play", "Cashback"], country: "uk", type: "no-wagering" },
  { initials: "CSM", name: "Casumo", reviews: 9821, rating: 4.6, bonusTitle: "€300 + 100 Free Spins", bonusDetail: "Adventure-themed welcome package", wagering: "30x", minDeposit: "€10", features: ["Adventure rewards", "Fast payouts", "Mobile app"], country: "global", type: "welcome" },
  { initials: "MG", name: "Mr Green", reviews: 10234, rating: 4.6, bonusTitle: "€100 + 200 Free Spins", bonusDetail: "Responsible gambling focus", wagering: "35x", minDeposit: "€20", features: ["Green gaming", "Live casino", "Sports betting"], country: "uk", type: "free-spins" },
  { initials: "888", name: "888 Casino", reviews: 13456, rating: 4.5, bonusTitle: "£100 Bonus", bonusDetail: "Daily jackpots & exclusive games", wagering: "40x", minDeposit: "£10", features: ["Exclusive games", "Daily jackpots", "VIP rewards"], country: "uk", type: "welcome" },
  { initials: "BW", name: "Betway Casino", reviews: 11234, rating: 4.5, bonusTitle: "£1,000 Welcome Offer", bonusDetail: "Microgaming powered casino", wagering: "50x", minDeposit: "£10", features: ["Microgaming games", "Live casino", "Mobile optimized"], country: "uk", type: "welcome" },
  { initials: "VL", name: "VipLuck", reviews: 4210, rating: 4.5, bonusTitle: "Welcome Bonus Package", bonusDetail: "Exclusive for new players", wagering: "35x", minDeposit: "A$30", features: ["Fast payouts", "Live casino", "Great support"], country: "au", type: "welcome" },
  { initials: "GL", name: "Glorion", reviews: 3820, rating: 4.3, bonusTitle: "100% Deposit Match", bonusDetail: "Up to $500 matched", wagering: "40x", minDeposit: "A$30", features: ["Huge game library", "Crypto accepted", "VIP program"], country: "au", type: "welcome" },
  { initials: "50C", name: "50crowns", reviews: 4210, rating: 4.2, bonusTitle: "Welcome Package", bonusDetail: "5 deposit bonus", wagering: "40x", minDeposit: "$25", features: ["Slots", "Live games", "Mobile app"], country: "us", type: "welcome" },
  { initials: "NN", name: "Nitro Casino", reviews: 3100, rating: 4.4, bonusTitle: "100 Free Spins No Deposit", bonusDetail: "No deposit required", wagering: "40x", minDeposit: "€20", features: ["No deposit spins", "Slots specialist", "Live casino"], country: "global", type: "no-deposit" },
  { initials: "BC", name: "BC.Game", reviews: 6800, rating: 4.6, bonusTitle: "360% Welcome Bonus", bonusDetail: "Crypto-first casino", wagering: "50x", minDeposit: "$10", features: ["Crypto only", "Huge multipliers", "Provably fair"], country: "global", type: "welcome" },
  { initials: "RK", name: "Roobet", reviews: 5500, rating: 4.3, bonusTitle: "5% Cashback for 7 Days", bonusDetail: "Weekly cashback, no wagering", wagering: "0x", minDeposit: "$10", features: ["Cashback", "Crypto casino", "Original games"], country: "global", type: "no-wagering" },
];

const topPicks = [
  { label: "Best No Wagering", name: "PlayOJO", detail: "50 wager-free spins" },
  { label: "Biggest Bonus", name: "Betway", detail: "Up to £1,000" },
  { label: "Best for Crypto", name: "Jackbit", detail: "Wager free + instant" },
  { label: "Best Mobile", name: "LeoVegas", detail: "€1,000 + 200 spins" },
];

const countries = ["All Countries", "United Kingdom", "United States", "Australia", "Global"];
const bonusTypes = ["All Types", "Welcome Bonus", "Free Spins", "No Wagering", "No Deposit"];

const gameTypes = [
  { name: "Online Slots", count: "10,000+", icon: "🎰", desc: "From classic 3-reel slots to megaways with thousands of paylines. Big jackpots on titles like Mega Moolah and Book of Dead." },
  { name: "Live Casino", count: "500+", icon: "🎲", desc: "Real dealers streaming in HD. Roulette, blackjack, baccarat, and game shows like Crazy Time and Dream Catcher." },
  { name: "Table Games", count: "200+", icon: "🃏", desc: "Classic casino table games including blackjack variants, roulette variations, poker, and craps." },
  { name: "Progressive Jackpots", count: "100+", icon: "💎", desc: "Life-changing jackpots that grow with every spin. Mega Moolah holds the record for largest online casino payout." },
  { name: "Video Poker", count: "50+", icon: "♠️", desc: "Combine the strategy of poker with slot machine convenience. Jacks or Better and Deuces Wild are classics." },
  { name: "Sports Betting", count: "50+ sports", icon: "⚽", desc: "Many casino operators also offer full sportsbooks. Bet365, Betway, and Mr Green all offer combined casino and sports." },
];

const faqs = [
  { q: "What is the difference between a casino bonus and free spins?", a: "A casino bonus is typically matched deposit funds added to your balance. Free spins are complimentary rounds on slot games. Both can come with wagering requirements. Some offers combine both — e.g. '100% up to £200 + 100 free spins'." },
  { q: "Can I withdraw a casino bonus immediately?", a: "No. You must meet the wagering requirements first. For example, if you receive a £100 bonus with 35x wagering, you must bet £3,500 in total before any winnings from bonus funds can be withdrawn." },
  { q: "What games count towards wagering requirements?", a: "Slots typically contribute 100%, while table games like roulette and blackjack often contribute 10% or less. Always check the bonus terms — some bonuses exclude table games entirely." },
  { q: "What is a maximum withdrawal from a bonus?", a: "Many bonuses cap how much you can withdraw from bonus winnings — often £100–£500. This is why the maximum withdrawal limit is a key factor in evaluating bonus value." },
  { q: "Are no-deposit bonuses worth claiming?", a: "Yes, if you understand the terms. They let you try a casino with zero risk. Wagering requirements are usually high (40–60x), and max withdrawal is often capped at £50–100. Still worth claiming as there's nothing to lose." },
  { q: "What makes a casino bonus fair?", a: "Fair indicators: low wagering (under 30x), high max withdrawal, reasonable time limit (30+ days), clear terms, no game restrictions. BetVoxa flags all these metrics on every bonus card." },
];

const vipTiers = [
  { tier: "Bronze", desc: "Entry level — cashback, priority support", color: "#CD7F32" },
  { tier: "Silver", desc: "Enhanced cashback, faster withdrawals, bonus boosts", color: "#C0C0C0" },
  { tier: "Gold", desc: "Personal account manager, higher limits, exclusive events", color: "#D97706" },
  { tier: "Platinum", desc: "Luxury gifts, private jets, VIP event invitations, bespoke bonuses", color: "#E5E4E2" },
];

export default function CasinoBonuses() {
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = allBonuses.filter((b) => {
    const countryMatch = countryFilter === "All Countries" ||
      (countryFilter === "United Kingdom" && b.country === "uk") ||
      (countryFilter === "United States" && b.country === "us") ||
      (countryFilter === "Australia" && b.country === "au") ||
      (countryFilter === "Global" && b.country === "global");
    const typeMatch = typeFilter === "All Types" ||
      (typeFilter === "Welcome Bonus" && b.type === "welcome") ||
      (typeFilter === "Free Spins" && b.type === "free-spins") ||
      (typeFilter === "No Wagering" && b.type === "no-wagering") ||
      (typeFilter === "No Deposit" && b.type === "no-deposit");
    return countryMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-[#0B0A09]">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(217,119,6,0.07),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[#D97706] text-sm font-semibold uppercase tracking-widest mb-3">Expert-verified</div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Casino Bonuses</h1>
            <p className="text-white/55 text-lg max-w-xl">Compare and claim the best casino bonuses from top operators worldwide. Updated daily by our expert team.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── QUICK STATS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Casinos Reviewed", value: "150+" },
            { label: "Active Bonuses", value: "500+" },
            { label: "Total Bonus Value", value: "$2M+" },
            { label: "Average Wagering", value: "35x" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[#111009] border border-white/8 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#D97706] mb-1">{stat.value}</div>
              <div className="text-white/50 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── BEST PICKS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="font-serif text-2xl font-bold text-white mb-5 flex items-center gap-2">
          <Trophy size={20} className="text-[#D97706]" /> Best Picks This Month
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topPicks.map((pick, i) => (
            <motion.div key={pick.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[#D97706]/5 border border-[#D97706]/20 rounded-xl p-4">
              <div className="text-[#D97706] text-xs font-bold uppercase tracking-wider mb-1">{pick.label}</div>
              <div className="text-white font-semibold mb-0.5">{pick.name}</div>
              <div className="text-white/50 text-xs">{pick.detail}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="font-serif text-2xl font-bold text-white mb-5 flex items-center gap-2">
          <TrendingUp size={20} className="text-[#D97706]" /> Quick Comparison
        </h2>
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111009] border-b border-white/8">
                <th className="text-left px-5 py-3 text-white/60 font-medium">Casino</th>
                <th className="text-left px-5 py-3 text-white/60 font-medium">Bonus</th>
                <th className="text-left px-5 py-3 text-white/60 font-medium">Wagering</th>
                <th className="text-left px-5 py-3 text-white/60 font-medium">Min Deposit</th>
                <th className="text-left px-5 py-3 text-white/60 font-medium">Rating</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {allBonuses.slice(0, 8).map((b, i) => (
                <tr key={b.name} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-[#0e0c0a]" : "bg-[#111009]"} hover:bg-[#D97706]/5 transition-colors`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-[#D97706]/15 flex items-center justify-center text-[#D97706] text-xs font-bold">{b.initials.slice(0, 3)}</div>
                      <span className="text-white font-medium">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[#D97706] font-medium">{b.bonusTitle}</td>
                  <td className="px-5 py-3.5 text-white/60">{b.wagering}</td>
                  <td className="px-5 py-3.5 text-white/60">{b.minDeposit}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={11} className={j < Math.round(b.rating) ? "fill-[#D97706] text-[#D97706]" : "fill-white/20 text-white/20"} />)}</div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="px-3 py-1.5 bg-[#D97706] text-[#0B0A09] rounded-md text-xs font-bold hover:bg-[#DC6803] transition-colors" data-testid={`button-table-claim-${b.name.toLowerCase().replace(/\s+/g, "-")}`}>Claim</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── FILTER + LIST ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-[#111009] border border-white/8 rounded-xl">
          <div className="flex items-center gap-2 text-white/60 text-sm"><Filter size={14} /><span>Filter:</span></div>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <button key={c} onClick={() => setCountryFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${countryFilter === c ? "bg-[#D97706] text-[#0B0A09]" : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"}`}
                data-testid={`filter-country-${c.toLowerCase().replace(/\s+/g, "-")}`}>{c}</button>
            ))}
          </div>
          <div className="h-5 w-px bg-white/10 hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {bonusTypes.map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${typeFilter === t ? "bg-[#1B3950] text-white border border-[#1B3950]" : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"}`}
                data-testid={`filter-type-${t.toLowerCase().replace(/\s+/g, "-")}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="text-white/40 text-sm mb-5">Showing <span className="text-white">{filtered.length}</span> bonuses</div>
        <div className="flex flex-col gap-4">
          {filtered.map((bonus, i) => <BonusCard key={bonus.name} rank={i + 1} {...bonus} />)}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/30">
              <Trophy size={40} className="mx-auto mb-3 opacity-30" />
              <p>No bonuses match your filters. Try broadening your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── HOW TO CLAIM ─── */}
      <section className="bg-[#080706] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-white mb-3">How to Claim a Casino Bonus</h2>
            <p className="text-white/50">A step-by-step guide to getting the most from your welcome offer.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Choose an Offer", desc: "Compare bonuses above and pick one that matches your play style and budget." },
              { step: "2", title: "Click Claim Bonus", desc: "You'll be taken to the operator's site with your bonus pre-activated." },
              { step: "3", title: "Register & Verify", desc: "Create your account and complete identity verification to unlock your bonus." },
              { step: "4", title: "Make a Deposit", desc: "Meet the minimum deposit requirement and your bonus will be credited instantly." },
            ].map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#D97706] text-[#0B0A09] font-bold text-xl flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                <p className="text-white/50 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GAME TYPES ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-[#D97706] text-sm font-semibold uppercase tracking-widest mb-3">What to play</div>
          <h2 className="font-serif text-4xl font-bold text-white mb-4">Casino Game Types</h2>
          <p className="text-white/50 max-w-xl mx-auto">From classic slots to immersive live dealer tables — find games that match your style and budget.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gameTypes.map((g, i) => (
            <motion.div key={g.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: "rgba(217,119,6,0.25)" }}
              className="bg-[#111009] border border-white/8 rounded-2xl p-6 transition-all duration-300">
              <div className="text-4xl mb-3">{g.icon}</div>
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="font-semibold text-white">{g.name}</h3>
                <span className="text-[#D97706] text-xs font-bold">{g.count}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── WAGERING EXPLAINER ─── */}
      <section className="py-20 bg-[#080706]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-3xl font-bold text-white mb-4">Understanding Wagering Requirements</h2>
              <p className="text-white/55 mb-4 leading-relaxed">Wagering requirements tell you how many times you must bet the bonus amount before you can withdraw winnings. A 35x wagering requirement on a £100 bonus means you need to place £3,500 in bets first.</p>
              <p className="text-white/55 mb-6 leading-relaxed">Lower wagering = better bonus. PlayOJO offers 0x wagering — the gold standard. Most reputable casinos sit between 25x and 40x.</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Excellent", value: "0–20x", color: "bg-green-500" },
                  { label: "Good", value: "21–35x", color: "bg-[#D97706]" },
                  { label: "Average", value: "36–50x", color: "bg-orange-500" },
                  { label: "Poor", value: "50x+", color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-white/70 text-sm">{item.label}:</span>
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-[#111009] border border-white/8 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Check size={16} className="text-[#D97706]" /> Key Terms Glossary</h3>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  { term: "RTP", def: "Return to Player — the theoretical payout % of a game" },
                  { term: "Wagering", def: "Number of times you must bet the bonus before withdrawal" },
                  { term: "Max bet", def: "Maximum stake allowed while using bonus funds" },
                  { term: "Free Spins", def: "Bonus spins on slot games, often with wagering" },
                  { term: "No Deposit", def: "Bonus given without requiring an initial deposit" },
                  { term: "Sticky Bonus", def: "Bonus that can't be withdrawn, only winnings can" },
                  { term: "GGR", def: "Gross Gaming Revenue — what the casino earns after payouts" },
                  { term: "Max Win", def: "Maximum amount you can win from a bonus or single spin" },
                ].map((item) => (
                  <div key={item.term} className="flex gap-3">
                    <span className="text-[#D97706] font-semibold w-24 flex-shrink-0">{item.term}</span>
                    <span className="text-white/55">{item.def}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VIP PROGRAMS ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="text-[#D97706] text-sm font-semibold uppercase tracking-widest mb-3">For serious players</div>
          <h2 className="font-serif text-4xl font-bold text-white mb-4">VIP &amp; Loyalty Programs</h2>
          <p className="text-white/50 max-w-xl mx-auto">High-rollers and loyal players unlock exclusive perks that go far beyond standard welcome bonuses.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vipTiers.map((tier, i) => (
            <motion.div key={tier.tier} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#111009] border border-white/8 rounded-2xl p-6 text-center transition-all duration-300">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${tier.color}20`, border: `1px solid ${tier.color}40` }}>
                <Trophy size={22} style={{ color: tier.color }} />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2" style={{ color: tier.color }}>{tier.tier}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{tier.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 bg-[#D97706]/5 border border-[#D97706]/20 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#D97706]/15 flex items-center justify-center flex-shrink-0"><Gift size={28} className="text-[#D97706]" /></div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">How to Unlock VIP Status</h3>
              <p className="text-white/55 leading-relaxed">VIP status is typically earned through loyalty points accumulated with real-money wagers. Some casinos invite high-rollers directly. Points are earned per £1–10 wagered and can be redeemed for bonus cash, free spins, or physical gifts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── JACKPOT SLOTS ─── */}
      <section className="py-20 bg-[#080706]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="text-[#D97706] text-sm font-semibold uppercase tracking-widest mb-3">Life-changing wins</div>
            <h2 className="font-serif text-4xl font-bold text-white mb-4">Top Progressive Jackpot Slots</h2>
            <p className="text-white/50 max-w-xl mx-auto">These networked jackpot slots have paid out millions to lucky players. Available at multiple recommended casinos.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Mega Moolah", provider: "Microgaming", record: "€19.4M", theme: "African Safari", rtp: "88.12%" },
              { name: "Divine Fortune", provider: "NetEnt", record: "€1.1M", theme: "Greek Mythology", rtp: "96.59%" },
              { name: "Wheel of Wishes", provider: "Microgaming", record: "€7.7M", theme: "Arabian Nights", rtp: "93.35%" },
              { name: "Age of the Gods", provider: "Playtech", record: "£1.3M", theme: "Greek Gods", rtp: "95.02%" },
              { name: "Arabian Nights", provider: "NetEnt", record: "€1.7M", theme: "1001 Nights", rtp: "95.63%" },
              { name: "Beach Life", provider: "Playtech", record: "£3.4M", theme: "Summer Beach", rtp: "93.03%" },
            ].map((slot, i) => (
              <motion.div key={slot.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ borderColor: "rgba(217,119,6,0.3)", y: -3 }}
                className="bg-[#111009] border border-white/8 rounded-xl p-5 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{slot.name}</h3>
                    <div className="text-white/40 text-xs">{slot.provider}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#D97706] font-bold text-sm">Record</div>
                    <div className="text-white font-semibold">{slot.record}</div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-white/50 pt-3 border-t border-white/5">
                  <span>Theme: {slot.theme}</span>
                  <span>RTP: {slot.rtp}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-white mb-3">Casino Bonus FAQ</h2>
          <p className="text-white/50">Everything you need to know before claiming your first bonus.</p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`bg-[#111009] border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-[#D97706]/30" : "border-white/8"}`}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left" data-testid={`button-faq-casino-${i}`}>
                <span className="font-medium text-white text-sm">{faq.q}</span>
                {openFaq === i ? <ChevronUp size={15} className="text-[#D97706] flex-shrink-0" /> : <ChevronDown size={15} className="text-white/40 flex-shrink-0" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
                    <div className="px-6 pb-5 text-white/55 text-sm leading-relaxed border-t border-white/5 pt-3">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SAFETY ─── */}
      <section className="bg-[#080706] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white text-center mb-10">Playing Safely at Online Casinos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Check the Licence", desc: "Always verify the casino's licence before depositing. Look for UKGC, MGA, or Gibraltar seals — usually in the footer." },
              { icon: Clock, title: "Set a Budget", desc: "Decide how much you can afford to lose before you start. Use the casino's deposit limit tools to enforce this automatically." },
              { icon: CreditCard, title: "Use Safe Payments", desc: "Stick to reputable payment methods. E-wallets like PayPal add an extra layer of protection as you don't share card details." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#111009] border border-white/8 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#D97706]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-[#D97706]" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
