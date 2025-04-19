import { getEpisodeById, getPodcastById } from "@/lib/api"
import { AudioPlayer } from "@/components/audio-player"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function EpisodePage({
  params,
}: {
  params: { id: string; episodeId: string }
}) {
  const podcastId = Number.parseInt(params.id)
  const episodeId = Number.parseInt(params.episodeId)

  if (isNaN(podcastId) || isNaN(episodeId)) {
    notFound()
  }

  const episode = await getEpisodeById(episodeId)
  const podcast = await getPodcastById(podcastId)

  if (!episode || !podcast) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/podcasts/${podcastId}`} className="text-blue-600 hover:underline flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {podcast.title}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{episode.title}</h1>
        <div className="text-gray-600 mb-4">
          <span>{new Date(episode.publishedAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{episode.duration}</span>
        </div>
        <p className="text-gray-700 mb-6">{episode.description}</p>

        <AudioPlayer audioUrl={episode.audioUrl} />
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Show Notes</h2>
        <div className="prose max-w-none">
          <p>{episode.showNotes || "No show notes available for this episode."}</p>
        </div>
      </div>
    </main>
  )
}
