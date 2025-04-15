const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

let browser;
let page;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    this.page = page;
});

AfterStep(async function ({ result, pickleStep }) {
    if (result.status === Status.FAILED) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
        
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        const screenshot = await this.page.screenshot({
            path: path.join(screenshotDir, `${pickleStep.text}-${timestamp}.png`),
            fullPage: true
        });

        // Adjuntar la captura al reporte
        await this.attach(screenshot, 'image/png');
    }
});

After(async function ({ result }) {
    if (result.status === Status.FAILED) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
        
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }

        const screenshot = await this.page.screenshot({
            path: path.join(screenshotDir, `failure-${timestamp}.png`),
            fullPage: true
        });

        // Adjuntar la captura al reporte
        await this.attach(screenshot, 'image/png');
    }

    if (browser) {
        await browser.close();
    }
});