import { motion } from "framer-motion";
import { Shield, Mail, Globe } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      title: "1. Introduction",
      content: [
        "BetVoxa is an informational platform that provides reviews, promotional offers, bonuses, and deals related to third-party online gaming platforms.",
        "We do not own, operate, or control any casino or gaming services.",
      ],
    },
    {
      title: "2. Information We Collect",
      content: [
        "a) Personal Information: Name and email address (only when voluntarily submitted through forms or contact)",
        "b) Non-Personal Information: IP address, browser type and device information, pages visited and time spent on the website",
        "c) Cookies & Tracking Technologies: We use cookies and similar technologies to enhance user experience and analyze website performance.",
      ],
    },
    {
      title: "3. How We Use Your Information",
      content: [
        "• Improve website functionality and user experience",
        "• Respond to user queries or support requests",
        "• Monitor and analyze traffic trends",
        "• Provide relevant content and promotional information",
      ],
    },
    {
      title: "4. Third-Party Links",
      content: [
        "BetVoxa acts solely as a marketing and informational platform.",
        "We provide links to third-party websites for promotional purposes",
        "We do not control or manage these external platforms",
        "Once you leave our website, their privacy policies apply",
        "We strongly recommend reviewing the privacy policies of any third-party website before engaging with their services.",
      ],
    },
    {
      title: "5. Nature of Services",
      content: [
        "BetVoxa does not provide betting services, does not accept deposits or process payments, and does not operate any casino platform.",
        "We only present informational content and promotional offers from third-party providers.",
      ],
    },
    {
      title: "6. Data Security",
      content: [
        "We implement reasonable technical and organizational measures to protect your data. However, no digital platform can guarantee absolute security.",
      ],
    },
    {
      title: "7. User Responsibility",
      content: [
        "By using this website, you confirm that: You are of legal age according to your jurisdiction, you understand the risks associated with online gaming, and you access third-party services at your own discretion.",
      ],
    },
    {
      title: "8. Cookies Policy",
      content: [
        "Cookies are used to improve site performance, store user preferences, and analyze visitor behavior. You may disable cookies via your browser settings if preferred.",
      ],
    },
    {
      title: "9. Updates to This Policy",
      content: [
        "We reserve the right to update this Privacy Policy at any time. Changes will be reflected on this page with an updated effective date.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <Shield size={32} className="text-[#F97316]" />
              <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest">Legal</div>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1F1A17] mb-4">Privacy Policy</h1>
            <p className="text-[#5F554C] text-lg max-w-xl">
              Effective Date: 05 May 2026
            </p>
            <p className="text-[#5F554C] text-lg max-w-2xl mt-4">
              At BetVoxa.com, we are committed to protecting your privacy and ensuring transparency in how your information is collected, used, and safeguarded. This Privacy Policy outlines our practices when you access or interact with our website.
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
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <h2 className="font-serif text-2xl font-bold text-[#1F1A17] mb-4">10. Contact Information</h2>
            <p className="text-[#5F554C] leading-relaxed mb-6">
              For any questions or concerns regarding this Privacy Policy, please contact:
            </p>
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

          {/* ─── DISCLAIMER ─── */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.55 }}>
            <div className="bg-[#FEF2E8] border border-[#F97316]/12 rounded-xl p-6">
              <div className="flex gap-4">
                <Shield size={24} className="text-[#F97316] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1F1A17] mb-2">Disclaimer</h3>
                  <p className="text-[#5F554C] text-sm leading-relaxed">
                    BetVoxa is a third-party promotional platform. We do not own or operate any casino or gaming service. All offers, bonuses, and services are provided by external platforms.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
