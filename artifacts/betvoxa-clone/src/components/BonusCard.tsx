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
      whileHover={{ y: -3, boxShadow: "0 18px 55px rgba(37,99,235,0.12)" }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-[#d8e7f7] bg-white p-5 text-[#1F1A17] transition-all duration-300 hover:border-[#2563EB]/20"
    >
      {rank && (
        <div className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white shadow-[0_0_16px_rgba(37,99,235,0.22)]">
          {rank}
        </div>
      )}
      {featured && (
        <div className="absolute top-3 right-3 rounded-full border border-[#2563EB]/12 bg-[#2563EB]/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
          Featured
        </div>
      )}

      {/* Header: Name, Rating, Logo */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-[#1F1A17] text-base">{name}</span>
            {badge && (
              <span className="rounded border border-[#2563EB]/12 bg-[#eef6ff] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#2563EB]">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < Math.round(rating) ? "fill-[#2563EB] text-[#2563EB]" : "fill-[#ECE6DB] text-[#D4D0C8]"}
                />
              ))}
            </div>
            <span className="text-[#6F665D] text-xs">({reviews.toLocaleString()})</span>
          </div>
        </div>

        {/* Logo */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-[#d8e7f7] bg-[linear-gradient(135deg,#eef6ff,#ffffff)] text-sm font-bold font-mono text-[#1F1A17]">
          {initials}
        </div>
      </div>

      {/* Bonus Offer Box */}
      <div className="rounded-lg border border-[#2563EB]/12 bg-[#eef6ff] p-3">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift shrink-0"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22v-7"/><path d="M7 12c0-1.657.895-3 2-3s2 1.343 2 3"/><path d="M17 12c0-1.657.895-3 2-3s2 1.343 2 3"/></svg>
          Bonus offer
        </div>
        <div className="text-base font-bold text-[#1F1A17]">{bonusTitle}</div>
      </div>

      {bonusDetail && <div className="text-[#5F554C] text-xs">{bonusDetail}</div>}

      {/* Wagering and Min Deposit */}
      <div className="flex justify-between text-xs text-[#6F665D]">
        <div>
          <div className="text-[#6F665D]">Wagering</div>
          <div className="font-semibold text-[#1F1A17]">{wagering}</div>
        </div>
        <div className="text-right">
          <div className="text-[#6F665D]">Min deposit</div>
          <div className="font-semibold text-[#1F1A17]">{minDeposit}</div>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-1.5">
        {features.map((f) => (
          <span key={f} className="flex items-center gap-1.5 text-xs text-[#5F554C]">
            <Check size={10} className="text-[#2563EB] shrink-0 mt-0.5" />
            {f}
          </span>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-bold text-white shadow-[0_0_18px_rgba(37,99,235,0.2)] transition-colors hover:bg-[#1D4ED8]"
        data-testid={`button-claim-${name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        Claim bonus
        <ExternalLink size={12} />
      </motion.button>
    </motion.div>
  );
}

