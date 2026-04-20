# Sienz/OS ◉ Portfolio

A retro-modern OS-style portfolio built with Astro, React, and a lot of caffeine. Designed to showcase the journey of a junior fullstack developer from Kota Kinabalu, Malaysia.

## 🚀 Features

- **Window Management**: Draggable, resizable (desktop), and bento-grid snapping windows.
- **Mobile Optimized**: Full-screen mobile experience with focused window management.
- **Retro Aesthetics**: CRT boot sequences, status bar, and a dock inspired by classic OS design.
- **Live Components**: Real-time clock, status indicators, and interactive panes.
- **Tweaks Panel**: On-the-fly customization of accent colors and section visibility.

## 🛠 Tech Stack

- **Framework**: Astro (Static Output)
- **UI Library**: React (v18) via unpkg (no-build React approach for the OS shell)
- **Styling**: Vanilla CSS with modern primitives (Variables, Clamp, Container Queries)
- **Runtime**: Bun

## 📦 Deployment

### Dokploy / Docker

This project is containerized and ready for deployment on **Dokploy**.

1.  **Clone the repository** to your server or connect your GitHub.
2.  The `docker-compose.yml` is configured to build the Astro site and serve it using Nginx.
3.  Deploy via Dokploy using the provided compose file.

### Manual Commands

| Command | Action |
| :--- | :--- |
| `bun install` | Installs dependencies |
| `bun run dev` | Starts local dev server |
| `bun run build` | Build for production |

## 🌏 About Sienz

Junior Fullstack Developer | Kota Kinabalu, Sabah.
Building systems, learning in public, and shipping software that someone actually leans forward to use.

---
Built with ◉ Sienz/OS
