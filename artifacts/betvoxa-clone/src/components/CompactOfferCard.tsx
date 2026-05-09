import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

interface Offer {
  _id: string;
  offerName: string;
  image: string;
  description1: string;
  description2?: string;
  description3?: string;
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

interface CompactOfferCardProps {
  offer: Offer;
  userCountry?: string;
  geoRestricted?: boolean;
}

const CompactOfferCard: React.FC<CompactOfferCardProps> = ({ offer, userCountry, geoRestricted = false }) => {
  const rating = parseFloat(offer.rating);
  const starCount = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleJoinClick = () => {
    if (!geoRestricted) {
      window.open(offer.trackingLink, '_blank', 'noopener,noreferrer');
    }
  };

  const categoryBadge = offer.categoryName || 'FEATURED';

  return (
    <div className="h-full overflow-hidden rounded-xl border border-[#d8e7f7] bg-white text-[#1F1A17] shadow-[0_18px_50px_rgba(37,99,235,0.08)] transition-all duration-300 hover:shadow-[0_24px_70px_rgba(37,99,235,0.12)] hover:-translate-y-1 flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-40 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_55%),linear-gradient(180deg,#f7fbff,#eef6ff)] flex items-center justify-center overflow-hidden">
        {/* Category Badge */}
        <div className="absolute top-2 right-2 bg-[#2563EB] text-white px-2 py-1 rounded text-xs font-bold z-10 shadow-[0_0_12px_rgba(37,99,235,0.16)]">
          {categoryBadge}
        </div>

        {/* Logo Image */}
        <img
          src={offer.image}
          alt={offer.offerName}
          className="max-h-32 max-w-full object-contain hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/200x100?text=' + offer.offerName;
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Offer Name */}
        <h3 className="text-base font-bold text-[#1F1A17] mb-2 line-clamp-2">
          {offer.offerName}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
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
          <span className="text-xs font-semibold text-[#6F665D]">{rating}</span>
        </div>

        {/* Reward Amount */}
        <div className="mb-3">
          <p className="text-xs text-[#6F665D] uppercase tracking-wider mb-1">Bonus</p>
          <p className="text-xl font-bold text-[#2563EB]">{offer.rewardAmount}</p>
        </div>

        {/* Description */}
        <p className="text-xs text-[#5F554C] mb-3 line-clamp-2 flex-1">
          {offer.description1}
        </p>

        {/* Geo & Button Container */}
        <div className="space-y-2">
          {offer.geo && (
            <p className="text-xs text-[#6F665D]">
              <span className="font-semibold">📍 {offer.geo}</span>
            </p>
          )}

          {/* Join Button */}
          <button
            onClick={handleJoinClick}
            disabled={geoRestricted}
            className={`w-full py-2 rounded-lg font-bold text-white text-xs transition-all duration-200 uppercase shadow-[0_0_12px_rgba(37,99,235,0.16)] ${
              geoRestricted
                ? 'bg-[#D4D0C8] cursor-not-allowed opacity-60 text-[#8D847A]'
                : 'bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95'
            }`}
          >
            {geoRestricted ? 'Not Available' : offer.buttonName || 'Join Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompactOfferCard;
