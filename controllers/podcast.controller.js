import { Podcast, Category, Episode } from "../models/index.js"
import { Op } from "sequelize"

// Get all podcasts with pagination, sorting, and filtering
export const getAllPodcasts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt", order = "DESC", search = "", categoryId } = req.query

    const offset = (page - 1) * limit

    // Build filter conditions
    const whereConditions = {}

    if (search) {
      whereConditions.title = {
        [Op.like]: `%${search}%`,
      }
    }

    if (categoryId) {
      whereConditions.categoryId = categoryId
    }

    // Get podcasts with pagination and filtering
    const { count, rows: podcasts } = await Podcast.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: Category,
          attributes: ["id", "name", "slug"],
        },
        {
          model: Episode,
          attributes: ["id"],
        },
      ],
      order: [[sort, order]],
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      distinct: true,
    })

    // Calculate total pages
    const totalPages = Math.ceil(count / limit)

    res.json({
      podcasts,
      pagination: {
        total: count,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error getting podcasts:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get featured podcasts
export const getFeaturedPodcasts = async (req, res) => {
  try {
    const { limit = 3 } = req.query

    // In a real app, you might have a "featured" flag or some other criteria
    // For this example, we'll just get the most recent podcasts
    const podcasts = await Podcast.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "name", "slug"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: Number.parseInt(limit),
    })

    res.json(podcasts)
  } catch (error) {
    console.error("Error getting featured podcasts:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get podcast by ID
export const getPodcastById = async (req, res) => {
  try {
    const { id } = req.params

    const podcast = await Podcast.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name", "slug"],
        },
        {
          model: Episode,
          attributes: ["id", "title", "description", "duration", "publishedAt"],
          order: [["publishedAt", "DESC"]],
        },
      ],
    })

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" })
    }

    res.json(podcast)
  } catch (error) {
    console.error("Error getting podcast:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create a new podcast
export const createPodcast = async (req, res) => {
  try {
    const { title, description, image, categoryId } = req.body

    // Validate required fields
    if (!title || !description || !categoryId) {
      return res.status(400).json({ message: "Title, description, and categoryId are required" })
    }

    // Check if category exists
    const category = await Category.findByPk(categoryId)
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    // Create podcast
    const podcast = await Podcast.create({
      title,
      description,
      image,
      categoryId,
    })

    res.status(201).json(podcast)
  } catch (error) {
    console.error("Error creating podcast:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update a podcast
export const updatePodcast = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, image, categoryId } = req.body

    // Find podcast
    const podcast = await Podcast.findByPk(id)
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" })
    }

    // Check if category exists if provided
    if (categoryId) {
      const category = await Category.findByPk(categoryId)
      if (!category) {
        return res.status(404).json({ message: "Category not found" })
      }
    }

    // Update podcast
    await podcast.update({
      title: title || podcast.title,
      description: description || podcast.description,
      image: image || podcast.image,
      categoryId: categoryId || podcast.categoryId,
    })

    res.json(podcast)
  } catch (error) {
    console.error("Error updating podcast:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete a podcast
export const deletePodcast = async (req, res) => {
  try {
    const { id } = req.params

    // Find podcast
    const podcast = await Podcast.findByPk(id)
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" })
    }

    // Delete podcast
    await podcast.destroy()

    res.json({ message: "Podcast deleted successfully" })
  } catch (error) {
    console.error("Error deleting podcast:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
