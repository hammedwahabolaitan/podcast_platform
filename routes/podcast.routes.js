import express from "express"
import {
  getAllPodcasts,
  getFeaturedPodcasts,
  getPodcastById,
  createPodcast,
  updatePodcast,
  deletePodcast,
} from "../controllers/podcast.controller.js"

const router = express.Router()

/**
 * @swagger
 * /api/podcasts:
 *   get:
 *     summary: Get all podcasts with pagination, sorting, and filtering
 *     tags: [Podcasts]
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
 *           default: createdAt
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
 *         description: Search term for podcast title
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: List of podcasts with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 podcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Podcast'
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
router.get("/", getAllPodcasts)

/**
 * @swagger
 * /api/podcasts/featured:
 *   get:
 *     summary: Get featured podcasts
 *     tags: [Podcasts]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Number of featured podcasts to return
 *     responses:
 *       200:
 *         description: List of featured podcasts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Podcast'
 */
router.get("/featured", getFeaturedPodcasts)

/**
 * @swagger
 * /api/podcasts/{id}:
 *   get:
 *     summary: Get podcast by ID
 *     tags: [Podcasts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Podcast ID
 *     responses:
 *       200:
 *         description: Podcast details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Podcast'
 *       404:
 *         description: Podcast not found
 */
router.get("/:id", getPodcastById)

/**
 * @swagger
 * /api/podcasts:
 *   post:
 *     summary: Create a new podcast
 *     tags: [Podcasts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Podcast created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Podcast'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Category not found
 */
router.post("/", createPodcast)

/**
 * @swagger
 * /api/podcasts/{id}:
 *   put:
 *     summary: Update a podcast
 *     tags: [Podcasts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Podcast ID
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
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Podcast updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Podcast'
 *       404:
 *         description: Podcast or category not found
 */
router.put("/:id", updatePodcast)

/**
 * @swagger
 * /api/podcasts/{id}:
 *   delete:
 *     summary: Delete a podcast
 *     tags: [Podcasts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Podcast ID
 *     responses:
 *       200:
 *         description: Podcast deleted successfully
 *       404:
 *         description: Podcast not found
 */
router.delete("/:id", deletePodcast)

export default router
