## Frontend
- Vite + React 18 + TypeScript
- Tailwind CSS with shadcn-ui components
- React Router for routing (Home, Graph, Review, Settings pages)
- React Query for data fetching and caching
- React Flow for graph visualization

## Backend
- Supabase project (`wgmjhfxqcaefsfqdvkib`) used for data storage
- Supabase client initialized in `src/integrations/supabase`
- Types generated from Supabase schema (`types.ts`)

## Directory Structure
- `src/components` – reusable UI components and custom graph nodes
- `src/pages` – top level pages (Home, Dashboard/Graph, Review, Settings)
- `src/hooks` – custom hooks (e.g., `useChatHistory`)
- `src/integrations` – external services (Supabase)
- `public/` – static assets

Build scripts and configuration live in `vite.config.ts`, `tailwind.config.ts`, and `tsconfig*.json`.
