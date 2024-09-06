//const { test, expect } = require('@playwright/test');
import {test, expect} from '@playwright/test';


test('Navigate to the login page', async ({browser}) => {
    
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://www.google.com/')
    console.log(await page.title());
    expect(page).toHaveTitle('GoogleTest')

})

test('Succcessfully login functionality', async ({page}) => {    

    await page.goto('https://www.saucedemo.com')
    console.log(await page.title());
    expect(page).toHaveTitle('Swag Labs')

})