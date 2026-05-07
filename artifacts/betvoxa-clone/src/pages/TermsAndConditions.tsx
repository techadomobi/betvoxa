import { motion } from "framer-motion";
import { AlertCircle, FileText, Mail, Globe } from "lucide-react";

export default function TermsAndConditions() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: ["By accessing or using BetVoxa.com, you agree to comply with these Terms & Conditions. If you do not agree, please discontinue use of the website."],
    },
    {
      title: "2. Nature of Service",
      content: [
        "BetVoxa is an informational and promotional platform that provides:",
        "• Reviews",
        "• Bonus information",
        "• Deals and offers",
        "• Promotional content",
        "We do not own, operate, or provide any casino or gaming services.",
      ],
    },
    {
      title: "3. Third-Party Platforms",
      content: [
        "• Our website contains links to third-party websites",
        "• We do not control or manage these platforms",
        "• Any interaction, registration, or transaction is between you and the third party",
        "• BetVoxa is not responsible for: Losses or damages, payment issues, or account-related disputes",
      ],
    },
    {
      title: "4. No Guarantees",
      content: [
        "• We do not guarantee winnings, profits, or outcomes",
        "• Bonuses and offers are subject to third-party terms",
        "• Information may change without notice",
      ],
    },
    {
      title: "5. User Responsibilities",
      content: [
        "By using this website, you confirm that:",
        "• You are of legal age in your jurisdiction",
        "• Online gaming is legal in your location",
        "• You understand the risks associated with gambling",
      ],
    },
    {
      title: "6. Intellectual Property",
      content: [
        "All content on BetVoxa (text, design, branding) is protected and may not be copied or reused without permission.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      content: [
        "BetVoxa shall not be held liable for:",
        "• Any financial losses",
        "• Third-party actions",
        "• Website downtime or inaccuracies",
      ],
    },
    {
      title: "8. Changes to Terms",
      content: [
        "We reserve the right to update these Terms at any time. Continued use of the website implies acceptance of changes.",
      ],
    },
  ];

  const disclaimers = [
    {
      title: "General Disclaimer",
      content:
        "BetVoxa is an independent informational platform. We do not provide gambling services or operate any casino.",
    },
    {
      title: "Affiliate Disclosure",
      content:
        "Some links on this website are affiliate links. We may earn a commission when users sign up through these links. This does not affect our reviews or content integrity.",
    },
    {
      title: "No Financial Advice",
      content:
        "Content on this website is for informational purposes only. We do not provide financial, legal, or betting advice.",
    },
    {
      title: "Risk Warning",
      content: "Gambling involves risk and may lead to financial loss. Please play responsibly.",
    },
    {
      title: "Legal Compliance",
      content:
        "Users must ensure that: Online gambling is legal in their country and they comply with local laws and regulations.",
    },
    {
      title: "Accuracy of Information",
      content:
        "We strive to keep information accurate and updated, but: Offers may change without notice and third-party platforms may modify their terms anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <FileText size={32} className="text-[#F97316]" />
              <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest">Legal</div>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1F1A17] mb-4">Terms & Conditions</h1>
            <p className="text-[#5F554C] text-lg max-w-xl">
              Effective Date: 05 May 2026
            </p>
            <p className="text-[#5F554C] text-lg max-w-2xl mt-4">
              Please read these Terms & Conditions carefully before using BetVoxa.com. By accessing our website, you agree to be bound by these terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <h2 className="font-serif text-2xl font-bold text-[#1F1A17] mb-4">{section.title}</h2>
              <div className="space-y-3">
                {section.content.map((paragraph, j) => (
                  <p key={j} className="text-[#5F554C] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}

          {/* ─── CONTACT SECTION ─── */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <h2 className="font-serif text-2xl font-bold text-[#1F1A17] mb-4">9. Contact</h2>
            <div className="bg-white border border-[#ECE6DB] rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#F97316]" />
                <div>
                  <div className="text-sm font-semibold text-[#1F1A17]">Email</div>
                  <div className="text-[#5F554C]">support@betvoxa.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-[#F97316]" />
                <div>
                  <div className="text-sm font-semibold text-[#1F1A17]">Website</div>
                  <div className="text-[#5F554C]">https://www.betvoxa.com</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── DISCLAIMERS SECTION ─── */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45 }}>
            <h2 className="font-serif text-2xl font-bold text-[#1F1A17] mb-6">Disclaimers</h2>
            <div className="space-y-4">
              {disclaimers.map((disclaimer, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.05 }}
                  className="bg-white border border-[#ECE6DB] rounded-xl p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-[#1F1A17] mb-2 flex items-center gap-2">
                    <AlertCircle size={18} className="text-[#F97316]" />
                    {disclaimer.title}
                  </h3>
                  <p className="text-[#5F554C] text-sm leading-relaxed">{disclaimer.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
