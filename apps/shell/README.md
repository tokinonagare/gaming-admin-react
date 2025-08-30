# Gaming Admin Shell

Shell application for Gaming Admin micro-frontend system.

## Quick Start

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build
npm run build
```

## Development Port

- Development server: http://localhost:4200

## Tech Stack

- React 18
- TypeScript
- Webpack 5 + Module Federation
- Ant Design
- React Router

## Architecture

This is the main shell application that orchestrates and loads other micro-frontends:

- User Report (port 4201)
- User Transaction (port 4202)
- User Profile (port 4203)
- App User (port 4204)

## Deployment

This application serves as the main entry point and loads other micro-frontend modules at runtime.

---

Part of Gaming Admin micro-frontend architecture.