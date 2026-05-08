import { motion } from "framer-motion";
import { useParams } from "wouter";
import { Shield, Check, ExternalLink, ArrowLeft, Gift, CreditCard, Star } from "lucide-react";
import { Link } from "wouter";
import BonusCard from "@/components/BonusCard";

const countryData: Record<string, {
  name: string;
  flag: string;
  code: string;
  currency: string;
  regulator: string;
  legalAge: string;
  intro: string;
  legalInfo: string;
  topBonuses: any[];
  topSites: { name: string; initials: string; bonus: string; rating: number }[];
  paymentMethods: string[];
  tips: string[];
}> = {
  "united-kingdom": {
    name: "United Kingdom",
    flag: "🇬🇧",
    code: "uk",
    currency: "GBP (£)",
    regulator: "UK Gambling Commission (UKGC)",
    legalAge: "18+",
    intro: "The UK has one of the most mature and regulated gambling markets in the world. Licensed by the UK Gambling Commission, all operators must adhere to strict consumer protection standards, making it one of the safest places to bet online.",
    legalInfo: "Online gambling is fully legal in the UK under the Gambling Act 2003. The UKGC regulates all gambling activities and requires operators to implement responsible gambling tools, display odds clearly, and process withdrawals promptly. Winnings are tax-free for UK players.",
    topBonuses: [
      { initials: "BET", name: "Bet365", reviews: 12847, rating: 4.9, bonusTitle: "Up to £100 in Bet Credits", wagering: "35x", minDeposit: "£10", features: ["Live streaming", "Best odds guaranteed", "Cash out"] },
      { initials: "OJO", name: "PlayOJO", reviews: 8934, rating: 4.7, bonusTitle: "50 Free Spins, No Wagering", wagering: "0x", minDeposit: "£10", features: ["Zero wagering", "Cashback", "Fair play"] },
      { initials: "LV", name: "LeoVegas", reviews: 11456, rating: 4.8, bonusTitle: "£100 + 200 Free Spins", wagering: "35x", minDeposit: "£10", features: ["Mobile casino", "Live dealers", "Fast withdrawals"] },
    ],
    topSites: [
      { name: "Bet365", initials: "BET", bonus: "Up to £100 Bet Credits", rating: 4.9 },
      { name: "William Hill", initials: "WH", bonus: "£30 in Free Bets", rating: 4.7 },
      { name: "Betfair", initials: "BF", bonus: "Exchange commission free month", rating: 4.7 },
      { name: "Unibet", initials: "UB", bonus: "£40 in Free Bets", rating: 4.6 },
    ],
    paymentMethods: ["Visa / Mastercard", "PayPal", "Skrill", "Neteller", "Paysafecard", "Bank Transfer"],
    tips: ["Always use UKGC-licensed sites only", "Set deposit limits before you start", "Enable reality checks via your account", "Winnings are tax-free for UK residents"],
  },
  "united-states": {
    name: "United States",
    flag: "🇺🇸",
    code: "us",
    currency: "USD ($)",
    regulator: "State Gaming Commissions",
    legalAge: "21+",
    intro: "Sports betting has rapidly expanded across the US following the repeal of PASPA in 2018. Legal markets now operate in over 30 states with more being added every year, creating one of the world's fastest-growing betting markets.",
    legalInfo: "Online sports betting legality varies by state. Currently legal in states including New Jersey, Pennsylvania, Colorado, Illinois, Michigan, Virginia, Tennessee, and more. Federal law (PASPA repeal 2018) gave states the right to legalize. Always check your state's current laws before betting.",
    topBonuses: [
      { initials: "DK", name: "DraftKings", reviews: 15678, rating: 4.8, bonusTitle: "$1,000 Deposit Match Bonus", wagering: "25x", minDeposit: "$5", features: ["Daily fantasy integration", "Parlay builder", "Same-game parlays"] },
      { initials: "FD", name: "FanDuel", reviews: 16234, rating: 4.8, bonusTitle: "No-Sweat First Bet up to $1,000", wagering: "1x", minDeposit: "$10", features: ["No-sweat guarantee", "Live betting", "Fast PayPal payouts"] },
      { initials: "BM", name: "BetMGM", reviews: 11200, rating: 4.6, bonusTitle: "$1,500 Risk-Free First Bet", wagering: "1x", minDeposit: "$10", features: ["Huge market coverage", "MGM rewards", "Live streaming"] },
    ],
    topSites: [
      { name: "DraftKings", initials: "DK", bonus: "$1,000 Deposit Match", rating: 4.8 },
      { name: "FanDuel", initials: "FD", bonus: "No-Sweat $1,000 Bet", rating: 4.8 },
      { name: "BetMGM", initials: "BM", bonus: "$1,500 Risk-Free Bet", rating: 4.6 },
      { name: "Caesars", initials: "CA", bonus: "$1,250 First Bet on Caesars", rating: 4.5 },
    ],
    paymentMethods: ["Visa / Mastercard", "PayPal", "ACH/eCheck", "Play+", "Cash at Casino", "Apple Pay"],
    tips: ["Check if sports betting is legal in your state first", "Must be 21+ in most states", "Winnings are taxable income — keep records", "Use geolocation is required in legal states"],
  },
  "australia": {
    name: "Australia",
    flag: "🇦🇺",
    code: "au",
    currency: "AUD (A$)",
    regulator: "Australian Communications and Media Authority (ACMA)",
    legalAge: "18+",
    intro: "Australia has a vibrant sports betting culture centred around horse racing, cricket, AFL, and rugby. Online betting is legal with hundreds of licensed operators competing for Australian punters, offering some of the most generous welcome bonuses available.",
    legalInfo: "Online sports betting is regulated at the federal level by ACMA under the Interactive Gambling Act 2001. Betting must be placed with Australian-licensed operators. Casino-style games and poker are restricted online, but sports betting is fully legal with over 50 licensed operators.",
    topBonuses: [
      { initials: "SB", name: "Sportsbet", reviews: 9200, rating: 4.6, bonusTitle: "A$500 Multi-Bet Bonus", wagering: "3x", minDeposit: "A$10", features: ["Same race multi", "Cash out", "Best odds AFL"] },
      { initials: "LL", name: "Ladbrokes", reviews: 7800, rating: 4.5, bonusTitle: "A$250 Bonus Bet Match", wagering: "3x", minDeposit: "A$20", features: ["Racing specials", "Live betting", "Retail shops"] },
      { initials: "VL", name: "VipLuck", reviews: 4210, rating: 4.5, bonusTitle: "Welcome Bonus Package", wagering: "35x", minDeposit: "A$30", features: ["Fast payouts", "Live casino", "Great support"] },
    ],
    topSites: [
      { name: "Sportsbet", initials: "SB", bonus: "A$500 Multi Bonus", rating: 4.6 },
      { name: "Ladbrokes", initials: "LL", bonus: "A$250 Bonus Bet", rating: 4.5 },
      { name: "Neds", initials: "ND", bonus: "A$300 Bonus Bets", rating: 4.4 },
      { name: "Pointsbet", initials: "PB", bonus: "A$800 Bonus Bets", rating: 4.3 },
    ],
    paymentMethods: ["Visa / Mastercard", "PayID", "BPAY", "POLi", "Skrill", "Bank Transfer"],
    tips: ["Only use ACMA-licensed operators", "Responsible gambling tools required by law", "POLi and PayID are fastest for Australians", "Most bonuses are sports-only (casino restricted)"],
  },
  "canada": {
    name: "Canada",
    flag: "🇨🇦",
    code: "ca",
    currency: "CAD (C$)",
    regulator: "Alcohol and Gaming Commission of Ontario (AGCO)",
    legalAge: "19+ (18+ in Alberta, Manitoba, Quebec)",
    intro: "Canada's betting market transformed in 2021 when single-event sports betting was legalized. Ontario launched its regulated iGaming market in 2022, now one of the largest in North America with 50+ licensed operators.",
    legalInfo: "Online gambling laws vary by province. Ontario has a robust regulated market via iGaming Ontario. Other provinces either have government-run sites or permit offshore sites. Bill C-218 legalized single-event sports betting nationally in 2021. Gambling winnings are not taxed for recreational players.",
    topBonuses: [
      { initials: "SI", name: "Sports Interaction", reviews: 6500, rating: 4.5, bonusTitle: "C$200 Risk-Free Bet", wagering: "1x", minDeposit: "C$10", features: ["Canadian-focused", "CFL & NHL experts", "Same game parlays"] },
      { initials: "BW", name: "Betway", reviews: 8200, rating: 4.5, bonusTitle: "C$1,000 Welcome Bonus", wagering: "30x", minDeposit: "C$10", features: ["Sports + casino", "Live betting", "Fast withdrawals"] },
      { initials: "TS", name: "theScore Bet", reviews: 4800, rating: 4.4, bonusTitle: "C$500 in Bet Credits", wagering: "10x", minDeposit: "C$10", features: ["Sports media integration", "Ontario licensed", "Great UX"] },
    ],
    topSites: [
      { name: "Sports Interaction", initials: "SI", bonus: "C$200 Risk-Free Bet", rating: 4.5 },
      { name: "Betway", initials: "BW", bonus: "C$1,000 Welcome Bonus", rating: 4.5 },
      { name: "theScore Bet", initials: "TS", bonus: "C$500 Bet Credits", rating: 4.4 },
      { name: "PointsBet", initials: "PB", bonus: "C$250 Bonus Bets", rating: 4.3 },
    ],
    paymentMethods: ["Visa / Mastercard", "Interac", "PayPal", "Skrill", "iDebit", "Bank Transfer"],
    tips: ["Ontario players must use AGCO-licensed sites", "Winnings are tax-free for recreational bettors", "Interac is the most popular Canadian payment method", "Age verification 19+ in most provinces"],
  },
  "germany": {
    name: "Germany",
    flag: "🇩🇪",
    code: "de",
    currency: "EUR (€)",
    regulator: "Joint Gaming Authority of the German States (GGL)",
    legalAge: "18+",
    intro: "Germany's gambling market was fully restructured under the Fourth Interstate Treaty on Gambling (GlüStV 2021), creating a national licensing framework for sports betting and online casino games for the first time.",
    legalInfo: "The GlüStV 2021 reformed German gambling laws, allowing online casino and sports betting with national licences issued by the GGL. Key restrictions include a €1 maximum stake on slots, mandatory loss limits, and no live in-play betting on German domestic football. Winnings are not taxed.",
    topBonuses: [
      { initials: "TPC", name: "Tipico", reviews: 8900, rating: 4.6, bonusTitle: "€100 Welcome Bonus", wagering: "10x", minDeposit: "€10", features: ["German market leader", "Live betting", "Football specialist"] },
      { initials: "BET", name: "Bet365", reviews: 12847, rating: 4.8, bonusTitle: "€100 Bet Credits", wagering: "35x", minDeposit: "€10", features: ["Huge market coverage", "Live streaming", "Cash out"] },
      { initials: "UB", name: "Unibet", reviews: 11234, rating: 4.6, bonusTitle: "€40 in Free Bets", wagering: "35x", minDeposit: "€10", features: ["European football", "Live streaming", "Casino"] },
    ],
    topSites: [
      { name: "Tipico", initials: "TPC", bonus: "€100 Welcome Bonus", rating: 4.6 },
      { name: "Bet365", initials: "BET", bonus: "€100 Bet Credits", rating: 4.8 },
      { name: "Unibet", initials: "UB", bonus: "€40 Free Bets", rating: 4.6 },
      { name: "bwin", initials: "BW", bonus: "€100 Cashback", rating: 4.4 },
    ],
    paymentMethods: ["Giropay", "SOFORT", "PayPal", "Visa / Mastercard", "Skrill", "Bank Transfer"],
    tips: ["Only use GGL-licensed operators in Germany", "€1 max bet per round applies to online slots", "No in-play betting on German domestic football", "Winnings are tax-free for German residents"],
  },
};

