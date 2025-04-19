import Image from "next/image"
import Link from "next/link"
import type { Podcast } from "@/types"

interface FeaturedPodcastProps {
  podcast: Podcast
}

export function FeaturedPodcast({ podcast }: FeaturedPodcastProps) {
  return (
    <Link href={`/podcasts/${podcast.id}`} className="group">
      <div className="relative h-80 rounded-lg overflow-hidden">
        <Image
          src={podcast.image || "/placeholder.svg?height=400&width=300"}
          alt={podcast.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
          <div className="text-white">
            <span className="bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block">
              {podcast.category.name}
            </span>
            <h3 className="text-xl font-bold mb-1">{podcast.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-2">{podcast.description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
