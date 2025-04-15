const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

let inventoryPage;

Given('I am logged in as {string}', async function (username) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(username, 'secret_sauce');
    inventoryPage = new InventoryPage(this.page);
    await this.page.waitForSelector('.inventory_list');
});

Given('I am on the inventory page', async function () {
    await this.page.waitForSelector('.inventory_list');
});

When('I click on product {string}', async function (productName) {
    await inventoryPage.clickProduct(productName);
});

When('I add {string} to cart', async function (productName) {
    await inventoryPage.addToCart(productName);
});

When('I sort products by {string}', async function (sortOption) {
    await inventoryPage.sortProducts(sortOption);
});

When('I logout', async function () {
    await inventoryPage.logout();
});

When('I log back in as {string}', async function (username) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(username, 'secret_sauce');
});

Then('I should see the product details page', async function () {
    await this.page.waitForSelector('.inventory_details');
    const detailsContainer = await this.page.locator('.inventory_details');
    expect(await detailsContainer.isVisible()).to.be.true;
});

Then('the price should be {string}', async function (price) {
    const priceElement = await this.page.locator('.inventory_details_price');
    expect(await priceElement.textContent()).to.equal(price);
});

Then('the product description should be visible', async function () {
    const description = await this.page.locator('.inventory_details_desc');
    expect(await description.isVisible()).to.be.true;
});

Then('the shopping cart badge should show {string}', async function (count) {
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).to.equal(count);
});

Then('the product button should say {string}', async function (buttonText) {
    const productButton = await this.page.locator('.btn_secondary.btn_inventory');
    expect(await productButton.textContent()).to.equal(buttonText);
});

Then('products should be sorted by price in descending order', async function () {
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sortedPrices);
});

Then('products should be sorted by price in ascending order', async function () {
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
});

Then('products should be sorted by name in ascending order', async function () {
    const names = await inventoryPage.getProductNames();
    const sortedNames = [...names].sort();
    expect(names).to.deep.equal(sortedNames);
});

Then('the cart should contain {string}', async function (productName) {
    const buttonText = await inventoryPage.getProductButtonText(productName);
    expect(buttonText).to.equal('REMOVE');
});