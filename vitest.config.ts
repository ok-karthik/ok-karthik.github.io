import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // Agent worktrees live under .claude/worktrees/ inside this checkout. Without
    // this, `pnpm test` on main also collects every worktree's copy of the
    // suite and fails 20 tests there (no node_modules in the worktree).
    exclude: [...configDefaults.exclude, '.claude/**'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
