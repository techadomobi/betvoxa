import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { User, ArrowLeft, Share2 } from "lucide-react";
import { fallbackBlogResponse, BlogApiResponse, BlogPost, ContentBlock } from "@/lib/blogData";

function buildLongFormContent(post: BlogPost): ContentBlock[] {
  if (post.content.length >= 6) return post.content;

  const expanded: ContentBlock[] = [...post.content];

  expanded.push(
    {
      _id: `${post._id}-extended-1`,
      type: "paragraph",
      text: `<h3>Overview</h3><p>${post.title} is presented in this review-style format to help readers compare offer quality, risk profile, payout behavior, and mobile usability before they register.</p><p>We focus on practical factors that influence real-world experience: onboarding flow, support quality, withdrawal speed, and fair terms.</p>`,
    },
    {
      _id: `${post._id}-extended-2`,
      type: "paragraph",
      text: "<h3>Bonuses and Promotions</h3><p>Always validate headline bonuses against wagering requirements, max bet clauses, and game contribution percentages. A large offer is only valuable when withdrawal conditions are realistic for your play style.</p><p>Check whether free spins are credited instantly or in daily batches, and confirm expiry windows before activation.</p>",
    },
    {
      _id: `${post._id}-extended-3`,
      type: "paragraph",
      text: "<h3>Payments and Withdrawal Times</h3><p>Fast payouts are one of the strongest quality signals. Compare payment rails by speed and reliability, and verify if additional KYC checks are needed before first withdrawal.</p><p>Use smaller test withdrawals first to confirm processing consistency before scaling stake size.</p>",
    },
    {
      _id: `${post._id}-extended-4`,
      type: "paragraph",
      text: "<h3>Game Selection and User Experience</h3><p>A strong platform should balance quantity and quality: modern slot releases, stable live tables, and filter/search tools that make discovery easy. Mobile rendering, load speed, and in-session navigation should remain smooth across devices.</p><p>Look for transparent RTP disclosures and stable provider diversity rather than relying only on headline game counts.</p>",
    },
    {
      _id: `${post._id}-extended-5`,
      type: "paragraph",
      text: "<h3>Responsible Play Checklist</h3><ul><li>Set daily or weekly loss limits before you begin.</li><li>Use cool-off breaks when sessions run longer than planned.</li><li>Never chase losses with larger bets.</li><li>Treat gambling as paid entertainment, not income.</li></ul><p>Long-term sustainability matters more than short-term variance.</p>",
    },
    {
      _id: `${post._id}-extended-6`,
      type: "paragraph",
      text: `<h3>Final Notes</h3><p>This article is categorized under <strong>${post.category || "Casino Reviews"}</strong> and is intended to provide clear, decision-ready context for readers comparing options in the current market.</p><p><em>Play responsibly and review local regulations before depositing.</em></p>`,
    }
  );

  return expanded;
}

export default function BlogDetail() {
  const { slug } = useParams() as { slug: string };
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const endpoint = (import.meta.env.VITE_BLOG_LIST_API as string | undefined) || "/blogs.json";

        const response = await fetch(endpoint);
        const payload: BlogApiResponse = await response.json();

        if (response.ok && payload?.responseCode === 200 && Array.isArray(payload?.data)) {
          setBlog(payload.data.find((post) => post.slug === slug) || null);
          return;
        }

        setBlog(fallbackBlogResponse.data.find((post) => post.slug === slug) || null);
      } catch {
        setBlog(fallbackBlogResponse.data.find((post) => post.slug === slug) || null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-foreground">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Article not found
        </h1>
        <Link href="/blog">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors">
            <ArrowLeft size={18} />
            Back to Blog
          </button>
        </Link>
      </div>
    );
  }

  const displayContent = buildLongFormContent(blog);

  return (
    <div className="overflow-x-hidden">
      {/* Back Button */}
      <div className="bg-background border-b border-[#28406f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <motion.button
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 text-[#60a5fa] font-medium hover:text-[#3b82f6] transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Cover Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-96 bg-[#071122] overflow-hidden border-b border-[#28406f]"
      >
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/800x400?text=Blog+Cover";
          }}
        />
      </motion.div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#0d1b39] text-[#60a5fa] text-xs font-semibold px-3 py-1 rounded-full border border-[#28406f]">
              {blog.category}
            </span>
            <span className="text-[#9ca7c5] text-sm">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between border-t border-[#28406f] pt-4">
            <div className="flex items-center gap-2 text-[#c5cce2]">
              <User size={18} />
              <span className="font-medium">By {blog.writerName}</span>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-[#28406f] rounded-lg hover:bg-[#1a2a4a] transition-colors text-[#9ca7c5]">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </motion.div>

        {/* Body Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none prose-invert"
        >
          {displayContent.map((block, index) => (
            <motion.div
              key={block._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-6"
            >
              {block.type === "paragraph" && (
                <div
                  className="text-[#c5cce2] leading-8 text-base"
                  dangerouslySetInnerHTML={{ __html: block.text || "" }}
                />
              )}

              {block.type === "image" && block.url && (
                <div className="my-8 rounded-lg overflow-hidden">
                  <img
                    src={block.url}
                    alt="Article content"
                    className="w-full h-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/600x400?text=Image";
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Keywords */}
        {blog.seoKeywords && blog.seoKeywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-[#E4DED0]"
          >
            <h3 className="font-bold text-[#1F1A17] mb-3">Related Topics:</h3>
            <div className="flex flex-wrap gap-2">
              {blog.seoKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-[#2563EB]/10 text-[#2563EB] text-xs px-3 py-1 rounded-full font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-[#E4DED0]"
        >
          <div className="bg-linear-to-r from-[#2563EB]/10 to-[#2563EB]/5 rounded-lg p-6 text-center">
            <p className="text-[#5F554C] mb-4">
              Ready to find the best casino or betting site?
            </p>
            <Link href="/casino-bonuses">
              <motion.button
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-all font-bold cursor-pointer"
              >
                Claim Bonus Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}

