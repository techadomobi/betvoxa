import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, AlertCircle } from 'lucide-react';
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
  const [showGeoWarning, setShowGeoWarning] = useState(false);

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
        const apiUrl = import.meta.env.VITE_OFFERS_API;
        let response: Response;

        if (apiUrl) {
          try {
            response = await fetch(apiUrl);
            if (!response.ok) {
              throw new Error('API call failed');
            }
          } catch {
            response = await fetch('/offers.json');
          }
        } else {
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

  // Check if offer is available in user's country
  const isOfferAvailable = (offer: Offer): boolean => {
    if (!userCountry) return true; // Show all if we can't detect country

    // Extract country codes from geo string (e.g., "United Kingdom" -> "GB", "Australia" -> "AU")
    const geoCountries = parseCountryCodes(offer.geo);
    return geoCountries.includes(userCountry);
  };

  const parseCountryCodes = (geoString: string): string[] => {
    const countryMap: Record<string, string> = {
      'United Kingdom': 'GB',
      'United States': 'US',
      'Australia': 'AU',
      'Canada': 'CA',
      'Germany': 'DE',
      'India': 'IN',
      'france': 'FR',
      'spain': 'ES',
      'italy': 'IT',
      'netherlands': 'NL',
      'belgium': 'BE',
      'sweden': 'SE',
      'norway': 'NO',
      'ireland': 'IE',
    };

    for (const [country, code] of Object.entries(countryMap)) {
      if (geoString.toLowerCase().includes(country.toLowerCase())) {
        return [code];
      }
    }
    return [];
  };

  // Filter offers based on search term
  const filteredOffers = offers.filter(
    (offer) =>
      offer.offerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.geo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate available and restricted offers
  const availableOffers = filteredOffers.filter((o) => isOfferAvailable(o));
  const restrictedOffers = filteredOffers.filter((o) => !isOfferAvailable(o));

  if (restrictedOffers.length > 0 && availableOffers.length === 0) {
    setShowGeoWarning(true);
  }

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
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#1F1A17] to-[#3D3531] text-white py-12 px-4 md:py-16">
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
            className="text-lg text-gray-200"
          >
            Discover the best casino and betting offers for your region
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Country Detection Info */}
        {userCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <Globe size={18} className="text-blue-600" />
            <p className="text-sm text-blue-800">
              Showing offers available for <strong>{userCountry}</strong>
            </p>
          </motion.div>
        )}

        {/* Search Section */}
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

        {/* Geo Warning Alert */}
        {showGeoWarning && userCountry && restrictedOffers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 mb-8 flex gap-3"
          >
            <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-900 font-semibold">Limited Offers Available</p>
              <p className="text-amber-800 text-sm mt-1">
                {restrictedOffers.length} offer{restrictedOffers.length !== 1 ? 's' : ''} are not available in your country ({userCountry.toUpperCase()}). We're showing available options below.
              </p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
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

        {/* Offers List */}
        {!loading && offers.length > 0 && (
          <>
            {/* Available Offers */}
            {availableOffers.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-8"
              >
                {availableOffers.map((offer) => (
                  <motion.div key={offer._id} variants={itemVariants}>
                    <OfferCard offer={offer} userCountry={userCountry || undefined} geoRestricted={false} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Restricted Offers */}
            {restrictedOffers.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <AlertCircle size={24} className="text-amber-600" />
                  Not Available in Your Region
                </h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 opacity-60"
                >
                  {restrictedOffers.map((offer) => (
                    <motion.div key={offer._id} variants={itemVariants}>
                      <OfferCard
                        offer={offer}
                        userCountry={userCountry || undefined}
                        geoRestricted={true}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* No Results */}
            {filteredOffers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-600">
                  No offers found matching your search.
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
              <h3 className="text-lg font-semibold text-red-600 mb-2 font-poppins">
                Curated Selection
              </h3>
              <p className="text-gray-700">
                We carefully select the best casino and betting platforms for our users.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2 font-poppins">
                Region-Specific
              </h3>
              <p className="text-gray-700">
                Find offers specifically tailored to your country and region.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2 font-poppins">
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
