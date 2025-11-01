Welcome to Simple Store - a very basic app demonstrating some feature flag funcitonality from Launch Darkly.

Setup Instructions
Download repo: https://github.com/bobbydigital1986/simple-store.git
cd backend
npm install
cd ../frontend
npm install
2 terminal tabs
In backend, npm start
In frontend, npm run start
Fire up http://localhost:5173 in browser

Tech Stack
Very basic Node/Express Backend
Vite serves up JS
Frontend React
Routing done via React Router

Structure
Entry at Index.jsx and Launch Darkly Initialized
App is mounted in App.jsx and in here additional user and device context is set
Landing.jsx is the landing page for the app
All features are flagged in Products.jsx
