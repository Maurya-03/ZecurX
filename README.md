# ZecurX Learn

Modern React + Vite learning platform UI with:
- Landing page with routed navbar sections
- Login flow to enter the app shell
- LMS dashboard and learning pages
- Dark/Light theme toggle with persistence

## Tech Stack

- React 18
- Vite 5
- Plain CSS (CSS variables for theme)

## Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the local URL shown in terminal (for example `http://127.0.0.1:5173/`).

## Build and Preview

Build production assets:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Demo Login

Use these credentials on the login page:

- Email: `alex@zecurxlearn.local`
- Password: `secure123`

## Main User Flow

1. Landing page
2. Click **Student Login** or **Login**
3. Sign in with demo credentials
4. Enter the LMS app shell

## Landing Navbar Routing

The landing navbar routes (smooth scroll) to dedicated sections:

- Courses -> `#section-courses`
- Instructors -> `#section-instructors`
- Certifications -> `#section-certifications`
- Company -> `#section-company`

Company dropdown routes:

- About -> `#section-company-about`
- Careers -> `#section-company-careers`
- Contact -> `#section-company-contact`

## Theme Toggle

- Available at the top of Landing, Login, and App Header
- Toggles dark/light mode
- Persists in `localStorage` using key `zecurx-theme`

## Project Structure

```text
src/
  App.jsx
  main.jsx
  components/
  pages/
  data/
  styles/
```

## Optional UI Checks (Playwright)

This project includes `playwright-core` for local smoke scripts.
If you want to run browser automation with local Chrome:

- Ensure Chrome is installed at:
  - `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Run your Node script using `playwright-core`.

## Notes

- Global app theme and layout are driven by CSS variables in `src/styles/app.css`.
- Landing page uses inline SVG for hero illustration.
