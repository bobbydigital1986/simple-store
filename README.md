# Simple Store

A tiny example app demonstrating client-side feature flags with LaunchDarkly.

## Quick start

1. Clone the repo:

	git clone https://github.com/bobbydigital1986/simple-store.git
	cd simple-store

2. Install dependencies:

	# backend
	cd backend
	npm install

	# in a second terminal window
	cd ../frontend
	npm install

3. Start the apps (two terminals):

	# terminal 1 - backend (listens on port 8080)
	cd backend
	npm start

	# terminal 2 - frontend (Vite dev server)
	cd frontend
	npm run start

4. Open your browser to http://localhost:5173

Notes:
- The frontend (Vite) dev server runs on port 5173 by default in this project. The backend runs on port 8080.
- If you previously had Vite configured to use 8080, the dev server was changed to avoid colliding with the backend.

## Tech stack

- Node + Express (backend)
- Vite + React (frontend)
- React Router for client routing
- LaunchDarkly React SDK for feature flags and analytics

## Project structure (high level)

- `frontend/src/index.jsx` — app entry point and LaunchDarkly initialization (async provider)
- `frontend/src/App.jsx` — top-level React component, sets additional user/device context
- `frontend/src/components/Landing.jsx` — landing page UI
- `frontend/src/components/Products.jsx` — product list, feature-flagged UI
- `frontend/src/components/Checkout.jsx` — simple checkout flow and LD tracking

## LaunchDarkly notes

- Replace the placeholder client-side ID in `frontend/src/index.jsx` with your LaunchDarkly client-side ID.
- Flags referenced in the UI include (examples): `enableSorting`, `showPrices`, `enableBulkSelect`.
- The app demonstrates multi-context usage (`user` + `device`) in `App.jsx` — each context object must include a `key`.

## Troubleshooting

- If you see HTML returned when fetching `/api/products`, check that the backend is running on port 8080 and the frontend Vite server is not bound to that port.
- If `node_modules` got committed accidentally, add/commit the provided `.gitignore` and remove them from the index:

  git rm -r --cached frontend/node_modules backend/node_modules || true
  git add .gitignore
  git commit -m "Add .gitignore and remove node_modules from index"

## License

This repository is provided as-is for demo purposes.
