import { motion } from "framer-motion";
import { useParams } from "wouter";
import { Shield, Check, ExternalLink, ArrowLeft } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-[#0B0A09]">
      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B3950]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 cursor-pointer w-fit" data-testid="link-back-home">
              <ArrowLeft size={15} />
              <span className="text-sm">Back to Home</span>
            </div>
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{data.flag}</span>
              <div>
                <div className="text-[#D97706] text-sm font-semibold uppercase tracking-widest mb-1">Country Guide</div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">{data.name}</h1>
              </div>
            </div>
            <p className="text-white/55 text-lg max-w-2xl leading-relaxed">{data.intro}</p>
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
              className="bg-[#111009] border border-white/8 rounded-xl p-4"
            >
              <div className="text-[#D97706] text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-white font-medium text-sm">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TOP BONUSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="font-serif text-3xl font-bold text-white mb-6">
          Top Casino Bonuses in {data.name}
        </h2>
        <div className="flex flex-col gap-4">
          {data.topBonuses.map((bonus, i) => (
            <BonusCard key={bonus.name} rank={i + 1} {...bonus} />
          ))}
        </div>
      </section>

      {/* TOP BETTING SITES */}
      <section className="bg-[#080706] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white mb-6">
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
                whileHover={{ borderColor: "rgba(217,119,6,0.3)" }}
                className="bg-[#111009] border border-white/8 rounded-xl p-5 flex items-center gap-4 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D97706]/20 to-[#1B3950]/40 border border-white/10 flex items-center justify-center font-bold text-[#D97706] text-sm font-mono flex-shrink-0">
                  {site.initials}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{site.name}</div>
                  <div className="text-[#D97706] text-sm">{site.bonus}</div>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={`text-[10px] ${j < Math.round(site.rating) ? "text-[#D97706]" : "text-white/20"}`}>★</span>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  className="px-4 py-2 bg-[#D97706] text-[#0B0A09] rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-[#DC6803] transition-colors"
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
              <Shield size={20} className="text-[#D97706]" />
              <h2 className="font-serif text-2xl font-bold text-white">Legal Framework</h2>
            </div>
            <p className="text-white/55 leading-relaxed">{data.legalInfo}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl font-bold text-white mb-4">Player Tips</h2>
            <div className="flex flex-col gap-3">
              {data.tips.map((tip) => (
                <div key={tip} className="flex items-start gap-3">
                  <Check size={15} className="text-[#D97706] mt-0.5 flex-shrink-0" />
                  <span className="text-white/60 text-sm leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="bg-[#080706] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">Payment Methods in {data.name}</h2>
          <div className="flex flex-wrap gap-3">
            {data.paymentMethods.map((method) => (
              <span
                key={method}
                className="bg-[#111009] border border-white/10 text-white/70 px-4 py-2 rounded-lg text-sm hover:border-[#D97706]/30 transition-colors"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER COUNTRIES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-white mb-6">Other Country Guides</h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(countryData)
            .filter(([key]) => key !== code)
            .map(([key, country]) => (
              <Link key={key} href={`/country/${key}`}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-2 bg-[#111009] border border-white/8 hover:border-[#D97706]/30 rounded-lg px-4 py-2.5 cursor-pointer transition-all"
                  data-testid={`link-other-country-${key}`}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="text-white/70 text-sm hover:text-white transition-colors">{country.name}</span>
                </motion.div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
