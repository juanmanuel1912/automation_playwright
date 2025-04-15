const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('chai');

let browser;
let page;
let startTime;

Before(async function() {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
});

Given('I am on the login page', async function() {
    await page.goto('https://www.saucedemo.com/v1/');
});

When('I enter username {string}', async function(username) {
    await page.fill('#user-name', username);
});

When('I enter password {string}', async function(password) {
    await page.fill('#password', password);
});

When('I click the login button', async function() {
    startTime = Date.now();
    await page.click('#login-button');
});

Then('I should be logged in successfully', async function() {
    await page.waitForSelector('.inventory_list', { timeout: 10000 });
    const isVisible = await page.isVisible('.inventory_list');
    expect(isVisible).to.be.true;
});

Then('I should see the inventory page', async function() {
    await page.waitForSelector('.product_label', { timeout: 5000 });
    const labelText = await page.locator('.product_label').textContent();
    expect(labelText).to.equal('Products');
});

Then('I should see the inventory page with some delay', async function() {
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    await page.waitForSelector('.inventory_list', { timeout: 10000 });
    expect(loadTime).to.be.greaterThan(500);
});

Then('the shopping cart should be empty', async function() {
    const cartBadgeExists = await page.locator('.shopping_cart_badge').count();
    expect(cartBadgeExists).to.equal(0);
});

Then('I should see an error message {string}', async function(expectedMessage) {
    const errorElement = await page.waitForSelector('[data-test="error"]', { timeout: 5000 });
    const actualMessage = await errorElement.textContent();
    expect(actualMessage.trim()).to.equal(expectedMessage.trim());
});

Then('I should see {string}', async function(result) {
    if (result === 'success') {
        await page.waitForSelector('.inventory_list', { timeout: 5000 });
        const isVisible = await page.isVisible('.inventory_list');
        expect(isVisible).to.be.true;
    } else {
        const errorElement = await page.waitForSelector('[data-test="error"]', { timeout: 5000 });
        const errorText = await errorElement.textContent();
        expect(errorText.trim()).to.equal(result.trim());
    }
});

After(async function() {
    if (browser) {
        await browser.close();
    }
});