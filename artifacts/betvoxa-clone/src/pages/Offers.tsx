import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import OfferCard from '../components/OfferCard';

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
}

interface OffersResponse {
  responseCode: number;
  responseMessage: string;
  responseResult: Offer[];
}

const Offers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from API first
        const apiUrl = import.meta.env.VITE_OFFERS_API;
        let response: Response;

        if (apiUrl) {
          try {
            response = await fetch(apiUrl);
            if (!response.ok) {
              throw new Error('API call failed');
            }
          } catch {
            // Fall back to local JSON if API fails
            response = await fetch('/offers.json');
          }
        } else {
          // No API configured, use local JSON
          response = await fetch('/offers.json');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: OffersResponse = await response.json();

        if (data.responseCode === 200 && data.responseResult) {
          setOffers(data.responseResult);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError('Failed to load offers. Please try again later.');
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Filter offers based on search term
  const filteredOffers = offers.filter(
    (offer) =>
      offer.offerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.geo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-linear-to-b from-[#FAF9F6] to-white"
    >
      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#1F1A17] to-[#3D3531] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 font-poppins"
          >
            Casino & Betting Offers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-200"
          >
            Explore the best casino and betting offers tailored to your location
          </motion.p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by casino name, location, or offer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#F97316] focus:outline-none transition-colors font-poppins"
          />
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F97316]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <p className="text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Offers Grid */}
        {!loading && offers.length > 0 && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {filteredOffers.map((offer) => (
                <motion.div key={offer._id} variants={itemVariants}>
                  <OfferCard offer={offer} />
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredOffers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-600">
                  No offers found matching your search. Try different keywords!
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && offers.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">No offers available at the moment.</p>
          </motion.div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-[#F3F1EA] py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1F1A17] mb-6 font-poppins">
            About Our Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#F97316] mb-2 font-poppins">
                Curated Selection
              </h3>
              <p className="text-gray-700">
                We carefully select the best casino and betting platforms for our users.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F97316] mb-2 font-poppins">
                Location-Based
              </h3>
              <p className="text-gray-700">
                Find offers specifically tailored to your country and region.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F97316] mb-2 font-poppins">
                Generous Bonuses
              </h3>
              <p className="text-gray-700">
                Discover exclusive welcome bonuses and ongoing promotional offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Offers;
