# Cyber Threat Map (CTF GIS Monitor)

## About The Project

This project is a web-based Geographic Information System (GIS) dashboard designed to visualize "Catch The Flag" (CTF) cybersecurity competitions. It serves as a real-time monitoring tool that displays the geographic location of active cyber teams, their network status, and simulated attack traffic between nodes.

The application is built as a frontend-only solution using ES6 Modules and Leaflet.js for mapping capabilities. It visualizes data such as team IP addresses, server locations, and scoring metrics on an interactive dark-themed map.

## Key Features

- Interactive Global Map using Leaflet.js with Dark Matter tiles.
- Real-time attack simulation using animated polylines.
- Live dashboard displaying network load and attack traffic stats.
- Detailed team cards showing IP, location, members, and active status.
- Responsive grid layout for the dashboard interface.

## Tech Stack

- **HTML5**: Markup structure.
- **CSS3**: Styling, grid layouts, and CSS animations for attack lines.
- **JavaScript (ES6)**: Logic for map rendering, data mocking, and simulation loops.
- **Leaflet.js**: Open-source JavaScript library for mobile-friendly interactive maps.
- **CartoDB**: Map tiles provider (Dark Matter theme).

## Project Structure

project-folder/
├── index.html # Main entry point
├── css/
│ └── style.css # Global styles and animations
└── js/
├── main.js # Map initialization and simulation logic
└── data.js # JSON-formatted dummy data for teams
