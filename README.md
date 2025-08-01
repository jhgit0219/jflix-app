# JFlix - Netflix Clone

A modern Netflix-style streaming platform built with Angular 17 and Node.js. This project demonstrates advanced frontend development techniques, API integration, and responsive design patterns.

**Live Demo:** https://jflix-app.vercel.app/

## Features

### Core Functionality

- **Movie & TV Series Browsing**: Browse through extensive collections of movies and TV series
- **Advanced Search**: Netflix-style search functionality with combined movie and series results
- **Genre Filtering**: Filter content by genre across all sections
- **Infinite Scroll**: Smooth pagination with automatic content loading
- **Hover Previews**: Interactive movie card previews with detailed information
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Interface

- **Netflix-Inspired Design**: Authentic Netflix-like user experience
- **Hero Section**: Featured content with dynamic backdrop images and logos
- **Movie Cards**: Intelligent image fallback system with logo/title display logic
- **Navigation**: Smooth transitions and hover effects
- **Loading States**: Skeleton loading and progress indicators

### Technical Features

- **Image Fallback System**: Robust handling of missing images with SVG placeholders
- **Logo Integration**: Dynamic movie/show logo display when available
- **Authentication System**: User registration, login, and account management
- **Real-time Search**: Instant search results with debounced input
- **Performance Optimization**: Efficient data loading and caching strategies

## Technology Stack

### Frontend

- **Angular 17**: Latest version with standalone components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Angular**: Modern icon library
- **Angular Signals**: Reactive state management
- **Angular Router**: Client-side routing

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB Atlas**: Cloud database
- **Firebase Authentication**: User authentication service
- **TMDB API**: Movie and TV series data
- **Axios**: HTTP client for API requests

### Development Tools

- **Angular CLI**: Development and build tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git**: Version control

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB Atlas account
- Firebase project
- TMDB API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/jflix-app.git
   cd jflix-app
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**

   **Frontend** (`frontend/src/environments/environment.ts`):

   ```typescript
   export const environment = {
     production: false,
     api: {
       backend: "http://localhost:5000",
     },
   };
   ```

   **Backend** (`backend/.env`):

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   TMDB_BEARER_TOKEN=your_tmdb_api_token
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   ```

4. **Run the application**

   ```bash
   # Start backend server (from backend directory)
   npm start

   # Start frontend development server (from frontend directory)
   npm start
   ```

   The application will be available at:

   - Frontend: http://localhost:4200
   - Backend API: http://localhost:5000

## Project Structure

```
jflix-app/
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── pages/        # Route components
│   │   │   ├── services/     # Business logic services
│   │   │   └── models/       # TypeScript interfaces
│   │   └── environments/     # Environment configuration
│   └── package.json
├── backend/                  # Node.js API server
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database models
│   │   └── middlewares/     # Express middlewares
│   └── package.json
└── README.md
```

## API Integration

### TMDB API

The application integrates with The Movie Database (TMDB) API to fetch:

- Movie and TV series data
- Genre information
- Movie logos and images
- Search functionality

### Key Endpoints

- `GET /api/movies/category/:type` - Get movies by category (popular, top_rated)
- `GET /api/movies/genre/:id` - Get movies by genre
- `GET /api/movies/search/all` - Combined movie and series search
- `GET /api/movies/search/query` - Movie search
- `GET /api/movies/search/series` - Series search

## Recent Updates

### 2024-12-19

- **Added Netflix-style search functionality** with combined movie and series results
- **Implemented intelligent image fallback system** for movie cards and previews
- **Enhanced movie card display logic** with logo/title conditional rendering
- **Added robust error handling** for broken images and API failures
- **Cleaned up codebase** by removing unnecessary console logs and debug statements
- **Improved user experience** with better loading states and error messages
- **Enhanced search results** with proper pagination and infinite scroll
- **Fixed image display issues** across all components
- **Fixed search logo display** - Search results now properly show movie and series logos

### Key Improvements

- **Search Feature**: Full-text search across movies and TV series with split results
- **Image Fallbacks**: SVG placeholder images when movie backdrops are unavailable
- **Logo Display**: Dynamic movie/show logos with proper fallback to titles
- **Search Logo Integration**: Search results now fetch and display logos for both movies and series
- **Code Quality**: Removed debug statements and improved code organization
- **Performance**: Optimized API calls and reduced unnecessary logging

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie and TV series data
- [Netflix](https://netflix.com) for the design inspiration
- [Angular](https://angular.io/) and [Node.js](https://nodejs.org/) communities for excellent documentation and tools
