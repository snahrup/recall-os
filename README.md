# Recall OS

A web interface for exploring long-term memories with a graph-based view. This frontend is built with **Next.js 14**, **Tailwind CSS**, and **shadcn/ui** following design cues from Linear.app.

## Getting Started

```sh
npm install
npm run dev
```

## Structure

- `app/` – Next.js App Router pages (`/graph`, `/memories`, `/query`, `/import`)
- `components/` – shared UI components
- `hooks/` – data fetching and Zustand stores
- `lib/` – API helpers

## Available Commands

- `npm run dev` – start a development server
- `npm run build` – build for production
- `npm run lint` – run ESLint

This project is a work in progress and uses placeholder API calls expecting endpoints like `/memories` and `/query`.
