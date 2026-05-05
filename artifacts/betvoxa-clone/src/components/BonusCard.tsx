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
      whileHover={{ y: -3, boxShadow: "0 0 30px rgba(224,174,46,0.12)" }}
      className="group relative bg-[#111009] border border-white/8 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-300 hover:border-[#E0AE2E]/30"
    >
      {rank && (
        <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#E0AE2E] text-[#0B0A09] text-xs font-bold flex items-center justify-center shadow-lg">
          {rank}
        </div>
      )}
      {featured && (
        <div className="absolute top-3 right-3 bg-[#E0AE2E]/10 border border-[#E0AE2E]/30 text-[#E0AE2E] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
          Featured
        </div>
      )}

      {/* Logo */}
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#E0AE2E]/20 to-[#1B3950]/40 border border-white/10 flex items-center justify-center font-bold text-[#E0AE2E] text-lg font-mono">
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-white text-base">{name}</span>
          {badge && (
            <span className="bg-[#1B3950] text-[#E0AE2E] text-[10px] font-bold uppercase px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.round(rating) ? "fill-[#E0AE2E] text-[#E0AE2E]" : "fill-white/20 text-white/20"}
              />
            ))}
          </div>
          <span className="text-white/40 text-xs">({reviews.toLocaleString()})</span>
        </div>

        <div className="text-[#E0AE2E] font-semibold text-sm mb-1">{bonusTitle}</div>
        {bonusDetail && <div className="text-white/50 text-xs mb-2">{bonusDetail}</div>}

        <div className="flex flex-wrap gap-3 text-xs text-white/50 mb-3">
          <span>Wagering: <span className="text-white/70">{wagering}</span></span>
          <span>Min deposit: <span className="text-white/70">{minDeposit}</span></span>
        </div>

        <div className="flex flex-wrap gap-2">
          {features.map((f) => (
            <span key={f} className="flex items-center gap-1 text-xs text-white/50">
              <Check size={10} className="text-[#E0AE2E]" />
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 flex flex-col items-end gap-2">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2.5 bg-[#E0AE2E] text-[#0B0A09] rounded-lg text-sm font-bold hover:bg-[#f0c040] transition-colors shadow-[0_0_16px_rgba(224,174,46,0.2)] flex items-center gap-1.5"
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
