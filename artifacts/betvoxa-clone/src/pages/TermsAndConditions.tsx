import { motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  FileText,
  Globe,
  Info,
  Lock,
  Mail,
  Scale,
  Shield,
  TriangleAlert,
} from "lucide-react";

export default function TermsAndConditions() {
  const sections = [
    {
      icon: CheckCircle2,
      title: "1. Acceptance of Terms",
      body: [
        "By accessing or using BetVoxa, you agree to these Terms & Conditions and all applicable laws.",
        "If you do not agree with any part of these terms, please discontinue use of the website.",
      ],
    },
    {
      icon: Info,
      title: "2. Service Scope",
      body: [
        "BetVoxa is an informational and marketing platform that publishes bonus offers, reviews, and comparisons.",
        "We do not operate gambling services, process bets, hold user funds, or manage player accounts.",
      ],
    },
    {
      icon: Globe,
      title: "3. Third-Party Websites",
      body: [
        "Our content may contain links to third-party operators and partners.",
        "Your relationship with those services is independent from BetVoxa and governed by their own policies.",
        "BetVoxa is not responsible for third-party losses, account restrictions, payout disputes, or policy changes.",
      ],
    },
    {
      icon: Shield,
      title: "4. Eligibility and Legal Use",
      body: [
        "You confirm that you are of legal gambling age in your jurisdiction and that online gambling is lawful where you reside.",
        "It is your responsibility to verify local regulations before registering or depositing on any external platform.",
      ],
    },
    {
      icon: BookOpen,
      title: "5. Content and Intellectual Property",
      body: [
        "All text, branding, graphics, and editorial material on BetVoxa are protected intellectual property.",
        "Copying, distributing, modifying, or republishing website content without written permission is prohibited.",
      ],
    },
    {
      icon: TriangleAlert,
      title: "6. No Warranties",
      body: [
        "All information is provided on an as-is and as-available basis.",
        "Bonus details, promotions, and terms may change without notice by third-party operators.",
        "We do not guarantee accuracy, uninterrupted availability, or outcomes associated with any offer.",
      ],
    },
    {
      icon: AlertCircle,
      title: "7. Limitation of Liability",
      body: [
        "To the maximum extent permitted by law, BetVoxa is not liable for direct, indirect, incidental, or consequential damages.",
        "This includes losses resulting from reliance on third-party content, platform outages, or incorrect promotional details.",
      ],
    },
    {
      icon: Scale,
      title: "8. Governing Principles",
      body: [
        "These terms are interpreted according to applicable consumer and digital publishing standards.",
        "If any section is deemed unenforceable, remaining provisions continue in full effect.",
      ],
    },
  ];

  const quickRules = [
    "Read full bonus terms before claiming promotions",
    "Never gamble with money you cannot afford to lose",
    "Set deposit and time limits before playing",
    "Use licensed operators only",
    "Contact support when terms are unclear",
  ];

  const faq = [
    {
      q: "Does BetVoxa provide gambling services?",
      a: "No. BetVoxa is an informational platform. We do not provide betting products, handle deposits, or process withdrawals.",
    },
    {
      q: "Are all bonuses guaranteed to be available?",
      a: "No. Promotions are controlled by third-party operators and may expire, change, or become unavailable by region.",
    },
    {
      q: "Who should I contact for account issues at a casino?",
      a: "You should contact the operator directly through their official support channels, as account management is outside BetVoxa.",
    },
    {
      q: "Can these terms change?",
      a: "Yes. We may update these terms at any time, and the revised version becomes effective when published on this page.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7F2] to-[#F3F1EA]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-[26rem] h-[26rem] rounded-full bg-[#F97316]/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-[#F97316] text-xs tracking-wider uppercase font-semibold bg-[#F97316]/10 px-3 py-1 rounded-full">
            <FileText size={14} />
            Legal Page
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1F1A17]">Terms & Conditions</h1>
          <p className="text-[#5F554C] max-w-3xl text-lg leading-relaxed">
            These Terms define how BetVoxa content may be used, what responsibilities users hold, and how third-party links should be interpreted.
            Please read carefully before using offers or visiting partner platforms.
          </p>
          <p className="text-[#6A5E53] text-sm">Effective date: 07 May 2026</p>
        </motion.div>
      </section>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: "Transparent", text: "Clear coverage of rights and obligations." },
            { icon: Lock, title: "Safe Use", text: "Guidance for secure and lawful use." },
            { icon: Scale, title: "Fair Terms", text: "Balanced legal framework for users." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white border border-[#ECE6DB] rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-[#F97316]" />
                </div>
                <h3 className="font-semibold text-[#1F1A17] mb-1">{item.title}</h3>
                <p className="text-[#5F554C] text-sm">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-5">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-[#ECE6DB] rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-[#F97316]" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#1F1A17]">{section.title}</h2>
                </div>
                <div className="space-y-2">
                  {section.body.map((line) => (
                    <p key={line} className="text-[#5F554C] leading-relaxed">{line}</p>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#1F1A17] rounded-2xl p-6 md:p-8 text-[#F1ECE3]">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">Responsible Use Checklist</h2>
          <p className="text-[#DDD3C5] mb-4">Before joining any partner platform, use this checklist:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickRules.map((rule) => (
              <li key={rule} className="text-sm bg-white/5 border border-white/10 rounded-lg px-4 py-3">{rule}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white border border-[#ECE6DB] rounded-2xl p-6 md:p-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1F1A17] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="border border-[#EFE8DB] rounded-xl p-4 bg-[#FCFBF8]">
                <h3 className="font-semibold text-[#1F1A17] mb-2">{item.q}</h3>
                <p className="text-[#5F554C] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-[#EFE8DB] pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-[#5F554C] text-sm">Questions about these terms?</div>
            <a href="mailto:support@betvoxa.com" className="inline-flex items-center gap-2 text-[#F97316] hover:text-[#DC6803] text-sm font-medium">
              <Mail size={16} />
              support@betvoxa.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
