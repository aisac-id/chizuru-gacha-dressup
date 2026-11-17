// Minimal e2e smoke suite (harness baseline). Extend per issue acceptance criteria.
import { test, expect } from '@playwright/test';

test('page loads with HUD and navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Chizuru Gacha/);
  await expect(page.locator('#coins')).toHaveText('300 koin');
  await expect(page.locator('#nav-gacha')).toBeVisible();
  await expect(page.locator('#pull1')).toBeEnabled();
});

test('daily bonus grants 200 coins once', async ({ page }) => {
  await page.goto('/');
  await page.locator('#daily').click();
  await expect(page.locator('#coins')).toHaveText('500 koin');
  await page.locator('#daily').click();
  await expect(page.locator('#coins')).toHaveText('500 koin');
  await expect(page.locator('#daily')).toHaveText('Bonus harian sudah diambil');
});

test('album tab renders 100 cells', async ({ page }) => {
  await page.goto('/');
  await page.locator('#nav-album').click();
  await expect(page.locator('#scr-album')).toHaveClass(/on/);
  await expect(page.locator('#grid > *')).toHaveCount(100);
});

test('summon x1 deducts coins and opens cinematic', async ({ page }) => {
  await page.goto('/');
  await page.locator('#pull1').click();
  await expect(page.locator('#cine')).toHaveClass(/on/);
  await expect(page.locator('#coins')).toHaveText('200 koin');
});

test('summon is disabled when coins are insufficient', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('cg_save', JSON.stringify({ coins: 50, owned: [], lastDaily: 'x' }));
  });
  await page.goto('/');
  await expect(page.locator('#coins')).toHaveText('50 koin');
  await expect(page.locator('#pull1')).toBeDisabled();
  await expect(page.locator('#pull10')).toBeDisabled();
  await expect(page.locator('#cine')).not.toHaveClass(/on/);
});