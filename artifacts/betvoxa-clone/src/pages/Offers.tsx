import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe } from 'lucide-react';
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
  categoryName?: string;
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
  const [userCountry, setUserCountry] = useState<string | null>(null);

  // Detect user country on mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code || null);
      } catch (err) {
        console.log('Could not detect user country');
        setUserCountry(null);
      }
    };

    detectCountry();
  }, []);

  // Fetch offers
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = import.meta.env.VITE_OFFERS_API || 'https://betvoxa-api-server.vercel.app/casinos';
        let response: Response;

        try {
          response = await fetch(apiUrl);
          // If the remote returns HTML (e.g. a 404 HTML page) or non-JSON, fall back to local file
          const contentType = response.headers.get('content-type') || '';
          if (!response.ok || !contentType.includes('application/json')) {
            // try local fallback
            response = await fetch('/offers.json');
          }
        } catch (e) {
          // fallback to local file when API unreachable
          response = await fetch('/offers.json');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Try to parse JSON, but be defensive against unexpected shapes (HTML, plain text)
        let parsed: any;
        try {
          parsed = await response.json();
        } catch (e) {
          // If parsing fails, try the local file explicitly
          const fallback = await fetch('/offers.json');
          parsed = await fallback.json();
        }

        // Accept either the wrapped API shape or a plain array of offers
        if (Array.isArray(parsed)) {
          setOffers(parsed as Offer[]);
        } else if (parsed && typeof parsed === 'object' && 'responseCode' in parsed && parsed.responseResult) {
          setOffers(parsed.responseResult as Offer[]);
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

  // Show all offers to all users - no geo restrictions

  // Filter offers based on search term
  const filteredOffers = offers.filter(
    (offer) =>
      offer.offerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.geo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show all offers to all users - no geo restrictions
  const availableOffers = filteredOffers;
  const restrictedOffers: Offer[] = [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <div className="bg-linear-to-br from-background via-[#eef6ff] to-background text-[#1F1A17] py-12 px-4 md:py-16 border-b border-border/60">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-2 font-poppins"
          >
            Casino & Betting Offers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#5F554C]"
          >
            Discover the best casino and betting offers for your region
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by casino name, location, or offer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-600 focus:outline-none transition-colors font-poppins"
          />
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <p className="text-red-800">{error}</p>
          </motion.div>
        )}

        {!loading && offers.length > 0 && (
          <>
            {availableOffers.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-8"
              >
                {availableOffers.map((offer) => (
                  <motion.div key={offer._id} variants={itemVariants}>
                    <OfferCard
                      offer={offer}
                      userCountry={userCountry || undefined}
                      geoRestricted={false}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {filteredOffers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-600">No offers found matching your search.</p>
              </motion.div>
            )}
          </>
        )}

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

      <div className="bg-[#eef6ff] py-12 px-4 mt-12 border-t border-[#d6e7f7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1F1A17] mb-6 font-poppins">About Our Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2 font-poppins">Curated Selection</h3>
              <p className="text-gray-700">We carefully select the best casino and betting platforms for our users.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2 font-poppins">Region-Specific</h3>
              <p className="text-gray-700">Find offers specifically tailored to your country and region.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2 font-poppins">Generous Bonuses</h3>
              <p className="text-gray-700">Discover exclusive welcome bonuses and ongoing promotional offers.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Offers;

