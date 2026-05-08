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
    <div className="w-full mb-4 overflow-hidden rounded-2xl border border-[#d8e7f7] bg-white text-[#1F1A17] shadow-[0_18px_50px_rgba(37,99,235,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(37,99,235,0.12)]">
      {/* Mobile Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section - Logo with Category Badge */}
        <div className="relative w-full md:w-2/5 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_55%),linear-gradient(180deg,#f7fbff,#eef6ff)]">
          {/* Category Badge - Red Ribbon on Left */}
          <div className="absolute top-0 left-0 bg-[#2563EB] text-white px-3 py-2 font-bold text-xs md:text-sm z-10 whitespace-nowrap transform -rotate-45 -translate-x-12 translate-y-4 origin-left md:rotate-0 md:translate-x-0 md:translate-y-0 md:transform-none md:w-full md:rounded-none md:px-4 md:py-2 shadow-[0_0_16px_rgba(37,99,235,0.16)]">
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
          <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:p-3 md:border-t md:border-[#d8e7f7]">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < starCount
                      ? 'fill-[#2563EB] text-[#2563EB]'
                      : i < starCount + (hasHalfStar ? 1 : 0)
                      ? 'fill-[#2563EB] text-[#2563EB] opacity-50'
                      : 'text-[#D4D0C8]'
                  }
                />
              ))}
            </div>
            <p className="text-sm text-[#6F665D] font-semibold">{rating}</p>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-3/5 p-4 md:p-6 flex flex-col justify-between bg-white">
          {/* Small Label */}
          <p className="text-[#6F665D] text-xs md:text-sm uppercase tracking-[0.18em] mb-1 md:mb-2">
            Welcome Bonus
          </p>

          {/* Main Bonus Text - Large and Bold */}
          <div className="mb-3 md:mb-4">
              <h3 className="text-base md:text-xl font-bold text-[#1F1A17] mb-1 md:mb-2 font-poppins">
              Bonus up to
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-[#2563EB] mb-2">
              {offer.rewardAmount}
            </div>
          </div>

          {/* Descriptions - Show all on mobile */}
          <div className="space-y-2 mb-4 text-xs md:text-sm text-[#5F554C]">
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
            <p className="text-xs font-semibold text-[#6F665D]">({rating})</p>
          </div>

          {/* Geo Info */}
          {userCountry && (
            <div className="mb-3 text-xs">
              <p className="text-[#6F665D]">
                Available in: <span className="font-semibold text-[#1F1A17]">{offer.geo}</span>
              </p>
            </div>
          )}

          {/* Join Button - Full Width on Mobile */}
          <button
            onClick={handleJoinClick}
            disabled={geoRestricted}
            className={`w-full py-2.5 md:py-3 rounded-lg font-bold text-white transition-all duration-200 font-poppins uppercase text-sm md:text-base shadow-[0_0_18px_rgba(37,99,235,0.18)] ${
              geoRestricted
                ? 'bg-[#D4D0C8] cursor-not-allowed opacity-60 text-[#8D847A]'
                : 'bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95'
            }`}
          >
            {geoRestricted ? 'Not Available' : offer.buttonName || 'Join Now'}
          </button>

          {/* T&C Text - Smaller on Mobile */}
            <p className="text-xs text-[#6F665D] mt-2 leading-tight text-center md:text-left">
            18+. New customers only. Min deposit & wagering terms apply. Full T&Cs apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;

