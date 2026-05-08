import { useState } from "react";
import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#F3F1EA] text-[#1F1A17]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" data-testid="link-logo">
              <div className="flex items-center gap-3 group cursor-pointer">
                {!logoError ? (
                  <img
                    src="/logo.png"
                    alt="BetVoxa"
                    onError={() => setLogoError(true)}
                    className="h-39 w-auto rounded-md object-contain group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-10 h-10 bg-[#F1C40F] rounded flex items-center justify-center text-black font-bold">B</div>
                )}
              </div>
            </Link>
            <p className="text-[#5A5450] text-sm max-w-sm">Your trusted source for the best betting and casino offers worldwide.</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F1A17] mb-4">Quick links</h4>
            <ul className="space-y-3 text-[#5A5450] text-sm">
              <li><Link href="/" className="hover:text-[#2563EB]">Home</Link></li>
              <li><Link href="/casino-bonuses" className="hover:text-[#2563EB]">Casino bonuses</Link></li>
              <li><Link href="/betting-sites" className="hover:text-[#2563EB]">Betting sites</Link></li>
              <li><Link href="/casinos" className="hover:text-[#2563EB]">Offers</Link></li>
              <li><Link href="/blog" className="hover:text-[#2563EB]">Blog</Link></li>
            </ul>
          </div>

          {/* Countries */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F1A17] mb-4">Countries</h4>
            <ul className="space-y-3 text-[#5A5450] text-sm">
              <li><Link href="/country/united-kingdom" className="hover:text-[#2563EB]">United Kingdom</Link></li>
              <li><Link href="/country/united-states" className="hover:text-[#2563EB]">United States</Link></li>
              <li><Link href="/country/australia" className="hover:text-[#2563EB]">Australia</Link></li>
              <li><Link href="/country/canada" className="hover:text-[#2563EB]">Canada</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F1A17] mb-4">Legal</h4>
            <ul className="space-y-3 text-[#5A5450] text-sm">
              <li><Link href="/privacy" className="hover:text-[#2563EB]">Privacy policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-[#2563EB]">Terms & conditions</Link></li>
              <li><Link href="/responsible-gambling" className="hover:text-[#2563EB]">Responsible gambling</Link></li>
            </ul>
          </div>
        </div>

        <div className="my-8 border-t border-[#E6DDD6]" />

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FEF4E9] border border-[#2563EB] rounded-lg p-4 flex items-start gap-4">
            <div className="mt-0">
              <AlertTriangle size={20} className="text-[#2563EB]" />
            </div>
            <div>
              <div className="font-semibold text-[#1F1A17]">Responsible gambling</div>
              <div className="text-[#5A5450] text-sm">Gambling can be addictive. Please play responsibly. 18+ only. BeGambleAware.org</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#7A6F69] text-sm">© {new Date().getFullYear()} BetVoxa. All rights reserved.</div>
          <div className="text-[#7A6F69] text-sm">Affiliate disclosure: We may earn commission from operators featured on this site. This does not influence our reviews.</div>
        </div>
      </div>
    </footer>
  );
}

