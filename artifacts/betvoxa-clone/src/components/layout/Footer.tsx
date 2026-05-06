import { Link } from "wouter";
import { Shield, Lock, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080706] border-t border-white/5 pt-16 pb-8 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#D97706] rounded-md flex items-center justify-center font-bold text-[#0B0A09] text-sm">
                B
              </div>
              <span className="font-serif text-xl font-bold text-white">BetVoxa</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Your trusted guide to the world's best betting and casino offers. We compare, review, and verify every operator so you can bet with confidence.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 bg-white/5 rounded-md px-3 py-1.5 border border-white/10">
                <Lock size={12} className="text-[#D97706]" />
                <span className="text-xs text-white/60">SSL Secured</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 rounded-md px-3 py-1.5 border border-white/10">
                <Shield size={12} className="text-[#D97706]" />
                <span className="text-xs text-white/60">Licensed Only</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 rounded-md px-3 py-1.5 border border-white/10">
                <Award size={12} className="text-[#D97706]" />
                <span className="text-xs text-white/60">Expert Reviews</span>
              </div>
            </div>
          </div>

          {/* Casino */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Casino</h4>
            <ul className="space-y-2.5">
              {["Casino Bonuses", "Free Spins", "No Deposit Bonuses", "VIP Programs", "Live Casino"].map((item) => (
                <li key={item}>
                  <Link href="/casino-bonuses">
                    <span className="text-white/50 hover:text-[#D97706] text-sm transition-colors cursor-pointer">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Sports</h4>
            <ul className="space-y-2.5">
              {["Betting Sites", "Football Betting", "Horse Racing", "Tennis Betting", "Cricket Betting"].map((item) => (
                <li key={item}>
                  <Link href="/betting-sites">
                    <span className="text-white/50 hover:text-[#D97706] text-sm transition-colors cursor-pointer">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Countries</h4>
            <ul className="space-y-2.5">
              {[
                { name: "United Kingdom", code: "united-kingdom" },
                { name: "United States", code: "united-states" },
                { name: "Australia", code: "australia" },
                { name: "Canada", code: "canada" },
                { name: "Germany", code: "germany" },
              ].map((c) => (
                <li key={c.code}>
                  <Link href={`/country/${c.code}`}>
                    <span className="text-white/50 hover:text-[#D97706] text-sm transition-colors cursor-pointer">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Responsible Gambling */}
        <div className="py-6 border-b border-white/5">
          <p className="text-white/30 text-xs leading-relaxed max-w-4xl">
            <strong className="text-white/50">Responsible Gambling:</strong> Gambling should be entertaining. If you feel you may have a gambling problem, please seek help.
            Resources are available at <span className="text-[#D97706]/70">GamCare</span>, <span className="text-[#D97706]/70">BeGambleAware</span>, and <span className="text-[#D97706]/70">Gamblers Anonymous</span>.
            BetVoxa only recommends licensed and regulated operators. Must be 18+ to bet. Please gamble responsibly.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2025 BetVoxa. All rights reserved. For entertainment purposes only.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <span key={item} className="text-white/30 hover:text-white/60 text-xs cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
