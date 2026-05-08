import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  Search,
  Shield,
  Star,
  Trophy,
  Zap,
} from "lucide-react";

const initialSportsbooks = [
  {
    initials: "BET",
    name: "Bet365",
    reviews: 18234,
    rating: 4.9,
    featured: true,
    desc: "Industry-leading sportsbook with extensive live betting options, competitive odds, and comprehensive coverage of sports worldwide.",
    bonus: "Up to $500 in Bet Credits",
    features: ["Live streaming on 140,000+ events", "Cash out on pre-match and in-play bets", "Best odds guaranteed", "Mobile app for iOS and Android"],
  },
  {
    initials: "DK",
    name: "DraftKings",
    reviews: 15678,
    rating: 4.8,
    featured: true,
    desc: "Leading US sportsbook combining daily fantasy sports with traditional sports betting. Excellent same-game parlays and promotions.",
    bonus: "Up to $1,000 Deposit Match",
    features: ["Same game parlay builder", "Daily fantasy integration", "Live betting with real-time odds", "Exclusive odds boosts"],
  },
  {
    initials: "FD",
    name: "FanDuel",
    reviews: 16234,
    rating: 4.8,
    featured: false,
    desc: "Top-rated US sportsbook with a clean interface, competitive odds, and excellent customer service.",
    bonus: "No-Sweat First Bet up to $1,000",
    features: ["No sweat first bet", "Live betting on all major sports", "Easy parlay builder", "Fast payouts via PayPal"],
  },
  {
    initials: "BF",
    name: "Betfair",
    reviews: 12456,
    rating: 4.7,
    featured: false,
    desc: "Betting exchange with unique trading opportunities and better odds than traditional bookmakers.",
    bonus: "Commission-free month for new customers",
    features: ["Exchange with best odds", "Traditional sportsbook option", "Cash out on exchange bets", "Commission-free promotions"],
  },
  {
    initials: "WH",
    name: "William Hill",
    reviews: 14567,
    rating: 4.7,
    featured: false,
    desc: "Established UK bookmaker with over 80 years of experience and strong coverage across major sports.",
    bonus: "£30 in Free Bets",
    features: ["Best odds guaranteed", "Horse racing coverage", "Live streaming available", "Retail betting shops"],
  },
];

const methodologyPoints = [
  { icon: Shield, title: "Licensing & Regulation", pct: "30%", desc: "We verify licence validity from UKGC, MGA, Gibraltar, and other bodies." },
  { icon: Zap, title: "Payout Speed", pct: "20%", desc: "We test withdrawal times across all payment methods." },
  { icon: Globe, title: "Market Coverage", pct: "15%", desc: "We count sports, leagues, and live markets available." },
  { icon: BookOpen, title: "Bonus Value", pct: "5%", desc: "We calculate the true value of welcome offers after wagering." },
];

const quickTips = [
  "Choose licensed sportsbooks only",
  "Compare bonuses before depositing",
  "Use cash out to manage risk",
  "Check country eligibility first",
];

const faqs = [
  { q: "What is the best betting site for football?", a: "Bet365 is widely considered the best for football because of its market depth, live streaming, and in-play options." },
  { q: "What does cash out mean?", a: "Cash out lets you settle a bet early, either to lock in profit or reduce losses before the event ends." },
  { q: "What is a same game parlay?", a: "A same-game parlay combines multiple outcomes from the same match into one bet for a bigger payout." },
  { q: "How do I choose a safe sportsbook?", a: "Look for a valid licence, clear terms, strong support, and transparent withdrawal rules." },
];

