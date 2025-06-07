- React components use **PascalCase** filenames and exports (e.g., `CustomNode.tsx`).
- Hooks follow the `useSomething` camelCase pattern (e.g., `useChatHistory`).
- Files under `src/pages` and `src/components` are generally PascalCase.
- Utility modules use camelCase names (e.g., `utils.ts`).
- Folder aliases with `@/` prefix are defined in `tsconfig` and Vite config.

Consider maintaining PascalCase for all component files and camelCase for functions and variables.
