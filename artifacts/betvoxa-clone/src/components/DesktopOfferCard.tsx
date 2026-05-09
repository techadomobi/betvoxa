import React from 'react';
import { Star, Radio } from 'lucide-react';

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
}

interface DesktopOfferCardProps {
  offer: Offer;
}

const DesktopOfferCard: React.FC<DesktopOfferCardProps> = ({ offer }) => {
  const handleJoinClick = () => {
    window.open(offer.trackingLink, '_blank', 'noopener,noreferrer');
  };

  // Simulated user count for LIVE status
  const userCount = Math.floor(Math.random() * 10000) + 1000;

  return (
    <div className="w-full rounded-2xl border border-[#d8e7f7] bg-gradient-to-br from-[#1a1a3e] to-[#0f0f2e] text-white shadow-[0_18px_50px_rgba(37,99,235,0.15)] transition-all duration-300 hover:shadow-[0_24px_70px_rgba(37,99,235,0.2)] p-6 flex gap-6">
      {/* Left: Image Container */}
      <div className="w-32 h-32 flex-shrink-0">
        <div className="w-full h-full rounded-xl overflow-hidden bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.2),transparent_60%)] flex items-center justify-center border border-[#2563EB]/30">
          <img
            src={offer.image}
            alt={offer.offerName}
            className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/128x128?text=' + offer.offerName;
            }}
          />
        </div>
      </div>

      {/* Right: Content Container */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Top: Title and Status */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-xs font-bold text-green-400">
              <Radio size={10} className="fill-green-400 animate-pulse" />
              LIVE
            </div>
            <span className="text-xs text-[#a0a0b8]">{userCount.toLocaleString()} Users</span>
          </div>

          {/* Offer Name */}
          <h3 className="text-xl font-bold text-white mb-1">{offer.offerName}</h3>

          {/* Reward Amount - Large and Yellow */}
          <div className="mb-2">
            <p className="text-3xl font-bold text-yellow-400">
              Win PT. {offer.rewardAmount}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs text-[#b0b0c8] mb-3">
            {offer.t1 || offer.description1}
          </p>
        </div>

        {/* Bottom: Entry Info and Button */}
        <div className="flex items-center justify-between">
          <div className="text-xs">
            <span className="text-[#b0b0c8]">ENTRY : </span>
            <span className="font-bold text-yellow-400">FREE</span>
          </div>

          <button
            onClick={handleJoinClick}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-8 rounded-lg transition-all duration-200 active:scale-95 text-sm shadow-lg hover:shadow-xl"
          >
            PLAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopOfferCard;