export default function BettingSites() {
  const [sportsbooks, setSportsbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchSportsbooks = async () => {
      try {
        const response = await fetch("https://betvoxa-api-server.vercel.app/sportsbooks");
        const data = await response.json();
        if (Array.isArray(data)) {
          setSportsbooks(data);
        } else if (data?.responseResult && Array.isArray(data.responseResult)) {
          setSportsbooks(data.responseResult);
        } else {
          setSportsbooks(initialSportsbooks);
        }
      } catch (error) {
        console.error("Failed to fetch sportsbooks:", error);
        setSportsbooks(initialSportsbooks);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsbooks();
  }, []);

  const filteredSportsbooks = sportsbooks.filter((site) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;
    return [site.name, site.desc, site.bonus, ...(site.features || [])]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20 sm:pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_42%),radial-gradient(circle_at_70%_10%,rgba(59,130,246,0.08),transparent_25%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/12 bg-[#2563EB]/8 px-4 py-1.5 text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              <Trophy size={12} className="fill-[#2563EB]" /> Sportsbook row view
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1F1A17] mb-4">Best Betting Sites</h1>
            <p className="mx-auto max-w-2xl text-[#5F554C] text-base md:text-lg">
              Live sportsbook data, cleaned up into row-based comparison cards so every entry reads left-to-right.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="rounded-3xl border border-[#d8e7f7] bg-white p-4 sm:p-5 shadow-[0_20px_60px_rgba(37,99,235,0.06)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-1">Compare sportsbooks</div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1F1A17]">Row-wise cards, cleaner comparison</h2>
            </div>
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6F665D]" size={18} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search sportsbook, bonus, or feature..."
                className="w-full rounded-2xl border border-[#d8e7f7] bg-white px-11 py-3 text-sm text-[#1F1A17] placeholder:text-[#8D847A] outline-none transition-colors focus:border-[#2563EB]/50"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-4">
          {loading ? (
            <div className="rounded-2xl border border-[#d8e7f7] bg-white px-4 py-10 text-center text-[#5F554C]">Loading sportsbooks...</div>
          ) : filteredSportsbooks.length === 0 ? (
            <div className="rounded-2xl border border-[#d8e7f7] bg-white px-4 py-10 text-center text-[#5F554C]">No sportsbooks found.</div>
          ) : (
            filteredSportsbooks.map((site, index) => (
              <motion.article
                key={site.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-[#d8e7f7] bg-white p-4 sm:p-5 shadow-[0_14px_35px_rgba(37,99,235,0.05)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[#d8e7f7] bg-[#f7fbff] font-mono text-xl font-bold text-[#2563EB]">
                      {site.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-2xl font-bold text-[#1F1A17]">{site.name}</h3>
                        {site.featured && <span className="rounded-full border border-[#2563EB]/12 bg-[#2563EB]/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">Featured</span>}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={12}
                              className={starIndex < Math.round(site.rating) ? "fill-[#2563EB] text-[#2563EB]" : "fill-[#ECE6DB] text-[#D4D0C8]"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#6F665D]">({site.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5F554C]">{site.desc}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:min-w-55 lg:items-end">
                    <div className="rounded-xl border border-[#2563EB]/12 bg-[#f7fbff] px-4 py-3 text-left lg:text-right">
                      <div className="text-[10px] uppercase tracking-wider text-[#2563EB] font-bold mb-1">Bonus</div>
                      <div className="text-sm font-semibold text-[#1F1A17]">{site.bonus}</div>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1D4ED8]">
                      Visit Site <ExternalLink size={13} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-xl border border-[#162233] bg-[#071122] p-4">
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6F665D]">Features</div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {site.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-[#5F554C]">
                          <Check size={12} className="shrink-0 text-[#2563EB]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#162233] bg-[#071122] p-4">
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6F665D]">Quick Notes</div>
                    <div className="grid gap-2 text-sm text-[#5F554C]">
                      <div className="flex items-center gap-2"><BookOpen size={12} className="text-[#2563EB]" /> Real-time sportsbook feed</div>
                      <div className="flex items-center gap-2"><Shield size={12} className="text-[#2563EB]" /> Compare before depositing</div>
                      <div className="flex items-center gap-2"><Globe size={12} className="text-[#2563EB]" /> Availability depends on region</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4">
            {methodologyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-2xl border border-[#d8e7f7] bg-white p-4 flex items-center gap-4 shadow-[0_14px_35px_rgba(37,99,235,0.05)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/8 text-[#2563EB]">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-semibold text-[#F4F8FC]">{point.title}</div>
                      <div className="text-sm font-bold text-[#2563EB]">{point.pct}</div>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#5F554C]">{point.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F1A17] mb-6">Quick Tips</h2>
        <div className="grid gap-3">
          {quickTips.map((tip) => (
            <div key={tip} className="rounded-2xl border border-[#d8e7f7] bg-white px-4 py-4 text-[#5F554C] shadow-[0_14px_35px_rgba(37,99,235,0.05)]">
              {tip}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F1A17] mb-6 text-center">Sports Betting FAQ</h2>
          <div className="grid gap-3">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="overflow-hidden rounded-2xl border border-[#d8e7f7] bg-[#f7fbff]">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                >
                  <span className="text-sm font-medium text-[#1F1A17]">{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={16} className="text-[#2563EB]" /> : <ChevronDown size={16} className="text-[#6F665D]" />}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="border-t border-[#d8e7f7] px-4 pb-4 pt-3 text-sm leading-relaxed text-[#5F554C]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
