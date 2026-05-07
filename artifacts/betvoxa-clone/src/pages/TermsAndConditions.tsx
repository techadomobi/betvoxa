import { motion } from "framer-motion";
import { AlertCircle, FileText, Mail, Globe, CheckCircle2, Info, Scale, ExternalLink, Warning, BookOpen } from "lucide-react";

export default function TermsAndConditions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      icon: CheckCircle2,
      content: ["By accessing or using BetVoxa.com, you agree to comply with these Terms & Conditions. If you do not agree, please discontinue use of the website."],
    },
    {
      title: "2. Nature of Service",
      icon: FileText,
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
      icon: ExternalLink,
      content: [
        "• Our website contains links to third-party websites",
        "• We do not control or manage these platforms",
        "• Any interaction, registration, or transaction is between you and the third party",
        "• BetVoxa is not responsible for: Losses or damages, payment issues, or account-related disputes",
      ],
    },
    {
      title: "4. No Guarantees",
      icon: Info,
      content: [
        "• We do not guarantee winnings, profits, or outcomes",
        "• Bonuses and offers are subject to third-party terms",
        "• Information may change without notice",
      ],
    },
    {
      title: "5. User Responsibilities",
      icon: Scale,
      content: [
        "By using this website, you confirm that:",
        "• You are of legal age in your jurisdiction",
        "• Online gaming is legal in your location",
        "• You understand the risks associated with gambling",
      ],
    },
    {
      title: "6. Intellectual Property",
      icon: BookOpen,
      content: [
        "All content on BetVoxa (text, design, branding) is protected and may not be copied or reused without permission.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      icon: AlertCircle,
      content: [
        "BetVoxa shall not be held liable for:",
        "• Any financial losses",
        "• Third-party actions",
        "• Website downtime or inaccuracies",
      ],
    },
    {
      title: "8. Changes to Terms",
      icon: Warning,
      content: [
        "We reserve the right to update these Terms at any time. Continued use of the website implies acceptance of changes.",
      ],
    },
  ];

  const disclaimers = [
    {
      title: "General Disclaimer",
      icon: AlertCircle,
      content: "BetVoxa is an independent informational platform. We do not provide gambling services or operate any casino.",
    },
    {
      title: "Affiliate Disclosure",
      icon: ExternalLink,
      content: "Some links on this website are affiliate links. We may earn a commission when users sign up through these links. This does not affect our reviews or content integrity.",
    },
    {
      title: "No Financial Advice",
      icon: Info,
      content: "Content on this website is for informational purposes only. We do not provide financial, legal, or betting advice.",
    },
    {
      title: "Risk Warning",
      icon: Warning,
      content: "Gambling involves risk and may lead to financial loss. Please play responsibly.",
    },
    {
      title: "Legal Compliance",
      icon: Scale,
      content: "Users must ensure that: Online gambling is legal in their country and they comply with local laws and regulations.",
    },
    {
      title: "Accuracy of Information",
      icon: CheckCircle2,
      content: "We strive to keep information accurate and updated, but: Offers may change without notice and third-party platforms may modify their terms anytime.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7F2] to-[#F3F1EA]">
      {/* ─── ANIMATED BACKGROUND ─── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316]/3 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
            <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <FileText size={40} className="text-[#F97316]" />
              </motion.div>
              <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest">Legal Agreement</div>
            </motion.div>
            <motion.h1 className="font-serif text-6xl md:text-7xl font-bold text-[#1F1A17] mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Terms & Conditions
            </motion.h1>
            <motion.p className="text-[#5F554C] text-lg max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Effective Date: <span className="font-semibold text-[#F97316]">05 May 2026</span>
            </motion.p>
            <motion.p className="text-[#5F554C] text-lg max-w-3xl leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              Please read these Terms & Conditions carefully before using BetVoxa.com. By accessing our website, you agree to be bound by these terms.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── KEY HIGHLIGHTS ─── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { icon: Scale, label: "Fair Terms", desc: "Clear, transparent terms for all users" },
            { icon: CheckCircle2, label: "Your Rights", desc: "We respect and protect your user rights" },
            { icon: Info, label: "Accountability", desc: "We take responsibility for our platform" },
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-white/60 backdrop-blur-md border border-[#F97316]/20 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:shadow-[#F97316]/10">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }} className="mb-4">
                <item.icon size={32} className="text-[#F97316]" />
              </motion.div>
              <h3 className="font-semibold text-[#1F1A17] mb-2 text-lg">{item.label}</h3>
              <p className="text-[#5F554C] text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── CONTENT SECTIONS ─── */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div className="space-y-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {sections.map((section, i) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div className="bg-white border border-[#ECE6DB] rounded-2xl p-8 shadow-md hover:shadow-lg hover:shadow-[#F97316]/10 transition-all duration-300 overflow-hidden relative">
                  {/* Background gradient effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#F97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -400 }}
                    whileHover={{ x: 400 }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-[#F97316]/10 flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <IconComponent size={24} className="text-[#F97316]" />
                      </motion.div>
                      <h2 className="font-serif text-2xl font-bold text-[#1F1A17] pt-2">{section.title}</h2>
                    </div>

                    <div className="space-y-3 ml-0">
                      {section.content.map((paragraph, j) => (
                        <motion.p
                          key={j}
                          className="text-[#5F554C] leading-relaxed text-base"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: j * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── CONTACT SECTION ─── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-20">
          <motion.div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-[#1F1A17] mb-3">9. Contact Information</h2>
            <p className="text-[#5F554C] text-lg">Questions about these terms? Get in touch</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Mail, title: "Email", value: "support@betvoxa.com", href: "mailto:support@betvoxa.com" },
              { icon: Globe, title: "Website", value: "https://www.betvoxa.com", href: "https://www.betvoxa.com" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                variants={itemVariants}
                className="bg-gradient-to-br from-white to-[#F97316]/5 border border-[#F97316]/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-[#F97316]/15 transition-all duration-300 group cursor-pointer"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-[#F97316]/15 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon size={28} className="text-[#F97316]" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-[#1F1A17]">{item.title}</div>
                    <div className="text-[#5F554C] text-base group-hover:text-[#F97316] transition-colors">{item.value}</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ─── DISCLAIMERS SECTION ─── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="mt-20">
          <motion.div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-[#1F1A17] mb-3">Important Disclaimers</h2>
            <p className="text-[#5F554C] text-lg">Understanding our limitations and responsibilities</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {disclaimers.map((disclaimer, i) => {
              const IconComponent = disclaimer.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -8, shadow: "0 20px 40px rgba(249, 115, 22, 0.15)" }}
                  className="relative bg-white border border-[#ECE6DB] rounded-2xl p-6 overflow-hidden group"
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F97316]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-[#F97316]/15 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <IconComponent size={22} className="text-[#F97316]" />
                    </motion.div>
                    <h3 className="font-semibold text-[#1F1A17] mb-3 text-base group-hover:text-[#F97316] transition-colors">
                      {disclaimer.title}
                    </h3>
                    <p className="text-[#5F554C] text-sm leading-relaxed">{disclaimer.content}</p>
                  </div>

                  {/* Border animation on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    whileHover={{ borderColor: "rgba(249, 115, 22, 0.3)" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-16 bg-gradient-to-r from-[#F97316]/10 to-[#F97316]/5 border-t border-[#F97316]/20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 size={24} className="text-[#F97316]" />
            <p className="text-[#1F1A17] font-semibold">You're all set!</p>
          </motion.div>
          <motion.p className="text-[#5F554C] text-base leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            By using BetVoxa, you acknowledge that you have read and understood these Terms & Conditions. We encourage you to review this policy regularly for any updates.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
