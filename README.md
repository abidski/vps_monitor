# vps_monitor

A real-time server monitoring dashboard [vps_monitor](https://monitor.abid.ink/). Displays metrics sush as live services, network stats, and historical cpu usage — self-hosted, self-built, and running in production on a DigitalOcean VPS using Linux.

**Live demo:** [monitor.abid.ink](https://monitor.abid.ink)

## Why

Needed an accesible way to monitor my vps while on the go. vps_monitor is the solution: a Python backend collecting system metrics displayed on a React dashboard over WebSockets, with historical data persisted in PostgreSQL.

## Features

- **Real-time metrics streaming** — cpu,  disk, and network stats collected/served via Python(FastAPI) pushed to the frontend over WebSockets
- **Historical data & retention** — save data to PostgreSQL to view historical patterns 
- **Live charts** — graphs to display historical data
- **Production deployment** — backend services run via systemd; PostgreSQL runs via Docker for easy setup
- **Reverse proxy & TLS** — used Caddy as a web server
- **Clean, responsive UI** — React + TypeScript frontend 

## Tech Stack

| Layer | Technology |
|---|---|
| Metrics Script | Python |
| Backend API | FastAPI (Python) |
| Real-time data | WebSockets |
| Database | PostgreSQL (Docker) |
| Frontend | React + TypeScript/JavaScript + TailwindCSS |
| Reverse proxy / TLS | Caddy |
| Process management | systemd |
| Hosting | DigitalOcean VPS |

## Architecture

```
┌────────────────────┐
│   psutil (systemd) │  collects CPU / disk / network metrics
└────────┬───────────┘
         ▼
┌──────────────────┐        ┌───────────────────┐
│  FastAPI backend │ ─────> │  PostgreSQL       │  (Docker) historical storage
│  (systemd)       │        └───────────────────┘
└────────┬─────────┘
         │ WebSocket (real-time push)
         ▼
┌──────────────────┐
│  React frontend  │  live charts via Recharts
└──────────────────┘
         ▲
         │ HTTPS
┌──────────────────┐
│  Caddy           │  reverse proxy + TLS
└──────────────────┘
```

The backend runs as a systemd service to get direct, to low-level system metrics. PostgreSQL runs in Docker for isolation and simple setup. Caddy serves the website.

## How It Works

### Prerequisites

- Python 
- Node.js 
- Docker
- Caddy (for production-style reverse proxy setup)
- Linux server


### Frontend

Clone the frontend code:

```bash
git clone https://github.com/...
cd vps-monitor/frontend
```

Create a `.env` file for frontend containing api url:

```env
HISTORY_URL=...
SERVICES_URL=...
```

Build the frontend and scp the files to designated folder in the server to serve static files via Caddy

```bash
npm install
npm run build
```


### Backend

Configure Caddy as a reverse Proxy to serve static files:

```
monitor.example {
        
        ...
}
```

Create a `.env` file in the backend folder to acces the database:

```env
DATABASE_NAME=...
DATABASE_USER=...
DATABASE_HOST=...
DATABASE_PORT=...
DATABASE_PASSWORD=...

```

Start PostgreSQL:

```bash
docker compose up -d db
```


### Production deployment

The metric script and API runs via systemd service.




