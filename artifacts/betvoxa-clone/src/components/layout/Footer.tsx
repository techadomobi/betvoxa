import { Link } from "wouter";
import { 
  TrendingUp, DollarSign, Zap, Trophy, Play, Search, BarChart3, Database, Shield, 
  Link as LinkIcon, BarChart2, Lock, AlertCircle, CheckCircle2, Mail, MessageCircle, 
  Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram, HelpCircle, Book, 
  Activity, Code, Briefcase, Heart
} from "lucide-react";

const footerSections = [
  {
    title: "Solutions",
    icon: TrendingUp,
    links: [
      { name: "Increase Website Traffic", icon: TrendingUp },
      { name: "Maximize Affiliate Earnings", icon: DollarSign },
      { name: "Boost E-Commerce Sales", icon: Zap },
      { name: "Elevate Brand Recognition", icon: Trophy },
      { name: "YouTube-SEO", icon: Play },
      { name: "Google Ads", icon: Search },
    ],
  },
  {
    title: "Advertisers",
    icon: BarChart3,
    links: [
      { name: "Programmatic DSP", icon: Database },
      { name: "Advertising Inventory", icon: Shield },
      { name: "Self-Serve or Managed", icon: Zap },
      { name: "Ad Fraud Protection", icon: LinkIcon },
      { name: "Campaign Migration", icon: BarChart2 },
      { name: "Advertising Pricing", icon: DollarSign },
    ],
  },
  {
    title: "Ad Formats",
    icon: Briefcase,
    links: [
      { name: "Pop-under Ads", icon: AlertCircle },
      { name: "Push Notifications", icon: AlertCircle },
      { name: "Display Ads", icon: AlertCircle },
      { name: "Native Ads", icon: CheckCircle2 },
      { name: "Video Ads", icon: Play },
    ],
  },
  {
    title: "Resources",
    icon: Book,
    links: [
      { name: "Support Center", icon: HelpCircle },
      { name: "Knowledge Base", icon: Book },
      { name: "Marketing Blog", icon: Activity },
      { name: "Server Status", icon: Activity },
      { name: "API Access", icon: Code },
    ],
  },
];

const moreLinks = [
  {
    title: "Partnerships",
    links: [
      { name: "Affiliate Program", icon: LinkIcon },
      { name: "Non-Profit Support", icon: Heart },
      { name: "Influencer Program", icon: Trophy },
      { name: "White Label DSP", icon: Briefcase },
    ],
  },
  {
    title: "Publishers",
    links: [
      { name: "Website Monetization", icon: LinkIcon },
      { name: "App Monetization", icon: AlertCircle },
      { name: "SSP Integration", icon: Code },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Refund Policy", icon: AlertCircle },
      { name: "Terms of Service", icon: Book },
      { name: "Privacy Policy", icon: Lock },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Money-Back Guarantee", icon: Trophy },
      { name: "About BetVoxa", icon: AlertCircle },
      { name: "Jobs and Careers", icon: Briefcase },
      { name: "Contact Us", icon: Mail },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#F97316] font-serif mb-2">BetVoxa</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your trusted guide to betting and casino offers worldwide.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-[#1F1A17] font-semibold text-sm mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-[#F97316]" />
                Questions? Get in Touch
              </h4>
              <div className="flex gap-3">
                <button className="p-2 text-gray-400 hover:text-[#F97316] transition-colors hover:bg-gray-100 rounded-lg">
                  <MessageCircle size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#F97316] transition-colors hover:bg-gray-100 rounded-lg">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#F97316] transition-colors hover:bg-gray-100 rounded-lg">
                  <MapPin size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#F97316] transition-colors hover:bg-gray-100 rounded-lg">
                  <Mail size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-[#F97316] transition-colors hover:bg-gray-100 rounded-lg">
                  <HelpCircle size={18} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-[#1F1A17] font-semibold text-sm mb-3">Connect on Social Media</h4>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                  <button key={i} className="p-2 text-gray-400 hover:text-[#F97316] transition-colors hover:bg-gray-100 rounded-lg">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section, idx) => {
            const IconComponent = section.icon;
            return (
              <div key={idx} className="flex flex-col">
                <h4 className="text-[#F97316] font-bold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
                  <IconComponent size={16} />
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIdx) => {
                    const LinkIcon = link.icon;
                    return (
                      <li key={linkIdx}>
                        <Link href="#">
                          <span className="text-gray-700 hover:text-[#F97316] text-sm flex items-center gap-2 transition-colors group">
                            <LinkIcon size={14} className="text-gray-400 group-hover:text-[#F97316]" />
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Links Grid */}
        <div className="border-t border-gray-200 pt-12 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {moreLinks.map((section, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="text-[#F97316] font-bold text-sm mb-4 uppercase tracking-wide">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIdx) => {
                    const LinkIcon = link.icon;
                    return (
                      <li key={linkIdx}>
                        <Link href="#">
                          <span className="text-gray-700 hover:text-[#F97316] text-sm flex items-center gap-2 transition-colors group">
                            <LinkIcon size={14} className="text-gray-400 group-hover:text-[#F97316]" />
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Address Section */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-[#1F1A17] font-bold text-sm mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-[#F97316]" />
                Our Address
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                5th Floor, DLF Two Horizon Centre, Harizan Colony, DLF Phase 5, Sector 43, Gurugram, Haryana 122002
              </p>
            </div>
            <div>
              <h4 className="text-[#1F1A17] font-bold text-sm mb-3 flex items-center gap-2">
                <Mail size={16} className="text-[#F97316]" />
                Email Us
              </h4>
              <p className="text-[#F97316] text-sm hover:text-[#DC6803] transition-colors cursor-pointer">
                support@betvoxa.com
              </p>
            </div>
          </div>
        </div>

        {/* Responsible Gambling & Copyright */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} BetVoxa. All rights reserved. For entertainment purposes only.
          </p>
          <p className="text-gray-600 text-xs max-w-2xl text-center sm:text-right">
            <strong>Responsible Gambling:</strong> Gambling should be fun. If you have concerns, visit GamCare, BeGambleAware, or Gamblers Anonymous. Must be 18+ to bet.
          </p>
        </div>
      </div>
    </footer>
  );
}
