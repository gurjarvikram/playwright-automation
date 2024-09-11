// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import loginPage from '../pageobjects/loginPage';
import productPage from '../pageobjects/productPage';


const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const streetAddress = faker.location.streetAddress();

let login;
let prod;

test.beforeEach(async ({ page }) => {
    login = new loginPage(page);
    await login.gotoLoginPage()
    await login.loginSwag();

    prod = new productPage(page)

});

test('Sorting products from Z to A', async ({ page }) => {
    await expect(page.locator(prod.productTitle)).toHaveText('Products');

    // Get items sorted by default
    const defaultSortedItems = await prod.sortingIcon();

    // Select Z to A option
    await prod.selectZToA();

    // Wait for items to be sorted
    const sortedItems = await prod.resultSorting();

    // Verify that the sorted items are sorted in descending order
    expect(sortedItems).toEqual(defaultSortedItems.reverse());

});


test('Add and remove product from cart', async ({ page }) => {
    //add prdouct to the cart
    await prod.add_cart_btn_single_prod()

    // Navigate to the shopping cart
    await prod.shopping_cart_badge()
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    

    //Your cart page assertion
    await expect(page.locator(prod.productTitle)).toHaveText('Your Cart')
    await expect(page.locator(prod.qtyLabel)).toContainText('QTY')
    await expect(page.locator(prod.descriptionLbl)).toContainText('Description')
    await expect(page.locator(prod.removeBtn)).toHaveText('Remove')
    await expect(page.locator(prod.continueShoppingBtn)).toHaveText('Continue Shopping')
    await expect(page.locator(prod.checkoutBtn)).toHaveText('Checkout')
    await expect(page.locator(prod.cartItemName)).toBeVisible()

     // Remove product from the cart
    await prod.remove_product_cart()

    //// Ensure the product is removed from the cart
    await expect(page.locator(prod.cartItemName)).not.toBeVisible();

    //Ensure the cart badge is empty
    await expect(page.locator(prod.shoppingCart)).not.toBeVisible();


});


// test('Verifying validation for Checkout: Your Information', async ({ page }) => {


// });

// test('Checkout process with single product', async ({ page }) => {


// });

// test('Checkout process with multiple products', async ({ page }) => {


// });