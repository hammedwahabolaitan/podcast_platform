import Image from "next/image"
import Link from "next/link"
import type { Podcast } from "@/types"

interface PodcastCardProps {
  podcast: Podcast
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <Link href={`/podcasts/${podcast.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="relative aspect-square">
          <Image
            src={podcast.image || "/placeholder.svg?height=300&width=300"}
            alt={podcast.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate">{podcast.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{podcast.category.name}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{podcast.description}</p>
        </div>
      </div>
    </Link>
  )
}
