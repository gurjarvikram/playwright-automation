import { test, expect } from '@playwright/test';
import loginPage from '../pageobjects/loginPage';
import navigationDrawer from '../pageobjects/navigationDrawerPage';

let login;

test.beforeEach(async ({ page }) => {
    login = new loginPage(page);
    await login.gotoLoginPage()

});

test('Verify the data points on the left navigation drawer', async ({ page }) => {


});

test('Logout functionality', async({page})=>{


})

test('Closing the navigation drawer', async({page})=>{

    
})