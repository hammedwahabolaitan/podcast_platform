# Podcast Platform API

A RESTful API for a podcast platform built with Node.js, Express, and MySQL.

## Features

- RESTful API architecture
- MySQL database with Sequelize ORM
- Pagination, sorting, and filtering for list endpoints
- Proper relationships between Podcasts, Episodes, and Categories
- API documentation with Swagger
- Docker setup for easy deployment

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- Swagger (OpenAPI)
- Docker

## Database Schema

- **categories**: ID, name, slug, created_at, updated_at
- **podcasts**: ID, title, category_id, description, image, created_at, updated_at
- **episodes**: ID, podcast_id, title, description, audio_url, duration, published_at, show_notes, created_at, updated_at

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/hammedwahabolaitan/podcast_platform.git
   cd podcast-platform-api
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your database credentials
   \`\`\`

4. Run the database migrations and seed data:
   \`\`\`bash
   npm run seed
   \`\`\`

5. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

### Using Docker

1. Build and start the containers:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

2. Seed the database:
   \`\`\`bash
   docker-compose exec app npm run seed
   \`\`\`

## API Documentation

API documentation is available at `/api/documentation` when the server is running.

### Main Endpoints

- **GET /api/podcasts**: Get all podcasts with pagination, sorting, and filtering
- **GET /api/podcasts/featured**: Get featured podcasts
- **GET /api/podcasts/:id**: Get podcast by ID
- **GET /api/categories**: Get all categories
- **GET /api/categories/with-podcasts**: Get all categories with their podcasts
- **GET /api/episodes**: Get all episodes with pagination, sorting, and filtering
- **GET /api/episodes/podcast/:podcastId**: Get episodes by podcast ID

## Frontend Integration

This API is designed to work with a React frontend. The frontend code is available in a separate repository.

## License

This project is licensed under the MIT License.
