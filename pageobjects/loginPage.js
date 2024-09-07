export default class loginPage {

    constructor(page) {
        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButtonLocator = "#login-button";
        this.errorMsg = "h3[data-test='error']";
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async userName(userValue) {
        await this.page.locator(this.usernameInput).fill(userValue);
    }

    async password(pwdValue) {
        await this.page.locator(this.passwordInput).fill(pwdValue);
    }

    async loginButton() {
        await this.page.locator(this.loginButtonLocator).click();
    }

    async loginSwag() {
        await this.page.locator(this.usernameInput).fill('standard_user');
        await this.page.locator(this.passwordInput).fill('secret_sauce');
        await this.page.locator(this.loginButtonLocator).click();
    }
}