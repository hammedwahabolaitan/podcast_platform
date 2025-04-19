import { DataTypes } from "sequelize"
import { sequelize } from "./index.js"
import Category from "./category.model.js"

/**
 * @swagger
 * components:
 *   schemas:
 *     Podcast:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - categoryId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the podcast
 *         title:
 *           type: string
 *           description: The title of the podcast
 *         description:
 *           type: string
 *           description: A description of the podcast
 *         image:
 *           type: string
 *           description: URL to the podcast cover image
 *         categoryId:
 *           type: integer
 *           description: The id of the category this podcast belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the podcast was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the podcast was last updated
 *       example:
 *         id: 1
 *         title: Tech Talk Weekly
 *         description: The latest in technology news and trends discussed by industry experts.
 *         image: https://example.com/images/tech-talk.jpg
 *         categoryId: 1
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

const Podcast = sequelize.define("Podcast", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

// Define relationships
Podcast.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  },
  onDelete: "CASCADE",
})

Category.hasMany(Podcast, {
  foreignKey: "categoryId",
})

export default Podcast
