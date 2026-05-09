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
      {/* Gambling Casinos Section */}
      <section className="relative py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-4 top-10 -z-10 h-40 rounded-4xl bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_70%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.86))] blur-2xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/12 bg-[#2563EB]/8 px-4 py-1.5 text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles size={12} className="fill-[#2563EB]" /> Live casino feed
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-3">Gambling Casinos</h1>
          <p className="text-[#5F554C] text-base max-w-2xl mx-auto">
            Top gambling casino offers with exciting bonuses and rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Live offers", value: liveOffers.length || 0 },
            { label: "Top rating", value: liveOffers.length ? Math.max(...liveOffers.map((offer) => Number.parseFloat(offer.rating) || 0)).toFixed(1) : "0.0" },
            { label: "Fresh feed", value: "API" },
            { label: "Theme", value: "Blue Gold" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#d8e7f7] bg-white px-4 py-4 text-center shadow-[0_14px_35px_rgba(37,99,235,0.08)]">
              <div className="text-2xl font-bold text-[#2563EB] mb-1">{item.value}</div>
              <div className="text-xs uppercase tracking-wider text-[#6F665D]">{item.label}</div>
            </div>
          ))}
        </div>

        {loadingOffers ? (
          <div className="rounded-2xl border border-[#d8e7f7] bg-white px-4 py-10 text-center text-[#5F554C]">Loading live offers...</div>
        ) : offersError ? (
          <div className="rounded-2xl border border-[#d8e7f7] bg-white px-4 py-10 text-center text-[#5F554C]">{offersError}</div>
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
      <section className="relative py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-4 top-10 -z-10 h-40 rounded-4xl bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.16),transparent_70%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(243,232,255,0.86))] blur-2xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a855f7]/12 bg-[#a855f7]/8 px-4 py-1.5 text-[#a855f7] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Trophy size={12} className="fill-[#a855f7]" /> Popular Games
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-3">Game Platforms</h1>
          <p className="text-[#5F554C] text-base max-w-2xl mx-auto">
            Explore exciting gaming platforms with exclusive bonuses and premium features.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Game offers", value: gameOffers.length || 0 },
            { label: "Top rating", value: gameOffers.length ? Math.max(...gameOffers.map((offer) => Number.parseFloat(offer.rating) || 0)).toFixed(1) : "0.0" },
            { label: "Fresh feed", value: "API" },
            { label: "Category", value: "Games" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#e9d5ff] bg-white px-4 py-4 text-center shadow-[0_14px_35px_rgba(168,85,247,0.08)]">
              <div className="text-2xl font-bold text-[#a855f7] mb-1">{item.value}</div>
              <div className="text-xs uppercase tracking-wider text-[#6F665D]">{item.label}</div>
            </div>
          ))}
        </div>

        {loadingGames ? (
          <div className="rounded-2xl border border-[#e9d5ff] bg-white px-4 py-10 text-center text-[#5F554C]">Loading game offers...</div>
        ) : gamesError ? (
          <div className="rounded-2xl border border-[#e9d5ff] bg-white px-4 py-10 text-center text-[#5F554C]">{gamesError}</div>
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


