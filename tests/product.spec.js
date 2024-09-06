// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
import { loginPage } from '../pageobjects/loginPage';


test('Searching with an invalid product', async ({ page }) => {
    //Using login with POM
    const login = new loginPage(page);
    await login.gotoLoginPage()
    await login.loginFD()
    const tit_msg = await page.locator("h2[class='h2 mt-2 flex-auto text-xl font-semibold text-gray-800 md:text-2xl lg:mt-0 xl:text-3xl']")
    await expect(tit_msg).toHaveText('Dashboard')
    await expect(page).toHaveURL(/.*dashboard/);

    //redirect to product page
    await page.getByText('Menu').click();
    await page.getByRole('link', { name: 'Product' }).click()
    await expect(page).toHaveURL(/.*product/);

    await page.fill("input[placeholder='Search product']", 'Vikram')
    await page.waitForTimeout(10000);
    await expect(await page.locator("div[class='Card Card--rounded Card--raised Card--seperated Card--padding-normal Card--color-default'] span:nth-child(2)")).toBeVisible()
})