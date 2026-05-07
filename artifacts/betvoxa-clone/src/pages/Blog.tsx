import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, ArrowRight, Search } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  slug: string;
  category: string;
  date: string;
  writerName: string;
  seoTitle: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Hardcoded blog data - replace with API call when backend is ready
    const blogData = [
      {
        _id: "69fa3d945de96c278a7d240f",
        title: "RocketPlay Casino Australia: The Ultimate Review & Guide 2026",
        excerpt: "Looking for the best online casino in Australia for real money in 2026? Read our in-depth RocketPlay Australia review covering welcome bonuses, free spins, online pokies, live casino games, fast payouts, crypto banking, and the exclusive Zillion Coins VIP loyalty program.",
        coverImage: "https://click.creditsdeal.com/coverImage_1778007444401.jpeg",
        slug: "rocketplay-casino-australia-review-2026",
        category: "Online Casino Reviews",
        date: "2026-05-05T18:57:24.413Z",
        writerName: "Kevin",
      },
      {
        _id: "69f5c29f2c053e8930c08f2b",
        title: "Test Casino",
        excerpt: "test",
        coverImage: "https://click.creditsdeal.com/coverImage_1777713823317.png",
        slug: "tes-blog-gamezhunt",
        category: "games",
        date: "2026-05-02T09:23:43.335Z",
        writerName: "Shubham Dholke",
      },
    ];
    setBlogs(blogData);
    setLoading(false);
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-[#F3F1EA] to-[#F8F7F2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1F1A17] mb-4">
              Casino & Betting <span className="text-[#F97316]">Blog</span>
            </h1>
            <p className="text-[#5F554C] text-lg max-w-2xl mx-auto">
              Expert insights, guides, and reviews on the best online casinos,
              betting sites, and bonuses worldwide.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-[#A39B92]" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E4DED0] bg-white text-[#1F1A17] placeholder-[#A39B92] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#5F554C]">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#5F554C]">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-lg overflow-hidden bg-white border border-[#E4DED0] hover:shadow-lg transition-shadow"
              >
                {/* Cover Image */}
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative h-48 overflow-hidden bg-[#F3F1EA] cursor-pointer">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/400x250?text=Blog+Image";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#F97316] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5">
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="text-lg font-bold text-[#1F1A17] mb-2 line-clamp-2 hover:text-[#F97316] transition-colors cursor-pointer">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-[#5F554C] text-sm mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-[#A39B92] mb-4 border-t border-[#E4DED0] pt-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                    <span>{blog.writerName}</span>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/blog/${blog.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#F97316]/10 text-[#F97316] rounded-lg hover:bg-[#F97316]/20 transition-colors font-medium text-sm cursor-pointer"
                    >
                      Read Article <ArrowRight size={14} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
