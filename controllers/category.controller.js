import { Category, Podcast } from "../models/index.js"
import { Op } from "sequelize"

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["name", "ASC"]],
    })

    res.json(categories)
  } catch (error) {
    console.error("Error getting categories:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get categories with podcasts
export const getCategoriesWithPodcasts = async (req, res) => {
  try {
    const { podcastLimit = 4 } = req.query

    const categories = await Category.findAll({
      include: [
        {
          model: Podcast,
          limit: Number.parseInt(podcastLimit),
          order: [["createdAt", "DESC"]],
        },
      ],
      order: [["name", "ASC"]],
    })

    res.json(categories)
  } catch (error) {
    console.error("Error getting categories with podcasts:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params

    const category = await Category.findByPk(id, {
      include: [
        {
          model: Podcast,
          order: [["createdAt", "DESC"]],
        },
      ],
    })

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json(category)
  } catch (error) {
    console.error("Error getting category:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get category by slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params

    const category = await Category.findOne({
      where: { slug },
      include: [
        {
          model: Podcast,
          order: [["createdAt", "DESC"]],
        },
      ],
    })

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.json(category)
  } catch (error) {
    console.error("Error getting category by slug:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body

    // Validate required fields
    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" })
    }

    // Check if category with same name or slug already exists
    const existingCategory = await Category.findOne({
      where: {
        [Op.or]: [{ name }, { slug }],
      },
    })

    if (existingCategory) {
      return res.status(400).json({ message: "Category with this name or slug already exists" })
    }

    // Create category
    const category = await Category.create({
      name,
      slug,
    })

    res.status(201).json(category)
  } catch (error) {
    console.error("Error creating category:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { name, slug } = req.body

    // Find category
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    // Update category
    await category.update({
      name: name || category.name,
      slug: slug || category.slug,
    })

    res.json(category)
  } catch (error) {
    console.error("Error updating category:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    // Find category
    const category = await Category.findByPk(id)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    // Delete category
    await category.destroy()

    res.json({ message: "Category deleted successfully" })
  } catch (error) {
    console.error("Error deleting category:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