export default function Country() {
  const { code } = useParams<{ code: string }>();
  const data = countryData[code || "united-kingdom"] || countryData["united-kingdom"];
  const isAustralia = code === "australia";

  const marketSnapshot = [
    {
      label: "Market maturity",
      value: data.code === "uk" ? "Highly mature" : data.code === "us" ? "Fast growth" : "Established",
      note: "Reflects regulation depth and operator competition in this region.",
    },
    {
      label: "Player protection",
      value: data.code === "uk" || data.code === "de" ? "Strict" : "Moderate to strict",
      note: "Based on local self-exclusion systems, ad restrictions, and affordability controls.",
    },
    {
      label: "Withdrawal speed",
      value: "Same day to 3 days",
      note: "Varies by payment method, KYC completion, and operator policy.",
    },
    {
      label: "Best onboarding method",
      value: data.paymentMethods[0],
      note: "Usually the most common and verified option for local users.",
    },
  ];

  const strategyChecklist = [
    "Compare wagering requirements before claiming welcome bonuses",
    "Check minimum odds or game restrictions linked to bonus conversion",
    "Confirm if live betting qualifies for promotions",
    "Read withdrawal limits and verification timelines",
    "Use bankroll segmentation for pre-match and live markets",
    "Track bets weekly to prevent emotional decisions",
  ];

  const countryFaq = [
    {
      q: `Is online betting legal in ${data.name}?`,
      a: `Yes, with jurisdiction-specific rules. Always use licensed operators approved by ${data.regulator}.`,
    },
    {
      q: `What is the legal betting age in ${data.name}?`,
      a: `The legal age requirement is ${data.legalAge}. Age verification is required on regulated platforms.`,
    },
    {
      q: "How can I choose safer operators?",
      a: "Prioritize licensed sites, transparent bonus terms, strong support, and clear responsible-gambling tools.",
    },
    {
      q: "Are betting winnings taxed?",
      a: "Tax treatment differs by region and player status. Check your local authority or a tax advisor for accurate guidance.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* hero background removed to improve text contrast */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <div className="flex items-center gap-2 text-[#6F665D] hover:text-[#1F1A17] transition-colors mb-6 cursor-pointer w-fit" data-testid="link-back-home">
              <ArrowLeft size={15} />
              <span className="text-sm">Back to Home</span>
            </div>
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{data.flag}</span>
              <div>
                <div className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-1">Country Guide</div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1F1A17]">{data.name}</h1>
              </div>
            </div>
            <p className="text-[#5F554C] text-lg max-w-2xl leading-relaxed">{data.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Currency", value: data.currency },
            { label: "Regulator", value: data.regulator },
            { label: "Legal Age", value: data.legalAge },
            { label: "Tax on Winnings", value: "None" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-[#ECE6DB] rounded-xl p-4"
            >
              <div className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-[#1F1A17] font-medium text-sm">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TOP BONUSES */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 font-bold text-[#1F1A17]">Featured {data.name} offers</h2>
            <p className="text-lg text-[#6F665D] max-w-2xl mx-auto">
              {isAustralia 
                ? "Top betting sites for Australian players" 
                : `Best betting sites and bonuses for ${data.name}`}
            </p>
          </div>

          {isAustralia ? (
            // Australian Featured Grid Layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {data.topBonuses.map((casino, idx) => (
                <motion.div
                  key={casino.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="card-premium group h-full flex flex-col">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-[#1F1A17]">{casino.name}</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.round(casino.rating) ? "fill-[#2563EB] text-[#2563EB]" : "text-[#D4D0C8]"}`}
                                  />
                                ))}
                            </div>
                            <span className="text-sm text-[#8D847A]">({casino.reviews.toLocaleString()})</span>
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center ml-4 shrink-0">
                          <span className="text-xs font-bold text-gray-800">{casino.initials}</span>
                        </div>
                      </div>
                      <div className="bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="w-5 h-5 text-[#2563EB]" />
                          <span className="text-sm font-medium text-[#2563EB]">Bonus offer</span>
                        </div>
                        <p className="text-2xl font-bold text-[#1F1A17] mb-1">{casino.bonusTitle}</p>
                      </div>
                      <div className="space-y-2 mb-4 flex-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#8D847A]">Wagering</span>
                          <span className="font-medium text-[#1F1A17]">{casino.wagering}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#8D847A]">Min deposit</span>
                          <span className="font-medium text-[#1F1A17]">{casino.minDeposit}</span>
                        </div>
                        <div className="pt-2 border-t border-[#E5E4E2]">
                          <ul className="space-y-1">
                            {casino.features.map((feature: string) => (
                              <li key={feature} className="text-sm text-[#6F665D] flex items-start gap-2">
                                <span className="text-[#2563EB] mt-0.5">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-[#0B0A09] rounded-md text-sm font-bold transition-colors"
                        >
                          Claim bonus
                        </a>
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-2 py-2 w-9 border border-[#2563EB]/20 bg-background hover:bg-[#2563EB]/10 rounded-md transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Default grid for other countries
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.topBonuses.map((bonus, i) => (
                <BonusCard key={bonus.name} rank={i + 1} {...bonus} />
              ))}
            </div>
          )}

          {isAustralia && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-premium">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1F1A17]">Payment methods</h3>
                </div>
                <p className="text-[#6F665D] mb-4">Popular payment options for Australian players:</p>
                <ul className="space-y-2">
                  {["POLi (instant bank transfer)", "BPay", "Credit/debit cards", "Bank transfer"].map((method) => (
                    <li key={method} className="flex items-center gap-2">
                      <span className="text-[#2563EB]">•</span>
                      <span className="text-[#5F554C]">{method}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-premium">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1F1A17]">Australian regulation</h3>
                </div>
                <p className="text-[#6F665D] mb-4">All featured operators comply with Australian gambling laws:</p>
                <ul className="space-y-2">
                  {["Licensed by Northern Territory Racing Commission", "Responsible gambling tools", "Age verification required"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[#2563EB]">•</span>
                      <span className="text-[#5F554C]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* TOP BETTING SITES */}
      <section className="bg-muted/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[#1F1A17] mb-6">
            Top Betting Sites in {data.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.topSites.map((site, i) => (
              <motion.div
                key={site.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ borderColor: "rgba(37,99,235,0.3)" }}
                className="bg-white border border-[#ECE6DB] rounded-xl p-5 flex items-center gap-4 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#2563EB]/20 to-[#1B3950]/40 border border-[#E7E1D6] flex items-center justify-center font-bold text-[#2563EB] text-sm font-mono shrink-0">
                  {site.initials}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#1F1A17]">{site.name}</div>
                  <div className="text-[#2563EB] text-sm">{site.bonus}</div>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={`text-[10px] ${j < Math.round(site.rating) ? "text-[#2563EB]" : "text-[#C9C3B8]"}`}>★</span>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="px-4 py-2 bg-[#2563EB] text-[#0B0A09] rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-[#1D4ED8] transition-colors"
                  data-testid={`button-visit-country-${site.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  Visit <ExternalLink size={11} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEGAL INFO */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-[#2563EB]" />
              <h2 className="font-serif text-2xl font-bold text-[#1F1A17]">Legal Framework</h2>
            </div>
            <p className="text-[#5F554C] leading-relaxed">{data.legalInfo}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl font-bold text-[#1F1A17] mb-4">Player Tips</h2>
            <div className="flex flex-col gap-3">
              {data.tips.map((tip) => (
                <div key={tip} className="flex items-start gap-3">
                  <Check size={15} className="text-[#2563EB] mt-0.5 shrink-0" />
                  <span className="text-[#5F554C] text-sm leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="bg-muted/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-[#1F1A17] mb-6">Payment Methods in {data.name}</h2>
          <div className="flex flex-wrap gap-3">
            {data.paymentMethods.map((method) => (
              <span
                key={method}
                className="bg-white border border-[#E7E1D6] text-[#4A433C] px-4 py-2 rounded-lg text-sm hover:border-[#2563EB]/12 transition-colors"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET SNAPSHOT */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-[#1F1A17] mb-3">Market Snapshot: {data.name}</h2>
        <p className="text-[#5F554C] mb-6 max-w-3xl">
          This quick snapshot helps players evaluate operator quality, compliance standards, and practical onboarding expectations in {data.name}.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketSnapshot.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-[#ECE6DB] rounded-xl p-5"
            >
              <div className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-2">{item.label}</div>
              <div className="font-semibold text-[#1F1A17] mb-2">{item.value}</div>
              <p className="text-[#5F554C] text-sm">{item.note}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* START SMART CHECKLIST */}
      <section className="bg-[#1F1A17] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[#F2EDE4] mb-3">Start Smart in {data.name}</h2>
          <p className="text-[#D7CCBC] mb-6 max-w-3xl">
            Use this operational checklist before claiming bonuses or placing your first bets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {strategyChecklist.map((item) => (
              <div key={item} className="bg-white/5 border border-white/10 rounded-xl p-4 text-[#EFE6D9] text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER COUNTRIES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-[#1F1A17] mb-6">Other Country Guides</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(countryData)
            .filter(([key]) => key !== code)
            .map(([key, country]) => (
              <Link key={key} href={`/country/${key}`}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-2 bg-white border border-[#ECE6DB] hover:border-[#2563EB]/12 rounded-lg px-4 py-2.5 cursor-pointer transition-all"
                  data-testid={`link-other-country-${key}`}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="text-[#4A433C] text-sm hover:text-[#1F1A17] transition-colors">{country.name}</span>
                </motion.div>
              </Link>
            ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-[#1F1A17] mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countryFaq.map((item) => (
            <div key={item.q} className="bg-white border border-[#ECE6DB] rounded-xl p-5">
              <h3 className="font-semibold text-[#1F1A17] mb-2">{item.q}</h3>
              <p className="text-[#5F554C] text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

