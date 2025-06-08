## Frontend
- Next.js 14 (React 18 + TypeScript)
- Tailwind CSS with shadcn-ui components
- App Router pages under `app/` (`graph`, `memories`, `query`, `import`)
- React Router pages under `src/pages` remain from the original Vite setup
- React Query for data fetching and caching
- React Flow for graph visualization

## Backend
- Supabase project (`wgmjhfxqcaefsfqdvkib`) used for data storage
- Supabase client initialized in `src/integrations/supabase`
- Types generated from Supabase schema (`types.ts`)

## Directory Structure
- `components/` – reusable UI components and custom graph nodes
- `app/` – Next.js App Router pages
- `src/pages` – legacy pages from the earlier Vite setup
- `src/hooks` – custom hooks (e.g., `useChatHistory`)
- `src/integrations` – external services (Supabase)
- `public/` – static assets

Build scripts and configuration live in `vite.config.ts`, `tailwind.config.ts`, and `tsconfig*.json`.
