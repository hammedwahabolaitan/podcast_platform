import Link from "next/link"
import { PodcastCard } from "@/components/podcast-card"
import { FeaturedPodcast } from "@/components/featured-podcast"
import { getPodcasts, getFeaturedPodcasts } from "@/lib/api"

export default async function Home() {
  const podcasts = await getPodcasts({ limit: 8 })
  const featuredPodcasts = await getFeaturedPodcasts({ limit: 3 })

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured Podcasts</h2>
          <Link href="/podcasts" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPodcasts.map((podcast) => (
            <FeaturedPodcast key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Popular Podcasts</h2>
          <Link href="/podcasts" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {podcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>
    </main>
  )
}
