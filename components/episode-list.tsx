import Link from "next/link"
import type { Episode } from "@/types"

interface EpisodeListProps {
  episodes: Episode[]
  podcastId: number
}

export function EpisodeList({ episodes, podcastId }: EpisodeListProps) {
  return (
    <div className="space-y-4">
      {episodes.map((episode) => (
        <Link key={episode.id} href={`/podcasts/${podcastId}/episodes/${episode.id}`} className="block">
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-1">{episode.title}</h3>
            <div className="text-sm text-gray-600 mb-2">
              <span>{new Date(episode.publishedAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{episode.duration}</span>
            </div>
            <p className="text-gray-700 line-clamp-2">{episode.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
