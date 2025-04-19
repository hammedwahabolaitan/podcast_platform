import express from "express"
import cors from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import { sequelize } from "./models/index.js"
import podcastRoutes from "./routes/podcast.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import episodeRoutes from "./routes/episode.routes.js"

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Swagger documentation setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Podcast Platform API",
      version: "1.0.0",
      description: "API for a podcast platform",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use("/api/podcasts", podcastRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/episodes", episodeRoutes)

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Podcast Platform API",
    documentation: "/api/documentation",
  })
})

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")

    // Sync database models (in development)
    await sequelize.sync({ alter: true })
    console.log("Database models synchronized.")

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`API Documentation: http://localhost:${PORT}/api/documentation`)
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

startServer()
