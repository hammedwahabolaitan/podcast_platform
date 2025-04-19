import { Episode, Podcast } from "../models/index.js"
import { Op } from "sequelize"

// Get all episodes with pagination, sorting, and filtering
export const getAllEpisodes = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "publishedAt", order = "DESC", search = "", podcastId } = req.query

    const offset = (page - 1) * limit

    // Build filter conditions
    const whereConditions = {}

    if (search) {
      whereConditions.title = {
        [Op.like]: `%${search}%`,
      }
    }

    if (podcastId) {
      whereConditions.podcastId = podcastId
    }

    // Get episodes with pagination and filtering
    const { count, rows: episodes } = await Episode.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: Podcast,
          attributes: ["id", "title"],
        },
      ],
      order: [[sort, order]],
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
    })

    // Calculate total pages
    const totalPages = Math.ceil(count / limit)

    res.json({
      episodes,
      pagination: {
        total: count,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error getting episodes:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get episodes by podcast ID
export const getEpisodesByPodcastId = async (req, res) => {
  try {
    const { podcastId } = req.params
    const { page = 1, limit = 10, sort = "publishedAt", order = "DESC" } = req.query

    const offset = (page - 1) * limit

    // Check if podcast exists
    const podcast = await Podcast.findByPk(podcastId)
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" })
    }

    // Get episodes for podcast
    const { count, rows: episodes } = await Episode.findAndCountAll({
      where: { podcastId },
      order: [[sort, order]],
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
    })

    // Calculate total pages
    const totalPages = Math.ceil(count / limit)

    res.json({
      episodes,
      pagination: {
        total: count,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error getting episodes by podcast ID:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get episode by ID
export const getEpisodeById = async (req, res) => {
  try {
    const { id } = req.params

    const episode = await Episode.findByPk(id, {
      include: [
        {
          model: Podcast,
          attributes: ["id", "title"],
        },
      ],
    })

    if (!episode) {
      return res.status(404).json({ message: "Episode not found" })
    }

    res.json(episode)
  } catch (error) {
    console.error("Error getting episode:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create a new episode
export const createEpisode = async (req, res) => {
  try {
    const { title, description, audioUrl, duration, publishedAt, showNotes, podcastId } = req.body

    // Validate required fields
    if (!title || !description || !audioUrl || !podcastId) {
      return res.status(400).json({ message: "Title, description, audioUrl, and podcastId are required" })
    }

    // Check if podcast exists
    const podcast = await Podcast.findByPk(podcastId)
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" })
    }

    // Create episode
    const episode = await Episode.create({
      title,
      description,
      audioUrl,
      duration,
      publishedAt: publishedAt || new Date(),
      showNotes,
      podcastId,
    })

    res.status(201).json(episode)
  } catch (error) {
    console.error("Error creating episode:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update an episode
export const updateEpisode = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, audioUrl, duration, publishedAt, showNotes, podcastId } = req.body

    // Find episode
    const episode = await Episode.findByPk(id)
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" })
    }

    // Check if podcast exists if provided
    if (podcastId) {
      const podcast = await Podcast.findByPk(podcastId)
      if (!podcast) {
        return res.status(404).json({ message: "Podcast not found" })
      }
    }

    // Update episode
    await episode.update({
      title: title || episode.title,
      description: description || episode.description,
      audioUrl: audioUrl || episode.audioUrl,
      duration: duration || episode.duration,
      publishedAt: publishedAt || episode.publishedAt,
      showNotes: showNotes !== undefined ? showNotes : episode.showNotes,
      podcastId: podcastId || episode.podcastId,
    })

    res.json(episode)
  } catch (error) {
    console.error("Error updating episode:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete an episode
export const deleteEpisode = async (req, res) => {
  try {
    const { id } = req.params

    // Find episode
    const episode = await Episode.findByPk(id)
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" })
    }

    // Delete episode
    await episode.destroy()

    res.json({ message: "Episode deleted successfully" })
  } catch (error) {
    console.error("Error deleting episode:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
