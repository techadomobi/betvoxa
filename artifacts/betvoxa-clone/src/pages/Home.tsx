import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-3">Live casino feed</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#FFD54A] mb-3">Casinos</h1>
          <p className="text-[#C7D5E6] text-base max-w-2xl mx-auto">
            Real casino offers fetched from the API. Nothing else is shown on the home page.
          </p>
        </motion.div>

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


