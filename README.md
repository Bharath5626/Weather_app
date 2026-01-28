
# Weather App (React + Vite)

A small, responsive weather lookup app built with React and Vite. Enter a city name and the app fetches current weather (temperature, humidity, wind speed) from the OpenWeatherMap API and displays a matching icon.

This README explains how to run the app locally, where to add your API key, and the important files and structure.

## Features

- Search current weather by city name
- Uses OpenWeatherMap (metric units)
- Simple, responsive UI with icons for common weather conditions
- Built with Vite + React

## Prerequisites

- Node.js 18+ and npm (or a compatible package manager)
- An OpenWeatherMap API key (free tier is fine)

Get an API key at: https://openweathermap.org/api

## Setup — quick

1. Install dependencies

```powershell
npm install
```

2. Add your OpenWeatherMap API key to a .env file at the project root:

Create a file named `.env` (not checked into source control) and add:

```
VITE_APP_ID=your_openweathermap_api_key_here
```

Vite automatically exposes variables starting with `VITE_` to the client via `import.meta.env`.

3. Run the dev server

```powershell
npm run dev
```

4. Open http://localhost:5173 (Vite will show the exact URL in the terminal)

## Scripts

- `npm run dev` — start Vite dev server (HMR)
- `npm run build` — build production bundle
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint

## Environment variables and security

The app reads the OpenWeatherMap API key from `import.meta.env.VITE_APP_ID` (set via `.env`). Do NOT commit your API key to version control. For production, set the variable in your hosting platform's environment configuration.

## Important files / structure

- `index.html` — app entry
- `src/main.jsx` — React entry and root render
- `src/App.jsx` — top-level app component
- `src/components/Weather.jsx` — main weather UI and fetch logic (uses `import.meta.env.VITE_APP_ID`)
- `src/index.css` and `src/components/Weather.css` — styles
- `src/assets/` — icons used by the app (search, clear, weather icons)
- `vite.config.js` — Vite config with React plugin
- `package.json` — dependencies and scripts

## How the app works (brief)

- On load the app performs a search for a default city (`Chennai`) using the `search` function in `src/components/Weather.jsx`.
- When a user types a city and clicks the search icon, the app fetches current weather from OpenWeatherMap's `/data/2.5/weather` endpoint with `units=metric` and the API key from `import.meta.env.VITE_APP_ID`.
- The response is parsed and a small object with temperature, humidity, wind speed, location and an icon path is stored in component state and rendered.

## Known limitations & notes

- Error handling is minimal: the app alerts the API message when a non-OK response is returned. You may want to replace alerts with inline UI messages.
- The API key is exposed to the client — this is unavoidable for a purely client-side app. For private keys or higher security, proxy requests through a server.
- Icons are mapped by weather `icon` code in `Weather.jsx` — add more mappings if you add new icons.

## Development tips & enhancements (suggested)

- Add debounce for searches to avoid many API calls while typing
- Improve accessibility (aria attributes, keyboard support for search)
- Add unit toggle (°C / °F)
- Add a small backend proxy to keep the API key private
- Add tests for UI and fetch logic

## License & credits

This project is provided as-is. Icons in `src/assets` are included in the repo — ensure you have the right to ship them if you publish the project. OpenWeatherMap provides the weather data (see https://openweathermap.org/terms).

