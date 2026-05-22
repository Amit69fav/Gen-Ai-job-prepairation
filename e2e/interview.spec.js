import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Gen AI Interview App E2E Flow', () => {
    test('User should be able to login, upload resume, and see analysis', async ({ page }) => {
        // 1. Navigate to Login
        await page.goto('http://localhost:5173/login'); // Adjust port if needed

        // 2. Perform Login
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('input[name="password"]', 'Password123!');
        await page.click('button[type="submit"]');

        // 3. Confirm Navigation to Home/Input page
        await expect(page).toHaveURL('http://localhost:5173/');
        await expect(page.locator('h1')).toContainText('Master Your Next Interview');

        // 4. Fill Job Description
        await page.fill('textarea[name="JobDescription"]', 'Software Engineer role at a top tech company. Requirements: React, Node.js, AI integration.');

        // 5. Upload Dummy PDF
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.locator('.upload-zone').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(__dirname, 'dummy.pdf')); // Ensure dummy.pdf exists

        // 6. Submit Analysis
        await page.click('button.generate-btn');

        // 7. Verify Loading State
        await expect(page.locator('.ai-loading-overlay')).toBeVisible();

        // 8. Wait for Report Dashboard (Long timeout for AI)
        await expect(page.locator('.report-dashboard')).toBeVisible({ timeout: 30000 });

        // 9. Confirm Output Sections Mount
        await expect(page.locator('h1')).toContainText('Interview Readiness Report');
        await expect(page.locator('.score-main')).toBeVisible();
        await expect(page.locator('.dashboard-section.active')).toContainText('Technical Proficiency');
    });
});
