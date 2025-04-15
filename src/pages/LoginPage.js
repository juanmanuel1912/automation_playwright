const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '[data-test="error"]';
    }

    async login(username, password) {
        await this.navigateTo('https://www.saucedemo.com/v1/');
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async getErrorMessage() {
        return await this.getText(this.errorMessage);
    }
}

module.exports = LoginPage;