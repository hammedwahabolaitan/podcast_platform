import { getCategoriesWithPodcasts } from "@/lib/api"
import { CategorySection } from "@/components/category-section"

export default async function CategoriesPage() {
  const categories = await getCategoriesWithPodcasts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Podcast Categories</h1>

      <div className="space-y-12">
        {categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </main>
  )
}
