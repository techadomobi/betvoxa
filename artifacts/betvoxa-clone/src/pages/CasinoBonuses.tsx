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

const FALLBACK_OFFERS_URL = "/offers.json";

const parseOffersPayload = (payload: unknown): Offer[] => {
  if (Array.isArray(payload)) {
    return payload as Offer[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as { responseResult?: unknown }).responseResult)) {
    return (payload as { responseResult: Offer[] }).responseResult;
  }

  throw new Error("Invalid response format");
};

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
        const apiUrl = import.meta.env.VITE_OFFERS_API;
        let response = await fetch(apiUrl || FALLBACK_OFFERS_URL);

        if (!response.ok && apiUrl) {
          response = await fetch(FALLBACK_OFFERS_URL);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setOffers(parseOffersPayload(await response.json()));
      } catch (fetchError) {
        console.error("Failed to load casino offers:", fetchError);
        try {
          const fallbackResponse = await fetch(FALLBACK_OFFERS_URL);

          if (!fallbackResponse.ok) {
            throw new Error(`HTTP error! status: ${fallbackResponse.status}`);
          }

          setOffers(parseOffersPayload(await fallbackResponse.json()));
          setError(null);
        } catch (fallbackError) {
          console.error("Failed to load fallback casino offers:", fallbackError);
          setError("Live casino offers are unavailable right now.");
          setOffers([]);
        }
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
    <div className="min-h-screen bg-transparent text-foreground">
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20 sm:pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_42%),radial-gradient(circle_at_72%_12%,rgba(16,185,129,0.12),transparent_24%),radial-gradient(circle_at_18%_18%,rgba(96,165,250,0.12),transparent_26%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7dd3fc]/35 bg-[linear-gradient(180deg,rgba(10,20,40,0.94),rgba(15,25,50,0.94))] px-4 py-1.5 text-[#e8edff] text-xs font-semibold uppercase tracking-[0.2em] mb-4 shadow-[0_12px_28px_rgba(8,17,34,0.22)]">
              <Star size={12} className="fill-[#60a5fa] text-[#60a5fa]" /> Live bonus feed
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_8px_24px_rgba(8,17,34,0.34)]">Casino Bonuses</h1>
            <p className="mx-auto max-w-2xl text-[#c5cce2] text-base md:text-lg">
              A richer, darker bonus hub with live offers, sharper contrast, and premium card styling designed to stand out.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] p-4 text-center shadow-[0_14px_35px_rgba(8,17,34,0.24)]"
              >
                <div className="text-2xl font-bold text-yellow-400 mb-1">{stat.value}</div>
                <div className="text-[#9ca7c5] text-xs uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-3xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] p-4 sm:p-5 shadow-[0_20px_60px_rgba(8,17,34,0.24)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[#60a5fa] text-xs font-semibold uppercase tracking-[0.2em] mb-1">Search live offers</div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Find the right bonus faster</h2>
            </div>
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca7c5]" size={18} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search casino name, bonus, or geo..."
                className="w-full rounded-2xl border border-[#28406f] bg-[#0d1b39] px-11 py-3 text-sm text-white placeholder:text-[#7f8aac] outline-none transition-colors focus:border-[#60a5fa]/55"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#c5cce2]">
            {[
              "Welcome bonuses",
              "Free spins",
              "No wagering",
              "Instant payouts",
            ].map((tag) => (
              <span key={tag} className="rounded-full border border-[#28406f] bg-[#0d1b39] px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] px-4 py-10 text-center text-[#c5cce2]">Loading live offers...</div>
        ) : error ? (
          <div className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] px-4 py-10 text-center text-[#c5cce2]">{error}</div>
        ) : filteredOffers.length === 0 ? (
          <div className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] px-4 py-10 text-center text-[#c5cce2]">No casino offers matched your search.</div>
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
                className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] p-5 shadow-[0_14px_35px_rgba(8,17,34,0.22)]"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#28406f] bg-[#0d1b39] text-[#60a5fa]">
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[#c5cce2]">{card.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] p-5 sm:p-6 shadow-[0_20px_60px_rgba(8,17,34,0.22)]">
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={18} className="text-yellow-400" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Casino Bonus FAQ</h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqItems.map((faq, index) => (
              <motion.div key={faq.q} className="overflow-hidden rounded-2xl border border-[#28406f] bg-[#0d1b39]">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={16} className="text-[#60a5fa]" /> : <ChevronDown size={16} className="text-[#9ca7c5]" />}
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="border-t border-[#28406f] px-4 pb-4 pt-3 text-sm leading-relaxed text-[#c5cce2]">
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
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#28406f] bg-[linear-gradient(135deg,rgba(10,20,40,0.96),rgba(15,25,50,0.96))] p-6 sm:p-8 shadow-[0_20px_60px_rgba(8,17,34,0.24)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[#60a5fa] text-xs font-semibold uppercase tracking-[0.2em] mb-1">Safe play</div>
              <h3 className="font-serif text-2xl font-bold text-white">Claim bonuses with a clear head</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#c5cce2]">
                Use the API feed to compare offers, but always check regional availability, wagering terms, and withdrawal rules before you deposit.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-[#c5cce2]">
              {[
                "18+ only",
                "Read T&Cs",
                "Set limits",
                "Play responsibly",
              ].map((label) => (
                <span key={label} className="rounded-full border border-[#28406f] bg-[#0d1b39] px-3 py-1">
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
