class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async waitForElement(selector) {
        await this.page.waitForSelector(selector);
    }

    async click(selector) {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    async fill(selector, text) {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    async getText(selector) {
        await this.waitForElement(selector);
        return await this.page.textContent(selector);
    }
}

module.exports = BasePage;