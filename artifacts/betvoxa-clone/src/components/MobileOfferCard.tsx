import React from 'react';
import { useLocation } from 'wouter';
import { Star } from 'lucide-react';

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
  t1?: string;
  t2?: string;
}

interface MobileOfferCardProps {
  offer: Offer;
}

const MobileOfferCard: React.FC<MobileOfferCardProps> = ({ offer }) => {
  const [, navigate] = useLocation();
  const rating = parseFloat(offer.rating);
  const starCount = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleJoinClick = () => {
    sessionStorage.setItem('currentOffer', JSON.stringify(offer));
    navigate(`/game/${offer.slug}`);
  };

  return (
    <div className="w-full mb-4 rounded-2xl border border-[#e0d4f7] bg-white text-[#1F1A17] shadow-lg overflow-hidden">
      {/* Category Banner */}
      <div className="bg-gradient-to-r from-[#c41e3a] to-[#a01830] text-white px-4 py-2 font-bold text-xs uppercase tracking-wider">
        {offer.categoryName === 'Games' ? '🔥 HOT & TRENDING' : '⭐ MOST GENEROUS BONUS'}
      </div>

      {/* Main Content - Flex Row */}
      <div className="flex gap-4 p-4">
        {/* Left: Logo */}
        <div className="w-20 h-20 flex-shrink-0">
          <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#f0e5ff] to-[#e8d4ff] flex items-center justify-center border border-[#d4b5ff]">
            <img
              src={offer.image}
              alt={offer.offerName}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/80x80?text=' + offer.offerName;
              }}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Title and Bonus */}
          <div>
            <h3 className="text-sm font-bold text-[#1F1A17] mb-1 line-clamp-1">
              {offer.offerName}
            </h3>

            {/* Bonus Amount - Large */}
            <p className="text-2xl font-bold text-[#c41e3a] mb-1">
              Win up to {offer.rewardAmount}
            </p>

            {/* Bonus Description */}
            <p className="text-xs text-[#6F665D] line-clamp-2">
              {offer.description1}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
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
            <span className="text-xs font-semibold text-[#6F665D]">{rating}</span>
          </div>
        </div>
      </div>

      {/* Info Row */}
      <div className="px-4 py-2 bg-[#f8f6ff] border-t border-[#e8d4ff] flex items-center justify-between text-xs">
        <span className="text-[#6F665D]">
          <span className="font-semibold">18+</span> New customers only
        </span>
        <button
          onClick={handleJoinClick}
          className="bg-gradient-to-r from-[#c41e3a] to-[#a01830] hover:from-[#b01830] hover:to-[#901820] text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 active:scale-95 text-xs shadow-md hover:shadow-lg"
        >
          {offer.buttonName || 'GET BONUS'}
        </button>
      </div>

      {/* Terms Text */}
      <div className="px-4 py-2 text-xs text-[#9a8fa0] leading-tight bg-white">
        Min deposit & wagering terms apply. Full T&Cs apply.
      </div>
    </div>
  );
};

export default MobileOfferCard;
