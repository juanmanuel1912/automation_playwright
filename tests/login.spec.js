const { test, expect } = require('@playwright/test');

test.describe('Sauce Demo Login', () => {
  test('successful login to dashboard', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.saucedemo.com/v1/');
    
    // Wait for the login form to be ready
    await page.waitForSelector('#user-name', { state: 'visible' });
    
    // Fill in the login credentials
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    
    // Click the login button and wait for navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('#login-button')
    ]);
    
    // Verify successful login
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.product_label')).toBeVisible();
    await expect(page.locator('.product_label')).toHaveText('Products');
  });
});