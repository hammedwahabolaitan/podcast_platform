import Image from "next/image"
import { getPodcastById, getEpisodesByPodcastId } from "@/lib/api"
import { EpisodeList } from "@/components/episode-list"
import { notFound } from "next/navigation"

export default async function PodcastPage({ params }: { params: { id: string } }) {
  const podcastId = Number.parseInt(params.id)

  if (isNaN(podcastId)) {
    notFound()
  }

  const podcast = await getPodcastById(podcastId)
  const episodes = await getEpisodesByPodcastId(podcastId)

  if (!podcast) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={podcast.image || "/placeholder.svg?height=400&width=400"}
              alt={podcast.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{podcast.title}</h1>
          <div className="mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {podcast.category.name}
            </span>
          </div>
          <p className="text-gray-700 mb-6">{podcast.description}</p>
          <div className="flex items-center text-gray-600">
            <span className="mr-4">{podcast.episodes.length} Episodes</span>
            <span>{podcast.totalDuration}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Episodes</h2>
        <EpisodeList episodes={episodes} podcastId={podcastId} />
      </div>
    </main>
  )
}
