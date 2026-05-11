import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Star, ChevronLeft, Trophy } from 'lucide-react';

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

const GameDetail: React.FC = () => {
  const params = useParams() as { slug: string };
  const [location, navigate] = useLocation();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get offer from sessionStorage (passed via navigation)
    const storedOffer = sessionStorage.getItem('currentOffer');
    if (storedOffer) {
      try {
        const parsedOffer = JSON.parse(storedOffer);
        setOffer(parsedOffer);
      } catch (e) {
        setError('Failed to load offer');
      }
    } else {
      setError('Offer details not found');
    }
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a3e] to-[#0f0f2e] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a3e] to-[#0f0f2e] flex flex-col items-center justify-center px-4">
        <div className="text-white text-lg mb-4">{error || 'Offer not found'}</div>
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  const handlePlayClick = () => {
    window.open(offer.trackingLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a3e] to-[#0f0f2e] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#16152b]/95 backdrop-blur border-b border-[#2563EB]/20 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ChevronLeft size={24} />
          <span className="text-xs font-semibold">Back</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xs text-[#a0a0b8]">Points</div>
            <div className="text-lg font-bold text-yellow-400">0 $.</div>
          </div>
          <Trophy size={24} className="text-yellow-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Game Card */}
        <div className="rounded-2xl border border-[#2563EB]/20 bg-gradient-to-br from-[#1f1f45] to-[#16152b] p-6 mb-6 shadow-2xl">
          {/* Image */}
          <div className="w-full h-48 rounded-xl overflow-hidden mb-6 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.2),transparent_60%)] flex items-center justify-center border border-[#2563EB]/20">
            <img
              src={offer.image}
              alt={offer.offerName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/300x200?text=' + offer.offerName;
              }}
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-2">{offer.offerName}</h1>

          {/* Reward Amount */}
          <div className="mb-4">
            <p className="text-4xl font-bold text-yellow-400 mb-1">
              Win $. {offer.rewardAmount}
            </p>
            <p className="text-sm text-green-400">
              ✓ Winner announcement available
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#2563EB]/20">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < Math.floor(parseFloat(offer.rating))
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-bold">{offer.rating}</span>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-6">
            <p className="text-base text-[#d0d0e8] leading-relaxed">
              {offer.t1 || offer.description1}
            </p>
            {offer.description2 && (
              <p className="text-base text-[#d0d0e8] leading-relaxed">
                {offer.description2}
              </p>
            )}
          </div>

          {/* Entry Info */}
          <div className="bg-[#1a1a3e]/50 rounded-lg p-4 mb-6 border border-[#2563EB]/10">
            <p className="text-sm text-[#a0a0b8]">
              <span className="font-semibold">ENTRY:</span>{' '}
              <span className="text-yellow-400 font-bold">FREE</span>
            </p>
            <p className="text-sm text-[#a0a0b8] mt-2">
              <span className="font-semibold">LOCATION:</span>{' '}
              <span className="font-bold">{offer.geo}</span>
            </p>
          </div>

          {/* Play Button */}
          <button
            onClick={handlePlayClick}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 active:scale-95 text-lg shadow-lg hover:shadow-xl"
          >
            PLAY NOW
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#16152b]/50 rounded-xl p-6 border border-[#2563EB]/10 text-center">
          <p className="text-xs text-[#a0a0b8] leading-relaxed mb-3">
            <span className="font-semibold">Disclaimer:</span> This quiz game and content on this page is published in good faith
            for entertainment and general information purposes only. The points won in the quizzes have no real money value. It can't be converted
            into money.
          </p>
          <p className="text-xs text-[#8a8a9a]">
            © 2026 GameHub. All rights reserved.
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-[#1a1a3e]/30 rounded-lg p-4 border border-[#2563EB]/10">
          <h3 className="text-sm font-bold text-white mb-2">About this game:</h3>
          <p className="text-xs text-[#a0a0b8] leading-relaxed">
            {offer.description3 || offer.description2 || 'An exciting gaming experience with thrilling rewards and entertainment.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
