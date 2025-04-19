export interface Category {
  id: number
  name: string
  slug: string
  podcasts: Podcast[]
}

export interface Podcast {
  id: number
  title: string
  description: string
  image: string
  category: {
    id: number
    name: string
    slug: string
  }
  episodes: Episode[]
  totalDuration: string
}

export interface Episode {
  id: number
  podcastId: number
  title: string
  description: string
  audioUrl: string
  duration: string
  publishedAt: string
  showNotes?: string
}
