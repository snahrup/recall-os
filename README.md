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

## Gmail Integration

To enable Gmail and contacts import, create a Google Cloud project and OAuth2 client credentials. Provide the following environment variables when running the dev server or add them to a `.env.local` file:

```bash
export GOOGLE_CLIENT_ID=your_client_id
export GOOGLE_CLIENT_SECRET=your_client_secret
export GOOGLE_REDIRECT_URI=http://localhost:3000/api/gmail/callback
```

Visit `/api/gmail/auth` to start the OAuth flow. After authorizing, tokens returned by
`/api/gmail/callback` can be sent in the body of `/api/gmail/messages` or
`/api/gmail/contacts` POST requests to retrieve data.

