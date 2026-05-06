import { motion } from "framer-motion";
import { Star, Check, ExternalLink } from "lucide-react";

export interface BonusCardProps {
  rank?: number;
  initials: string;
  name: string;
  reviews: number;
  rating: number;
  bonusTitle: string;
  bonusDetail?: string;
  wagering: string;
  minDeposit: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

export default function BonusCard({
  rank,
  initials,
  name,
  reviews,
  rating,
  bonusTitle,
  bonusDetail,
  wagering,
  minDeposit,
  features,
  featured,
  badge,
}: BonusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -3, boxShadow: "0 0 30px rgba(217,119,6,0.12)" }}
      className="group relative bg-[#111009] border border-white/8 rounded-xl p-5 flex flex-col items-center gap-4 transition-all duration-300 hover:border-[#D97706]/30 w-full max-w-xs"
    >
      {rank && (
        <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#D97706] text-[#0B0A09] text-xs font-bold flex items-center justify-center shadow-lg">
          {rank}
        </div>
      )}
      {featured && (
        <div className="absolute top-3 right-3 bg-[#D97706]/10 border border-[#D97706]/30 text-[#D97706] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
          Featured
        </div>
      )}

      {/* Logo */}
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D97706]/20 to-[#1B3950]/40 border border-white/10 flex items-center justify-center font-bold text-[#D97706] text-xl font-mono mt-2">
        {initials}
      </div>

      {/* Info - Centered */}
      <div className="flex flex-col items-center text-center w-full">
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <span className="font-semibold text-white text-base">{name}</span>
          {badge && (
            <span className="bg-[#1B3950] text-[#D97706] text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.round(rating) ? "fill-[#D97706] text-[#D97706]" : "fill-white/20 text-white/20"}
              />
            ))}
          </div>
          <span className="text-white/40 text-xs">({reviews.toLocaleString()})</span>
        </div>

        {/* Bonus Offer Box */}
        <div className="w-full mb-4 p-3 bg-[#1B3950]/40 border border-[#D97706]/30 rounded-lg">
          <div className="text-[10px] text-[#D97706] font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22v-7"/><path d="M7 12c0-1.657.895-3 2-3s2 1.343 2 3"/><path d="M17 12c0-1.657.895-3 2-3s2 1.343 2 3"/></svg>
            Bonus offer
          </div>
          <div className="text-white text-lg font-bold">{bonusTitle}</div>
        </div>

        <div className="text-white/60 text-xs mb-3 min-h-[30px]">{bonusDetail}</div>

        <div className="flex flex-col gap-2 w-full text-xs text-white/50 mb-3">
          <div className="flex justify-between">
            <span>Wagering:</span>
            <span className="text-white/70 font-semibold">{wagering}</span>
          </div>
          <div className="flex justify-between">
            <span>Min deposit:</span>
            <span className="text-white/70 font-semibold">{minDeposit}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full mb-4">
          {features.map((f) => (
            <span key={f} className="flex items-center justify-center gap-1.5 text-xs text-white/50">
              <Check size={10} className="text-[#D97706] flex-shrink-0" />
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-2 w-full">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="w-full px-4 py-2.5 bg-[#D97706] text-[#0B0A09] rounded-lg text-sm font-bold hover:bg-[#DC6803] transition-colors shadow-[0_0_16px_rgba(217,119,6,0.2)] flex items-center justify-center gap-1.5"
          data-testid={`button-claim-${name.toLowerCase().replace(/\s+/g, "-")}`}
        >
          Claim Bonus
          <ExternalLink size={12} />
        </motion.button>
        <span className="text-white/30 text-[10px]">T&Cs Apply. 18+</span>
      </div>
    </motion.div>
  );
}
