import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OfferCard from "@/components/OfferCard";
import { ExternalLink, Trophy, Sparkles } from "lucide-react";

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

export default function Home() {
  const [liveOffers, setLiveOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [offersError, setOffersError] = useState<string | null>(null);

  useEffect(() => {
    const loadOffers = async () => {
      setLoadingOffers(true);
      setOffersError(null);

      try {
        const response = await fetch(import.meta.env.VITE_OFFERS_API || 'https://betvoxa-api-server.vercel.app/casinos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const payload = await response.json();
        if (payload && typeof payload === 'object' && 'responseCode' in payload && Array.isArray(payload.responseResult)) {
          setLiveOffers(payload.responseResult as Offer[]);
          return;
        }

        if (Array.isArray(payload)) {
          setLiveOffers(payload as Offer[]);
          return;
        }

        throw new Error('Invalid response format');
      } catch (error) {
        console.error('Failed to load live offers:', error);
        setOffersError('Live offers are unavailable right now.');
        setLiveOffers([]);
      } finally {
        setLoadingOffers(false);
      }
    };

    loadOffers();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="relative py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-4 top-10 -z-10 h-40 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_70%),linear-gradient(135deg,rgba(7,17,34,0.9),rgba(15,23,36,0.7))] blur-2xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/12 bg-[#2563EB]/8 px-4 py-1.5 text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles size={12} className="fill-[#2563EB]" /> Live casino feed
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#FFD54A] mb-3">Casinos</h1>
          <p className="text-[#C7D5E6] text-base max-w-2xl mx-auto">
            Real offers fetched from the API, presented in a premium blue-gold layout that matches the rest of the site.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Live offers", value: liveOffers.length || 0 },
            { label: "Top rating", value: liveOffers.length ? Math.max(...liveOffers.map((offer) => Number.parseFloat(offer.rating) || 0)).toFixed(1) : "0.0" },
            { label: "Fresh feed", value: "API" },
            { label: "Theme", value: "Blue Gold" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#162233] bg-[#0F1724] px-4 py-4 text-center shadow-[0_14px_35px_rgba(0,0,0,0.12)]">
              <div className="text-2xl font-bold text-[#FFD54A] mb-1">{item.value}</div>
              <div className="text-xs uppercase tracking-wider text-[#9DB3C9]">{item.label}</div>
            </div>
          ))}
        </div>

        {loadingOffers ? (
          <div className="rounded-2xl border border-[#162233] bg-[#0F1724] px-4 py-10 text-center text-[#C7D5E6]">Loading live offers...</div>
        ) : offersError ? (
          <div className="rounded-2xl border border-[#162233] bg-[#0F1724] px-4 py-10 text-center text-[#C7D5E6]">{offersError}</div>
        ) : (
          <div className="flex flex-col gap-4">
            {liveOffers.map((offer) => (
              <motion.div
                key={offer._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <OfferCard offer={offer} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


