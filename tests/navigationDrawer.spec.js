import { test, expect } from '@playwright/test';
import loginPage from '../pageobjects/loginPage';
import navigationBar from '../pageobjects/navigationDrawerPage';

let login;
let navBar;

test.beforeEach(async ({ page }) => {
    login = new loginPage(page);
    await login.gotoLoginPage()
    await login.loginSwag();

    navBar = new navigationBar(page)

});

test('Verify the data points on the left navigation drawer', async ({ page }) => {
    await navBar.navigationDrawerMenu()
    await expect(page.locator(navBar.drawerItemMenu).nth(0)).toHaveText('All Items');
    await expect(page.locator(navBar.drawerItemMenu).nth(1)).toHaveText('About');
    await expect(page.locator(navBar.drawerItemMenu).nth(2)).toHaveText('Logout');
    await expect(page.locator(navBar.drawerItemMenu).nth(3)).toHaveText('Reset App State');

});

test('Logout functionality', async ({ page }) => {
    await navBar.navigationDrawerMenu()
    await navBar.logOut()
    await expect(page.locator(navBar.drawerItemMenu)).toBeHidden()
})

test('Closing the navigation drawer', async ({ page }) => {
    await navBar.navigationDrawerMenu()
    await navBar.closingDrawer()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

})
