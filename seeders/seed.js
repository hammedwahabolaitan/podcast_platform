import { sequelize, Category, Podcast, Episode } from "../models/index.js"

// Seed data function
async function seedData() {
  try {
    // Sync database models
    await sequelize.sync({ force: true })
    console.log("Database synchronized")

    // Create categories
    const categories = await Category.bulkCreate([
      { name: "Technology", slug: "technology" },
      { name: "Business", slug: "business" },
      { name: "Science", slug: "science" },
      { name: "Health", slug: "health" },
    ])
    console.log("Categories created")

    // Create podcasts
    const podcasts = await Podcast.bulkCreate([
      {
        title: "Tech Talk Weekly",
        description: "The latest in technology news and trends discussed by industry experts.",
        image: "https://example.com/images/tech-talk.jpg",
        categoryId: 1,
      },
      {
        title: "Startup Stories",
        description: "Interviews with successful entrepreneurs about their journey and lessons learned.",
        image: "https://example.com/images/startup-stories.jpg",
        categoryId: 2,
      },
      {
        title: "Science Today",
        description: "Exploring the latest scientific discoveries and breakthroughs.",
        image: "https://example.com/images/science-today.jpg",
        categoryId: 3,
      },
      {
        title: "Health Matters",
        description: "Expert advice on health, wellness, and living your best life.",
        image: "https://example.com/images/health-matters.jpg",
        categoryId: 4,
      },
      {
        title: "Code Chronicles",
        description: "Deep dives into programming languages, frameworks, and development practices.",
        image: "https://example.com/images/code-chronicles.jpg",
        categoryId: 1,
      },
      {
        title: "Market Movers",
        description: "Analysis of financial markets and investment strategies.",
        image: "https://example.com/images/market-movers.jpg",
        categoryId: 2,
      },
      {
        title: "Space Explorers",
        description: "Journey through the cosmos and learn about space exploration.",
        image: "https://example.com/images/space-explorers.jpg",
        categoryId: 3,
      },
      {
        title: "Mindful Living",
        description: "Practices for mental health, mindfulness, and balanced living.",
        image: "https://example.com/images/mindful-living.jpg",
        categoryId: 4,
      },
    ])
    console.log("Podcasts created")

    // Create episodes
    await Episode.bulkCreate([
      {
        title: "The Future of AI",
        description: "Exploring how artificial intelligence is shaping our future and transforming industries.",
        audioUrl: "https://example.com/episodes/future-of-ai.mp3",
        duration: "45:30",
        publishedAt: new Date("2023-05-15T10:00:00Z"),
        showNotes:
          "In this episode, we discuss the latest advancements in AI technology and their implications for society.",
        podcastId: 1,
      },
      {
        title: "Web Development Trends 2023",
        description: "The most important web development trends to watch in 2023.",
        audioUrl: "https://example.com/episodes/web-dev-trends.mp3",
        duration: "38:15",
        publishedAt: new Date("2023-05-08T10:00:00Z"),
        podcastId: 1,
      },
      {
        title: "Cybersecurity Essentials",
        description: "Protecting your digital assets in an increasingly connected world.",
        audioUrl: "https://example.com/episodes/cybersecurity.mp3",
        duration: "52:40",
        publishedAt: new Date("2023-05-01T10:00:00Z"),
        podcastId: 1,
      },
      {
        title: "From Idea to IPO",
        description: "The journey of a startup from conception to going public.",
        audioUrl: "https://example.com/episodes/idea-to-ipo.mp3",
        duration: "49:20",
        publishedAt: new Date("2023-05-12T10:00:00Z"),
        podcastId: 2,
      },
      {
        title: "Venture Capital Insights",
        description: "Understanding how VCs think and what they look for in startups.",
        audioUrl: "https://example.com/episodes/vc-insights.mp3",
        duration: "41:15",
        publishedAt: new Date("2023-05-05T10:00:00Z"),
        podcastId: 2,
      },
      {
        title: "Breakthrough in Quantum Computing",
        description: "Recent advancements in quantum computing and what they mean for the future.",
        audioUrl: "https://example.com/episodes/quantum-computing.mp3",
        duration: "55:10",
        publishedAt: new Date("2023-05-10T10:00:00Z"),
        podcastId: 3,
      },
      {
        title: "Nutrition Myths Debunked",
        description: "Separating fact from fiction in the world of nutrition and diet.",
        audioUrl: "https://example.com/episodes/nutrition-myths.mp3",
        duration: "47:25",
        publishedAt: new Date("2023-05-14T10:00:00Z"),
        podcastId: 4,
      },
    ])
    console.log("Episodes created")

    console.log("Seed data completed successfully")
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    // Close the database connection
    await sequelize.close()
  }
}

// Run the seed function
seedData()
