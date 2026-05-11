import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DesktopOfferCard from "@/components/DesktopOfferCard";
import MobileOfferCard from "@/components/MobileOfferCard";
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
  const [gameOffers, setGameOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingGames, setLoadingGames] = useState(true);
  const [offersError, setOffersError] = useState<string | null>(null);
  const [gamesError, setGamesError] = useState<string | null>(null);

  useEffect(() => {
    const loadOffers = async () => {
      setLoadingOffers(true);
      setOffersError(null);

      try {
        const response = await fetch(
          import.meta.env.VITE_OFFERS_API || 'https://click.creditsdeal.com/api/offerList?categoryId=14'
        );
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

  useEffect(() => {
    const loadGameOffers = async () => {
      setLoadingGames(true);
      setGamesError(null);

      try {
        const response = await fetch(
          import.meta.env.VITE_GAMES_API || 'https://click.creditsdeal.com/api/offerList?categoryId=15'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const payload = await response.json();
        if (payload && typeof payload === 'object' && 'responseCode' in payload && Array.isArray(payload.responseResult)) {
          setGameOffers(payload.responseResult as Offer[]);
          return;
        }

        if (Array.isArray(payload)) {
          setGameOffers(payload as Offer[]);
          return;
        }

        throw new Error('Invalid response format');
      } catch (error) {
        console.error('Failed to load game offers:', error);
        setGamesError('Game offers are unavailable right now.');
        setGameOffers([]);
      } finally {
        setLoadingGames(false);
      }
    };

    loadGameOffers();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Best Bonus Casino Section */}
      <section className="relative py-12 sm:py-14 max-w-7xl mx-auto px-1.5 sm:px-1.5 lg:px-2">
        <div className="absolute inset-x-4 top-3 -z-10 h-20 rounded-4xl bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.12),transparent_70%),linear-gradient(135deg,rgba(13,27,57,0.96),rgba(7,17,34,0.96))] blur-2xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2f4f8f]/45 bg-[linear-gradient(180deg,rgba(10,20,40,0.94),rgba(15,25,50,0.94))] px-2 py-1.5 text-[#e8edff] text-xs font-semibold uppercase tracking-[0.2em] mb-2 shadow-[0_10px_26px_rgba(8,17,34,0.24)] backdrop-blur-sm">
            <Sparkles size={12} className="fill-[#60a5fa] text-[#60a5fa]" /> Live casino feed
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[white] mb-3">Best Bonus Casino</h1>
        </motion.div>


        {loadingOffers ? (
          <div className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] px-4 py-10 text-center text-[#c5cce2]">Loading live offers...</div>
        ) : offersError ? (
          <div className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] px-4 py-10 text-center text-[#c5cce2]">{offersError}</div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:flex flex-col gap-4">
              {liveOffers.map((offer) => (
                <motion.div
                  key={offer._id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <DesktopOfferCard offer={offer} />
                </motion.div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col gap-3">
              {liveOffers.map((offer) => (
                <motion.div
                  key={offer._id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <MobileOfferCard offer={offer} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Game Offers Section */}
      <section className="relative pt-0 pb-12 sm:pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-4 top-10 -z-10 h-40 rounded-4xl bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.12),transparent_70%),linear-gradient(135deg,rgba(13,27,57,0.96),rgba(7,17,34,0.96))] blur-2xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[white] mb-3">Best Bonus Casino</h1>
        </motion.div>

    
        {loadingGames ? (
          <div className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] px-4 py-10 text-center text-[#c5cce2]">Loading game offers...</div>
        ) : gamesError ? (
          <div className="rounded-2xl border border-[#28406f] bg-[linear-gradient(180deg,rgba(11,22,48,0.96),rgba(7,17,34,0.96))] px-4 py-10 text-center text-[#c5cce2]">{gamesError}</div>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:flex flex-col gap-4">
              {gameOffers.map((offer) => (
                <motion.div
                  key={offer._id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <DesktopOfferCard offer={offer} />
                </motion.div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col gap-3">
              {gameOffers.map((offer) => (
                <motion.div
                  key={offer._id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <MobileOfferCard offer={offer} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}


