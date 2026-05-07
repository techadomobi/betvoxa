import React from 'react';
import { Star, MapPin, Gift } from 'lucide-react';

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

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const rating = parseFloat(offer.rating);
  const starCount = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleJoinClick = () => {
    window.open(offer.trackingLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={offer.image}
          alt={offer.offerName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/400x200?text=' + offer.offerName;
          }}
        />
        {/* Reward Badge */}
        <div className="absolute top-3 right-3 bg-[#F97316] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Gift size={16} />
          ${offer.rewardAmount}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col h-full">
        {/* Title */}
        <h3 className="text-lg font-bold text-[#1F1A17] mb-2 font-poppins">
          {offer.offerName}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < starCount
                    ? 'fill-[#F97316] text-[#F97316]'
                    : i < starCount + (hasHalfStar ? 1 : 0)
                    ? 'fill-[#F97316] text-[#F97316] opacity-50'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-600">{rating}</span>
        </div>

        {/* Geo */}
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <MapPin size={16} className="text-[#F97316]" />
          <span>{offer.geo.trim()}</span>
        </div>

        {/* Descriptions */}
        <div className="space-y-2 mb-4 grow">
          <p className="text-sm text-gray-700">{offer.description1}</p>
          <p className="text-sm text-gray-700">{offer.description2}</p>
          <p className="text-sm text-gray-700">{offer.description3}</p>
        </div>

        {/* Join Button */}
        <button
          onClick={handleJoinClick}
          className="w-full bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 font-poppins mt-auto"
        >
          {offer.buttonName}
        </button>

        {/* SEO Title Tooltip Hint */}
        <p className="text-xs text-gray-400 mt-2 truncate" title={offer.seoTitle}>
          {offer.seoTitle}
        </p>
      </div>
    </div>
  );
};

export default OfferCard;
