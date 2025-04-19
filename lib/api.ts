import type { Category, Podcast, Episode } from "@/types"

// This is a mock API implementation
// In a real application, these functions would make actual API calls to your Node.js backend

// Mock data
const categories: Category[] = [
  { id: 1, name: "Technology", slug: "technology", podcasts: [] },
  { id: 2, name: "Business", slug: "business", podcasts: [] },
  { id: 3, name: "Science", slug: "science", podcasts: [] },
  { id: 4, name: "Health", slug: "health", podcasts: [] },
]

const podcasts: Podcast[] = [
  {
    id: 1,
    title: "Tech Talk Weekly",
    description: "The latest in technology news and trends discussed by industry experts.",
    image: "/placeholder.svg?height=400&width=400&text=Tech+Talk",
    category: { id: 1, name: "Technology", slug: "technology" },
    episodes: [],
    totalDuration: "10h 45m",
  },
  {
    id: 2,
    title: "Startup Stories",
    description: "Interviews with successful entrepreneurs about their journey and lessons learned.",
    image: "/placeholder.svg?height=400&width=400&text=Startup+Stories",
    category: { id: 2, name: "Business", slug: "business" },
    episodes: [],
    totalDuration: "8h 20m",
  },
  {
    id: 3,
    title: "Science Today",
    description: "Exploring the latest scientific discoveries and breakthroughs.",
    image: "/placeholder.svg?height=400&width=400&text=Science+Today",
    category: { id: 3, name: "Science", slug: "science" },
    episodes: [],
    totalDuration: "12h 15m",
  },
  {
    id: 4,
    title: "Health Matters",
    description: "Expert advice on health, wellness, and living your best life.",
    image: "/placeholder.svg?height=400&width=400&text=Health+Matters",
    category: { id: 4, name: "Health", slug: "health" },
    episodes: [],
    totalDuration: "9h 30m",
  },
  {
    id: 5,
    title: "Code Chronicles",
    description: "Deep dives into programming languages, frameworks, and development practices.",
    image: "/placeholder.svg?height=400&width=400&text=Code+Chronicles",
    category: { id: 1, name: "Technology", slug: "technology" },
    episodes: [],
    totalDuration: "15h 10m",
  },
  {
    id: 6,
    title: "Market Movers",
    description: "Analysis of financial markets and investment strategies.",
    image: "/placeholder.svg?height=400&width=400&text=Market+Movers",
    category: { id: 2, name: "Business", slug: "business" },
    episodes: [],
    totalDuration: "7h 45m",
  },
  {
    id: 7,
    title: "Space Explorers",
    description: "Journey through the cosmos and learn about space exploration.",
    image: "/placeholder.svg?height=400&width=400&text=Space+Explorers",
    category: { id: 3, name: "Science", slug: "science" },
    episodes: [],
    totalDuration: "11h 20m",
  },
  {
    id: 8,
    title: "Mindful Living",
    description: "Practices for mental health, mindfulness, and balanced living.",
    image: "/placeholder.svg?height=400&width=400&text=Mindful+Living",
    category: { id: 4, name: "Health", slug: "health" },
    episodes: [],
    totalDuration: "8h 55m",
  },
]

const episodes: Episode[] = [
  {
    id: 1,
    podcastId: 1,
    title: "The Future of AI",
    description: "Exploring how artificial intelligence is shaping our future and transforming industries.",
    audioUrl: "https://example.com/episodes/future-of-ai.mp3",
    duration: "45:30",
    publishedAt: "2023-05-15T10:00:00Z",
    showNotes:
      "In this episode, we discuss the latest advancements in AI technology and their implications for society.",
  },
  {
    id: 2,
    podcastId: 1,
    title: "Web Development Trends 2023",
    description: "The most important web development trends to watch in 2023.",
    audioUrl: "https://example.com/episodes/web-dev-trends.mp3",
    duration: "38:15",
    publishedAt: "2023-05-08T10:00:00Z",
  },
  {
    id: 3,
    podcastId: 1,
    title: "Cybersecurity Essentials",
    description: "Protecting your digital assets in an increasingly connected world.",
    audioUrl: "https://example.com/episodes/cybersecurity.mp3",
    duration: "52:40",
    publishedAt: "2023-05-01T10:00:00Z",
  },
  {
    id: 4,
    podcastId: 2,
    title: "From Idea to IPO",
    description: "The journey of a startup from conception to going public.",
    audioUrl: "https://example.com/episodes/idea-to-ipo.mp3",
    duration: "49:20",
    publishedAt: "2023-05-12T10:00:00Z",
  },
  {
    id: 5,
    podcastId: 2,
    title: "Venture Capital Insights",
    description: "Understanding how VCs think and what they look for in startups.",
    audioUrl: "https://example.com/episodes/vc-insights.mp3",
    duration: "41:15",
    publishedAt: "2023-05-05T10:00:00Z",
  },
]

// Connect episodes to podcasts
podcasts.forEach((podcast) => {
  podcast.episodes = episodes.filter((episode) => episode.podcastId === podcast.id)
})

// Connect podcasts to categories
categories.forEach((category) => {
  category.podcasts = podcasts.filter((podcast) => podcast.category.id === category.id)
})

// API functions
export async function getPodcasts({ limit = 10, offset = 0 } = {}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return podcasts.slice(offset, offset + limit)
}

export async function getFeaturedPodcasts({ limit = 3 } = {}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  // In a real app, you might have a "featured" flag or some other criteria
  return podcasts.slice(0, limit)
}

export async function getPodcastById(id: number) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return podcasts.find((podcast) => podcast.id === id)
}

export async function getEpisodesByPodcastId(podcastId: number) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return episodes.filter((episode) => episode.podcastId === podcastId)
}

export async function getEpisodeById(id: number) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return episodes.find((episode) => episode.id === id)
}

export async function getCategoriesWithPodcasts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categories
}

export async function getCategoryBySlug(slug: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categories.find((category) => category.slug === slug)
}
