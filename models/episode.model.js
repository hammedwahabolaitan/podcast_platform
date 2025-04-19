import { DataTypes } from "sequelize"
import { sequelize } from "./index.js"
import Podcast from "./podcast.model.js"

/**
 * @swagger
 * components:
 *   schemas:
 *     Episode:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - audioUrl
 *         - podcastId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the episode
 *         title:
 *           type: string
 *           description: The title of the episode
 *         description:
 *           type: string
 *           description: A description of the episode
 *         audioUrl:
 *           type: string
 *           description: URL to the episode audio file
 *         duration:
 *           type: string
 *           description: Duration of the episode (e.g., "45:30")
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           description: The date the episode was published
 *         showNotes:
 *           type: string
 *           description: Additional notes or transcript for the episode
 *         podcastId:
 *           type: integer
 *           description: The id of the podcast this episode belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the episode was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the episode was last updated
 *       example:
 *         id: 1
 *         title: The Future of AI
 *         description: Exploring how artificial intelligence is shaping our future.
 *         audioUrl: https://example.com/episodes/future-of-ai.mp3
 *         duration: 45:30
 *         publishedAt: 2023-05-15T10:00:00.000Z
 *         showNotes: In this episode, we discuss the latest advancements in AI.
 *         podcastId: 1
 *         createdAt: 2023-05-15T10:00:00.000Z
 *         updatedAt: 2023-05-15T10:00:00.000Z
 */

const Episode = sequelize.define("Episode", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  audioUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  showNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
})

// Define relationships
Episode.belongsTo(Podcast, {
  foreignKey: {
    name: "podcastId",
    allowNull: false,
  },
  onDelete: "CASCADE",
})

Podcast.hasMany(Episode, {
  foreignKey: "podcastId",
})

export default Episode
