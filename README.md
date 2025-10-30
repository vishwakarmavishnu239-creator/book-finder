📚 Book Finder - Take-Home Challenge
Candidate ID: Naukri1025
Developer: [Your Name]
Challenge: Aganitha Cognitive Solutions - Full Stack Developer Position
🎯 Project Overview
Book Finder is a web application designed for Alex, a college student who needs an intuitive way to search and discover books. The application allows users to search books by title, author, or subject, providing detailed information including cover images, ratings, publication details, and more.
✨ Features
Core Functionality

Multiple Search Methods: Search by title, author, or subject
Real-time Search: Fast API integration with Open Library
Detailed Book Information: View comprehensive details including:

Book covers
Author information
Publication year
Page count
Reader ratings
Publisher details
ISBN numbers
Subject categories



User Experience

Responsive Design: Fully optimized for mobile, tablet, and desktop
Interactive UI: Hover effects, smooth animations, and transitions
Modal View: Click any book to see detailed information
Error Handling: Graceful handling of network errors and empty results
Loading States: Clear visual feedback during API calls
Keyboard Support: Press Enter to search

🛠️ Technology Stack

Framework: React 18 (with Hooks)
Styling: Tailwind CSS (utility-first approach)
Icons: Lucide React
API: Open Library Search API
State Management: React useState
Deployment: Netlify

📁 Project Structure
book-finder/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          # Main application component
│   ├── index.js         # React entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies
├── README.md           # This file
└── netlify.toml        # Netlify configuration
🚀 Local Development
Prerequisites

Node.js (v14 or higher)
npm or yarn

Installation Steps

Clone the repository

bashgit clone <your-repo-url>
cd book-finder

Install dependencies

bashnpm install

Start development server

bashnpm start

Open in browser

http://localhost:3000
📦 Dependencies
json{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1"
}
🌐 API Integration
The application uses the Open Library Search API:

Base URL: https://openlibrary.org/search.json
Authentication: None required
Search Parameters:

title: Search by book title
author: Search by author name
subject: Search by subject/category
limit: Number of results (set to 20)



Example API Calls
GET https://openlibrary.org/search.json?title=harry+potter&limit=20
GET https://openlibrary.org/search.json?author=stephen+king&limit=20
GET https://openlibrary.org/search.json?subject=science+fiction&limit=20
💡 Design Decisions
Why These Choices?

Multiple Search Types: College students search books in different ways - sometimes they know the title, sometimes just the author, or they want to explore a subject area.
Visual Book Covers: Visual recognition helps students identify books they've seen or heard about.
Detailed Modal View: Instead of navigating away, users can quickly view details and return to browsing.
Rating Display: Helps students make informed decisions about which books to read.
Subject Tags: Allows discovery of related topics and books.
Responsive Grid: Optimized for different devices - students use phones, tablets, and laptops.

🎨 UI/UX Highlights

Color Scheme: Calming blue/purple gradients suitable for reading/studying context
Card-based Layout: Easy scanning and comparison of multiple books
Hover Effects: Clear visual feedback for interactive elements
Empty States: Helpful messaging when no results found
Loading Indicators: User knows when data is being fetched

🧪 Testing Performed

✅ Search by title with various inputs
✅ Search by author with various inputs
✅ Search by subject/category
✅ Handle empty search queries
✅ Handle no results found
✅ Handle network errors
✅ Image fallback when cover not available
✅ Responsive design on mobile/tablet/desktop
✅ Modal open/close functionality
✅ External link to Open Library

🚀 Deployment
Netlify Deployment Steps

Push code to GitHub

bashgit init
git add .
git commit -m "Initial commit - Book Finder app"
git remote add origin <your-repo-url>
git push -u origin main

Deploy to Netlify

Go to https://app.netlify.com/
Click "Add new site" → "Import an existing project"
Connect your GitHub repository
Build settings (auto-detected):

Build command: npm run build
Publish directory: build


Click "Deploy site"


Live URL: Your app will be available at https://your-site-name.netlify.app

🔧 Build Configuration
The project includes a netlify.toml file for optimal deployment:
toml[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
📝 Future Enhancements
If I had more time, I would add:

Favorites/Bookmarks: Save books for later
Advanced Filters: By year, language, page count
Sort Options: By rating, year, relevance
Reading Lists: Create custom collections
Dark Mode: For late-night studying
Export to CSV: Save search results
Share Feature: Share books with classmates

🐛 Known Limitations

API rate limiting: Open Library may rate-limit excessive requests
Image availability: Some books don't have cover images
Data completeness: Some books have incomplete metadata

👤 About the Developer
This project was developed as part of the Aganitha Cognitive Solutions take-home challenge. The goal was to demonstrate:

Understanding of user requirements
Clean code practices
Modern React development
API integration
Responsive design
Professional deployment

📞 Contact
For questions or feedback about this project, please contact via the email provided in the application.

Submission Date: [Your Submission Date]
Candidate ID: Naukri1025
Live Demo: [Your Netlify URL]
AI Collaboration: [This conversation URL]