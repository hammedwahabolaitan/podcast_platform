import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || "podcast_platform",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
)

export { sequelize }
export { default as Category } from "./category.model.js"
export { default as Podcast } from "./podcast.model.js"
export { default as Episode } from "./episode.model.js"
