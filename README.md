# vps_monitor
A real-time server monitoring dashboard [vps_monitor](https://monitor.abid.ink/). Displays metrics such as live services, network stats, and historical cpu usage — self-hosted, self-built, and running in production on a DigitalOcean VPS using Linux.
**Live demo:** [monitor.abid.ink](https://monitor.abid.ink)
## Why 
Needed an accessible way to monitor my vps while on the go. vps_monitor is the solution: a Python backend collecting system metrics displayed on a React dashboard over WebSockets, with historical data persisted in PostgreSQL.
## Features
- **Real-time metrics streaming** — CPU, disk, and network stats collected/served via Python(FastAPI) pushed to the frontend over WebSockets
- **Historical data & retention** — save data to PostgreSQL to view historical patterns
- **Live Services** — services running on Linux server 
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
│   psutil           │  collects CPU / disk / network metrics / services
└────────┬───────────┘
         ▼
┌──────────────────┐        ┌───────────────────┐
│  FastAPI backend │ ─────> │  PostgreSQL       │  (Docker) historical storage
│  (systemd)       │        └───────────────────┘
└────────┬─────────┘
         │ WebSocket (real-time push)
         ▼
┌──────────────────┐
│  React frontend  │  
└──────────────────┘
         ▲
         │ HTTPS
┌──────────────────┐
│  Caddy           │  reverse proxy + TLS
└──────────────────┘
```
The backend runs as a systemd service to get  low-level system metrics. PostgreSQL runs in Docker for isolation and simple setup. Caddy serves the website.
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
Configure Caddy as a reverse proxy to serve static files:
```
monitor.example {
        
        ...
}
```



### Backend
Create a `.env` file in the backend folder to access the database:
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
Run the API with uvicorn (make sure you're in a venv):
```
uvicorn main:app --host 0.0.0.0 --port 8001
```
### Production deployment
The metric script and API run via systemd.
