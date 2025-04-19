import express from "express"
import {
  getAllEpisodes,
  getEpisodesByPodcastId,
  getEpisodeById,
  createEpisode,
  updateEpisode,
  deleteEpisode,
} from "../controllers/episode.controller.js"

const router = express.Router()

/**
 * @swagger
 * /api/episodes:
 *   get:
 *     summary: Get all episodes with pagination, sorting, and filtering
 *     tags: [Episodes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: publishedAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sort order
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for episode title
 *       - in: query
 *         name: podcastId
 *         schema:
 *           type: integer
 *         description: Filter by podcast ID
 *     responses:
 *       200:
 *         description: List of episodes with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 episodes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Episode'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get("/", getAllEpisodes)

/**
 * @swagger
 * /api/episodes/podcast/{podcastId}:
 *   get:
 *     summary: Get episodes by podcast ID
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: podcastId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Podcast ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: publishedAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of episodes for the podcast with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 episodes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Episode'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       404:
 *         description: Podcast not found
 */
router.get("/podcast/:podcastId", getEpisodesByPodcastId)

/**
 * @swagger
 * /api/episodes/{id}:
 *   get:
 *     summary: Get episode by ID
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Episode ID
 *     responses:
 *       200:
 *         description: Episode details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       404:
 *         description: Episode not found
 */
router.get("/:id", getEpisodeById)

/**
 * @swagger
 * /api/episodes:
 *   post:
 *     summary: Create a new episode
 *     tags: [Episodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - audioUrl
 *               - podcastId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               audioUrl:
 *                 type: string
 *               duration:
 *                 type: string
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *               showNotes:
 *                 type: string
 *               podcastId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Episode created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Podcast not found
 */
router.post("/", createEpisode)

/**
 * @swagger
 * /api/episodes/{id}:
 *   put:
 *     summary: Update an episode
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Episode ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               audioUrl:
 *                 type: string
 *               duration:
 *                 type: string
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *               showNotes:
 *                 type: string
 *               podcastId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Episode updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       404:
 *         description: Episode or podcast not found
 */
router.put("/:id", updateEpisode)

/**
 * @swagger
 * /api/episodes/{id}:
 *   delete:
 *     summary: Delete an episode
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Episode ID
 *     responses:
 *       200:
 *         description: Episode deleted successfully
 *       404:
 *         description: Episode not found
 */
router.delete("/:id", deleteEpisode)

export default router
