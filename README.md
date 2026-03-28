# DevOps Dashboard

A production-ready full-stack web application demonstrating modern DevOps best practices with a complete CI/CD pipeline.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                       │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐ │
│  │  React    │  │  Express │  │ Dockerfile │  │  GitHub   │ │
│  │ Frontend  │  │  Backend │  │ Multi-stage│  │  Actions  │ │
│  └────┬─────┘  └────┬─────┘  └─────┬──────┘  └────┬─────┘ │
└───────┼──────────────┼──────────────┼──────────────┼────────┘
        │              │              │              │
        ▼              ▼              ▼              ▼
   ┌─────────────────────────────────────────────────────┐
   │              CI/CD Pipeline (GitHub Actions)        │
   │                                                     │
   │  Install → Lint → Test → Build → Trivy Scan → Push │
   └──────────────────────────┬──────────────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │     Deployment    │
                    │   (Render.com)    │
                    │                   │
                    │  GHCR Docker Image│
                    └───────────────────┘
```

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, Lucide Icons        |
| Backend    | Node.js, Express                    |
| Styling    | CSS Custom Properties (dark/light)  |
| Testing    | Vitest, Testing Library             |
| Container  | Docker (multi-stage, Alpine-based)  |
| CI/CD      | GitHub Actions                      |
| Security   | Trivy vulnerability scanner         |
| Registry   | GitHub Container Registry (GHCR)    |
| Deployment | Render.com (free tier)              |

## Quick Start

### Prerequisites
- Node.js 20+
- npm 9+
- Docker (optional, for containerized runs)

### Local Development

```bash
# Install dependencies
npm install

# Start frontend dev server (port 3000)
npm run dev

# Start backend server (port 4000)
npm run server

# Run tests
npm test

# Lint code
npm run lint
```

### Docker

```bash
# Build the image
docker build -t devops-dashboard .

# Run the container
docker run -p 4000:4000 devops-dashboard

# Visit http://localhost:4000
```

## API Endpoints

| Endpoint          | Method | Description              |
|-------------------|--------|--------------------------|
| `/api/health`     | GET    | Health check with uptime |
| `/api/ready`      | GET    | Readiness probe          |
| `/api/live`       | GET    | Liveness probe           |
| `/api/metrics`    | GET    | System metrics           |
| `/api/pipelines`  | GET    | Demo pipeline data       |

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs on every push to `main`:

1. **Lint & Test** — Runs ESLint and Vitest
2. **Build & Push** — Builds Docker image and pushes to GHCR
3. **Security Scan** — Trivy scans for HIGH/CRITICAL vulnerabilities (fails on findings)
4. **Deploy** — Triggers deployment to Render.com

### Required GitHub Secrets

| Secret                    | Description                          |
|---------------------------|--------------------------------------|
| `GITHUB_TOKEN`            | Auto-provided by GitHub Actions      |
| `RENDER_DEPLOY_HOOK_URL`  | Render.com deploy webhook URL        |

### GitHub Variables

| Variable   | Description                           |
|------------|---------------------------------------|
| `APP_URL`  | Deployed app URL for health checks    |

## Deployment (Render.com)

1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repository
3. Set **Environment** to `Docker`
4. Set environment variable: `NODE_ENV=production`
5. Copy the Deploy Hook URL to GitHub Secrets as `RENDER_DEPLOY_HOOK_URL`

## Project Structure

```
├── .github/workflows/
│   └── ci-cd.yml            # CI/CD pipeline
├── public/                   # Static assets
├── server/
│   └── index.js             # Express API server
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Navigation with theme toggle
│   │   ├── StatsGrid.jsx    # Metrics dashboard cards
│   │   ├── PipelineCard.jsx # Pipeline status list
│   │   ├── ActivityCard.jsx # Activity feed
│   │   └── Footer.jsx       # Footer
│   ├── hooks/
│   │   └── useTheme.js     # Dark/light theme hook
│   ├── styles/
│   │   └── index.css        # Global styles & themes
│   ├── test/
│   │   ├── setup.js         # Test configuration
│   │   └── App.test.jsx     # Component tests
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
├── .dockerignore
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── Dockerfile               # Multi-stage production build
├── package.json
├── README.md
└── vite.config.js
```

## Features

- **Dark/Light Theme** — Toggle with smooth CSS transitions, persisted in localStorage
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Accessibility** — ARIA labels, keyboard navigation, skip links, reduced motion support
- **Security** — Helmet headers, non-root Docker user, Trivy scanning
- **Health Checks** — Docker HEALTHCHECK + API health/ready/live endpoints
- **Production Optimized** — Compressed responses, minimal Alpine image, multi-stage build