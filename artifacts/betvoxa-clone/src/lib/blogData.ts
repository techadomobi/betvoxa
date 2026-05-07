export interface ContentBlock {
  type: "paragraph" | "image" | "heading";
  text?: string;
  url?: string;
  _id: string;
}

export interface BlogPost {
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

export interface BlogApiResponse {
  responseCode: number;
  responseMessage: string;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
  };
  data: BlogPost[];
}

export const fallbackBlogResponse: BlogApiResponse = {
  responseCode: 200,
  responseMessage: "Blog list fetched successfully",
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalCount: 2,
  },
  data: [
    {
      _id: "69fa3d945de96c278a7d240f",
      title: "RocketPlay Casino Australia: The Ultimate Review & Guide 2026",
      content: [
        {
          type: "paragraph",
          text: "<h3 style=\"font-weight:700;font-size:20px;margin-bottom:10px;\">Introduction: Why Australian Players Are Choosing RocketPlay</h3><p>When it comes to finding a <strong>trusted online casino Australia</strong> players can rely on, the market has never been more competitive or more exciting. Among the growing list of <strong>Australian online casino sites</strong>, one name keeps rising to the top in 2026: <strong>RocketPlay Australia</strong>.</p><p>This in-depth review covers welcome bonuses, free spins, online pokies, live dealer tables, fast payout banking, and the Zillion Coins loyalty program.</p>",
          _id: "69fa3d945de96c278a7d2410",
        },
      ],
      excerpt:
        "Looking for the best online casino in Australia for real money in 2026? Read our in-depth RocketPlay Australia review covering welcome bonuses, free spins, online pokies, live casino games, fast payouts, crypto banking, and the exclusive Zillion Coins VIP loyalty program. Everything Aussie players need to know before signing up.",
      coverImage: "https://click.creditsdeal.com/coverImage_1778007444401.jpeg",
      slug: "rocketplay-casino-australia-review-2026",
      metaDescription:
        "Discover why RocketPlay is the best online casino Australia has to offer in 2026. Claim up to AUD $1,100 welcome bonus, 325 free spins, fast crypto payouts, 3000+ online pokies, live dealer games & Zillion Coins rewards. Full review for Australian players.",
      seoKeywords: [
        "online casino bonus Australia",
        "free spins Australia casino",
        "welcome bonus casino AU",
        "no deposit bonus Australia",
        "casino cashback Australia",
        "VIP casino Australia",
        "online pokies real money Australia",
        "best pokies Australia",
        "live casino Australia",
        "live dealer casino Australia",
      ],
      seoTitle: "RocketPlay Casino Australia Review 2026 - Bonuses, Pokies & Real Money Guide",
      category: "Online Casino Reviews",
      writerName: "Kevin",
      date: "2026-05-05T18:57:24.413Z",
    },
    {
      _id: "69f5c29f2c053e8930c08f2b",
      title: "Test Casino",
      content: [
        {
          type: "paragraph",
          text: "<p>test casino</p>",
          _id: "69f5c29f2c053e8930c08f2c",
        },
        {
          type: "image",
          url: "https://click.creditsdeal.com/images_1777713823322.png",
          _id: "69f5c29f2c053e8930c08f2d",
        },
      ],
      excerpt: "test",
      coverImage: "https://click.creditsdeal.com/coverImage_1777713823317.png",
      slug: "tes-blog-gamezhunt",
      metaDescription: "test",
      seoKeywords: [],
      seoTitle: "Test",
      category: "games",
      writerName: "Shubham Dholke",
      date: "2026-05-02T09:23:43.335Z",
    },
  ],
};
