const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);
        this.productList = '.inventory_list';
        this.sortDropdown = '.product_sort_container';
        this.cartBadge = '.shopping_cart_badge';
        this.menuButton = '.bm-burger-button';
        this.logoutLink = '#logout_sidebar_link';
    }

    async addToCart(productName) {
        const productCard = await this.page.locator(`.inventory_item:has-text("${productName}")`);
        await productCard.locator('.btn_primary').click();
    }

    async clickProduct(productName) {
        await this.page.click(`.inventory_item:has-text("${productName}") .inventory_item_name`);
    }

    async sortProducts(sortOption) {
        await this.page.selectOption(this.sortDropdown, sortOption);
    }

    async getProductPrices() {
        return await this.page.$$eval('.inventory_item_price', 
            prices => prices.map(price => parseFloat(price.textContent.replace('$', '')))
        );
    }

    async getProductNames() {
        return await this.page.$$eval('.inventory_item_name', 
            names => names.map(name => name.textContent)
        );
    }

    async getCartBadgeCount() {
        try {
            const badge = await this.page.locator(this.cartBadge);
            return await badge.textContent();
        } catch {
            return "0";
        }
    }

    async logout() {
        await this.click(this.menuButton);
        await this.page.waitForTimeout(1000); // Wait for menu animation
        await this.click(this.logoutLink);
    }

    async getProductButtonText(productName) {
        const productCard = await this.page.locator(`.inventory_item:has-text("${productName}")`);
        return await productCard.locator('.btn_primary, .btn_secondary').textContent();
    }
}

module.exports = InventoryPage;