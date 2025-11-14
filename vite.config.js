import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { renameSync, existsSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'hide-git-during-build',
      buildStart() {
        // Temporarily rename .git directory to prevent it from being copied
        const gitPath = join('public', '.git')
        const gitBackupPath = join('public', '.git.backup')
        if (existsSync(gitPath) && !existsSync(gitBackupPath)) {
          renameSync(gitPath, gitBackupPath)
        }
      },
      closeBundle() {
        // Restore .git directory after build
        const gitPath = join('public', '.git')
        const gitBackupPath = join('public', '.git.backup')
        if (existsSync(gitBackupPath) && !existsSync(gitPath)) {
          renameSync(gitBackupPath, gitPath)
        }
      }
    }
  ],
  server: {
    port: 5174, // Use a different port to avoid cache issues
  },
})
