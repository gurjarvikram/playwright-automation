//const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
import loginPage from '../pageobjects/loginPage';

let login;

test.beforeEach(async ({ page }) => {
    login = new loginPage(page);
    await login.gotoLoginPage();
});

test('Verify the validation for login page', async ({ page }) => {
    await login.loginButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    // Check for the correct error message
    await expect(page.locator(login.errorMsg)).toContainText('Epic sadface: Username is required');
});

test('Unsuccessful login due to invalid credentials', async ({ page }) => {
    await login.userName('fakeusername');
    await login.password('fakepwd');
    await login.loginButton();
    // Verify error message for incorrect credentials
    await expect(page.locator(login.errorMsg)).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Successful login with valid credentials', async ({ page }) => {
    await login.loginSwag();
    // Wait for the element to be visible
    await page.locator(login.titleInventory).waitFor({ state: 'visible' });
    // Assert the title of the page
    await expect(page).toHaveTitle('Swag Labs');
});