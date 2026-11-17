import { defineConfig, devices } from '@playwright/test';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 8123);

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'list' : 'html',
  use: {
    baseURL: 'http://' + HOST + ':' + PORT,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'mobile-chromium', use: { ...devices['Pixel 5'] } },
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'node scripts/serve.mjs',
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});