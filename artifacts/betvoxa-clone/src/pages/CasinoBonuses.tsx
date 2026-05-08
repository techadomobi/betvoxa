import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
  Shield,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import OfferCard from "@/components/OfferCard";

interface Offer {
  _id: string;
  offerName: string;
  image: string;
  description1: string;
  description2: string;
  description3: string;
  geo: string;
  rating: string;
  buttonName: string;
  trackingLink: string;
  rewardAmount: string;
  slug: string;
  seoTitle: string;
  metaDescription?: string;
  categoryName?: string;
}

const faqItems = [
  {
    q: "What is the difference between a casino bonus and free spins?",
    a: "A casino bonus is usually matched deposit funds added to your balance. Free spins are complimentary rounds on slot games. Some offers combine both, and all live offers on this page are fetched from the API.",
  },
  {
    q: "Can I withdraw a casino bonus immediately?",
    a: "Usually no. Most offers have wagering requirements. You need to complete the playthrough before withdrawing winnings tied to the bonus.",
  },
  {
    q: "How do I know these offers are real?",
    a: "The page loads the live casino feed directly from the API endpoint, so the cards you see are the same real-time entries used elsewhere in the app.",
  },
  {
    q: "Are these offers safe to claim?",
    a: "Only claim from operators you trust and always check the T&Cs, limits, and regional availability before depositing.",
  },
];

const trustCards = [
  {
    icon: Shield,
    title: "Verified Operators",
    text: "We keep the UI clean, but the live feed still comes from the real API so the page reflects current offers.",
  },
  {
    icon: Zap,
    title: "Fast Payout Focus",
    text: "Clear reward details, bonus metadata, and operator labels help players compare offers quickly.",
  },
  {
    icon: CheckCircle,
    title: "Consistent Theme",
    text: "Dark panels, blue accents, and yellow headings now match the rest of the app shell.",
  },
];

export default function CasinoBonuses() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(import.meta.env.VITE_OFFERS_API || "https://betvoxa-api-server.vercel.app/casinos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const payload = await response.json();
        if (Array.isArray(payload)) {
          setOffers(payload as Offer[]);
        } else if (payload && typeof payload === "object" && Array.isArray(payload.responseResult)) {
          setOffers(payload.responseResult as Offer[]);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (fetchError) {
        console.error("Failed to load casino offers:", fetchError);
        setError("Live casino offers are unavailable right now.");
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  const filteredOffers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return offers;
    }

    return offers.filter((offer) => {
      return [offer.offerName, offer.geo, offer.description1, offer.description2, offer.description3, offer.categoryName]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query));
    });
  }, [offers, searchTerm]);

  const averageRating = useMemo(() => {
    if (!offers.length) {
      return 0;
    }

    const total = offers.reduce((sum, offer) => sum + (Number.parseFloat(offer.rating) || 0), 0);
    return total / offers.length;
  }, [offers]);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20 sm:pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_40%),radial-gradient(circle_at_70%_10%,rgba(59,130,246,0.12),transparent_25%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/12 bg-[#2563EB]/8 px-4 py-1.5 text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              <Star size={12} className="fill-[#2563EB]" /> Live bonus feed
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#FFD54A] mb-4">Casino Bonuses</h1>
            <p className="mx-auto max-w-2xl text-[#C7D5E6] text-base md:text-lg">
              Real offers fetched from the API and displayed in a cleaner, darker layout that matches the rest of the app.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Live offers", value: offers.length.toString().padStart(2, "0") },
            { label: "Average rating", value: averageRating ? averageRating.toFixed(1) : "0.0" },
            { label: "Fast compare", value: "API" },
            { label: "Theme", value: "Dark" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-[#162233] bg-[#0F1724] p-4 text-center"
            >
              <div className="text-2xl font-bold text-[#FFD54A] mb-1">{stat.value}</div>
              <div className="text-[#9DB3C9] text-xs uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-3xl border border-[#162233] bg-[#0F1724] p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-1">Search live offers</div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F4F8FC]">Find the right bonus faster</h2>
            </div>
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D847A]" size={18} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search casino name, bonus, or geo..."
                className="w-full rounded-2xl border border-[#162233] bg-[#071122] px-11 py-3 text-sm text-[#F4F8FC] placeholder:text-[#8D847A] outline-none transition-colors focus:border-[#2563EB]/50"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#C7D5E6]">
            {[
              "Welcome bonuses",
              "Free spins",
              "No wagering",
              "Instant payouts",
            ].map((tag) => (
              <span key={tag} className="rounded-full border border-[#162233] bg-[#071122] px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="rounded-2xl border border-[#162233] bg-[#0F1724] px-4 py-10 text-center text-[#C7D5E6]">Loading live offers...</div>
        ) : error ? (
          <div className="rounded-2xl border border-[#162233] bg-[#0F1724] px-4 py-10 text-center text-[#C7D5E6]">{error}</div>
        ) : filteredOffers.length === 0 ? (
          <div className="rounded-2xl border border-[#162233] bg-[#0F1724] px-4 py-10 text-center text-[#C7D5E6]">No casino offers matched your search.</div>
        ) : (
          <div className="grid gap-4">
            {filteredOffers.map((offer) => (
              <motion.div key={offer._id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <OfferCard offer={offer} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {trustCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-[#162233] bg-[#0F1724] p-5"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#2563EB]/12 bg-[#2563EB]/8 text-[#2563EB]">
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#F4F8FC]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[#C7D5E6]">{card.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl border border-[#162233] bg-[#0F1724] p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={18} className="text-[#FFD54A]" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F4F8FC]">Casino Bonus FAQ</h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqItems.map((faq, index) => (
              <motion.div key={faq.q} className="rounded-2xl border border-[#162233] bg-[#071122] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                >
                  <span className="text-sm font-medium text-[#F4F8FC]">{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={16} className="text-[#2563EB]" /> : <ChevronDown size={16} className="text-[#8D847A]" />}
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="border-t border-[#162233] px-4 pb-4 pt-3 text-sm leading-relaxed text-[#C7D5E6]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#2563EB]/12 bg-[linear-gradient(135deg,rgba(7,17,34,1),rgba(15,23,36,1))] p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-1">Safe play</div>
              <h3 className="font-serif text-2xl font-bold text-[#F4F8FC]">Claim bonuses with a clear head</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#C7D5E6]">
                Use the API feed to compare offers, but always check regional availability, wagering terms, and withdrawal rules before you deposit.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-[#C7D5E6]">
              {[
                "18+ only",
                "Read T&Cs",
                "Set limits",
                "Play responsibly",
              ].map((label) => (
                <span key={label} className="rounded-full border border-[#162233] bg-[#071122] px-3 py-1">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
