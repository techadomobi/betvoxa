import React from 'react';
import { Star } from 'lucide-react';

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

interface OfferCardProps {
  offer: Offer;
  userCountry?: string;
  geoRestricted?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, userCountry, geoRestricted = false }) => {
  const rating = parseFloat(offer.rating);
  const starCount = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleJoinClick = () => {
    if (!geoRestricted) {
      window.open(offer.trackingLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Get category badge label
  const categoryBadge = offer.categoryName || 'FEATURED';

  return (
    <div className="w-full mb-4 overflow-hidden rounded-2xl border border-[#1C2B45] bg-[linear-gradient(180deg,rgba(11,17,32,1),rgba(15,23,36,1))] text-[#F4F8FC] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(37,99,235,0.16)]">
      {/* Mobile Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section - Logo with Category Badge */}
        <div className="relative w-full md:w-2/5 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_55%),linear-gradient(180deg,#071122,#0B1220)]">
          {/* Category Badge - Red Ribbon on Left */}
          <div className="absolute top-0 left-0 bg-[#2563EB] text-white px-3 py-2 font-bold text-xs md:text-sm z-10 whitespace-nowrap transform -rotate-45 -translate-x-12 translate-y-4 origin-left md:rotate-0 md:translate-x-0 md:translate-y-0 md:transform-none md:w-full md:rounded-none md:px-4 md:py-2 shadow-[0_0_16px_rgba(37,99,235,0.25)]">
            {categoryBadge}
          </div>

          {/* Logo Image Container */}
          <div className="relative h-40 md:h-full md:min-h-56 flex items-center justify-center p-4 pt-6 md:pt-4">
            <img
              src={offer.image}
              alt={offer.offerName}
              className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/200x150?text=' + offer.offerName;
              }}
            />
          </div>

          {/* Rating Below Image - Mobile Hidden, Desktop Visible */}
          <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:p-3 md:border-t md:border-[#162233]">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < starCount
                      ? 'fill-yellow-400 text-yellow-400'
                      : i < starCount + (hasHalfStar ? 1 : 0)
                      ? 'fill-yellow-400 text-yellow-400 opacity-50'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <p className="text-sm text-[#9AA6B8] font-semibold">{rating}</p>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-3/5 p-4 md:p-6 flex flex-col justify-between bg-[linear-gradient(180deg,rgba(15,23,36,0.95),rgba(7,17,34,0.98))]">
          {/* Small Label */}
          <p className="text-[#9DB3C9] text-xs md:text-sm uppercase tracking-[0.18em] mb-1 md:mb-2">
            Welcome Bonus
          </p>

          {/* Main Bonus Text - Large and Bold */}
          <div className="mb-3 md:mb-4">
            <h3 className="text-base md:text-xl font-bold text-[#F4F8FC] mb-1 md:mb-2 font-poppins">
              Bonus up to
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-[#FFD54A] mb-2">
              {offer.rewardAmount}
            </div>
          </div>

          {/* Descriptions - Show all on mobile */}
          <div className="space-y-2 mb-4 text-xs md:text-sm text-[#C7D5E6]">
            <p className="leading-tight">{offer.description1}</p>
            <p className="leading-tight">{offer.description2}</p>
            <p className="hidden md:block leading-tight">{offer.description3}</p>
          </div>

          {/* Rating on Mobile */}
          <div className="md:hidden flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < starCount
                      ? 'fill-yellow-400 text-yellow-400'
                      : i < starCount + (hasHalfStar ? 1 : 0)
                      ? 'fill-yellow-400 text-yellow-400 opacity-50'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <p className="text-xs font-semibold text-[#9DB3C9]">({rating})</p>
          </div>

          {/* Geo Info */}
          {userCountry && (
            <div className="mb-3 text-xs">
              <p className="text-[#9AA6B8]">
                Available in: <span className="font-semibold text-gray-700">{offer.geo}</span>
              </p>
            </div>
          )}

          {/* Join Button - Full Width on Mobile */}
          <button
            onClick={handleJoinClick}
            disabled={geoRestricted}
            className={`w-full py-2.5 md:py-3 rounded-lg font-bold text-white transition-all duration-200 font-poppins uppercase text-sm md:text-base shadow-[0_0_18px_rgba(37,99,235,0.18)] ${
              geoRestricted
                ? 'bg-gray-400 cursor-not-allowed opacity-60'
                : 'bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95'
            }`}
          >
            {geoRestricted ? 'Not Available' : offer.buttonName || 'Join Now'}
          </button>

          {/* T&C Text - Smaller on Mobile */}
            <p className="text-xs text-[#9DB3C9] mt-2 leading-tight text-center md:text-left">
            18+. New customers only. Min deposit & wagering terms apply. Full T&Cs apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;

