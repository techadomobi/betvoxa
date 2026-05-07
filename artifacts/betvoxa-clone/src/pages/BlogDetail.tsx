import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

interface ContentBlock {
  type: "paragraph" | "image" | "heading";
  text?: string;
  url?: string;
  _id: string;
}

interface BlogPost {
  _id: string;
  title: string;
  content: ContentBlock[];
  excerpt: string;
  coverImage: string;
  slug: string;
  category: string;
  date: string;
  writerName: string;
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
}

export default function BlogDetail() {
  const { slug } = useParams() as { slug: string };
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://api.example.com/blog/${slug}`
        );
        if (response.ok) {
          const data = await response.json();
          setBlog(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#5F554C]">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[#1F1A17] mb-4">
          Article not found
        </h1>
        <Link href="/blog">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] text-white rounded-lg hover:bg-[#DC6803] transition-colors">
            <ArrowLeft size={18} />
            Back to Blog
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Back Button */}
      <div className="bg-[#F3F1EA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <motion.button
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 text-[#F97316] font-medium hover:text-[#DC6803] transition-colors cursor-pointer"
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
        className="h-96 bg-[#F3F1EA] overflow-hidden"
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
            <span className="bg-[#F97316]/20 text-[#F97316] text-xs font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <span className="text-[#A39B92] text-sm">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between border-t border-[#E4DED0] pt-4">
            <div className="flex items-center gap-2 text-[#5F554C]">
              <User size={18} />
              <span className="font-medium">By {blog.writerName}</span>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-[#E4DED0] rounded-lg hover:bg-[#F3F1EA] transition-colors text-[#5F554C]">
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
          className="prose prose-lg max-w-none"
        >
          {blog.content.map((block, index) => (
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
                  className="text-[#5F554C] leading-8 text-base"
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
                  className="bg-[#F97316]/10 text-[#F97316] text-xs px-3 py-1 rounded-full font-medium"
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
          <div className="bg-gradient-to-r from-[#F97316]/10 to-[#F97316]/5 rounded-lg p-6 text-center">
            <p className="text-[#5F554C] mb-4">
              Ready to find the best casino or betting site?
            </p>
            <Link href="/casino-bonuses">
              <motion.button
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#F97316] text-white rounded-lg hover:bg-[#DC6803] transition-all font-bold cursor-pointer"
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
