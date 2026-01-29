import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should show invite gate on first visit', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Código de Invitación')).toBeVisible();
  });

  test('should navigate from code to email step', async ({ page }) => {
    await page.goto('/auth');
    
    // Enter invite code
    await page.fill('input[placeholder*="ABC"]', 'TEST123');
    await page.click('button:has-text("Continuar")');
    
    // Should see email step
    await expect(page.getByText('Tu Email')).toBeVisible();
  });
});

// Note: Full E2E tests would require a test Supabase instance
// These are placeholder tests showing the structure
