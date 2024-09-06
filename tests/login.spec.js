//const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
import loginPage from '../pageobjects/loginPage';


let login; // Declare the loginPage object globally

test.beforeEach(async ({ page }) => {
    // Instantiate the loginPage object before each test
    login = new loginPage(page);
    await login.gotoLoginPage(); //Navigate to the login page
});


test('Verify the validation for login page', async ({ page }) => {

    await login.loginValidation()
    await page.waitForTimeout(3000)

    await expect(page).toHaveURL('https://www.saucedemo.com/')

})

test('Successful login with valid credentials', async ({ page }) => {

    await login.loginSwag()
    console.log(await page.title());
    await page.waitForTimeout(3000)

    await expect(page).toHaveTitle('Swag Labs')

})