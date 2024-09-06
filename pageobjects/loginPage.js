
class loginPage {

    constructor(page) {
        this.page = page;
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = "#login-button";
    }
    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com')
    }
    async loginFD() {
        await this.page.locator(this.usernameInput).fill('standard_user');
        await this.page.locator(this.passwordInput).fill('secret_sauce');
        await this.page.locator(this.loginButton).click();    
    }

}
module.exports = loginPage;