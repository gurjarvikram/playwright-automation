// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import loginPage from '../pageobjects/loginPage';
import productPage from '../pageobjects/productPage';
import checkoutOverviewPage from '../pageobjects/checkoutOverviewPage';


const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const streetAddress = faker.location.streetAddress();

let login;
let prod;
let checkOverview;

test.beforeEach(async ({ page }) => {
    login = new loginPage(page);
    prod = new productPage(page)
    checkOverview = new checkoutOverviewPage(page)

    await login.gotoLoginPage()
    await login.loginSwag();
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
    await expect(page.locator(prod.productTitle)).toBeVisible()

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


test('Verifying validation for Checkout: Your Information', async ({ page }) => {
    // Add a single product to the cart
    await prod.add_cart_btn_single_prod()

    // Navigate to the shopping cart
    await prod.shopping_cart_badge()
    await expect(page.locator(prod.productTitle)).toBeVisible()  //Your Cart

    // Proceed to the checkout page and verify the title and URL
    await prod.clickCheckoutButton()
    await expect(page.locator(prod.productTitle)).toHaveText('Checkout: Your Information')  //Checkout: Your Information
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')

    // Attempt to continue without filling out the customer information
    await prod.continueButtonClick()
    await expect(page.locator(login.errorMsg)).toHaveText('Error: First Name is required')

    await prod.firstNameInput()
    await prod.continueButtonClick()
    await expect(page.locator(login.errorMsg)).toHaveText('Error: Last Name is required')

    await prod.firstNameInput()
    await prod.lastNameInput()
    await prod.continueButtonClick()
    await expect(page.locator(login.errorMsg)).toHaveText('Error: Postal Code is required')


});

test('Checkout process with single product', async ({ page }) => {
    // Add a single product to the cart
    await prod.add_cart_btn_single_prod()

     // Navigate to the shopping cart page and verify the cart is displayed
    await prod.shopping_cart_badge()
    await expect(page.locator(prod.productTitle)).toBeVisible()

    // Proceed to the checkout page and verify the title
    await prod.clickCheckoutButton()
    await expect(page.locator(prod.productTitle)).toHaveText('Checkout: Your Information')

    // Fill out the customer information form and submit
    await prod.firstNameInput()
    await prod.lastNameInput()
    await prod.zipCodeInput()
    await prod.continueButtonClick()

    // Verify that the user is taken to the checkout overview page and validate the details
    await expect(page.locator(prod.productTitle)).toHaveText('Checkout: Overview')   //Checkout: Overview
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    await expect(page.locator(prod.qtyLabel)).toContainText('QTY')
    await expect(page.locator(prod.descriptionLbl)).toContainText('Description')
    await expect(page.locator(prod.cartItemName)).toContainText('Sauce Labs Backpack')
    await expect(page.locator(checkOverview.cancelBtn)).toBeVisible()
    await expect(page.locator(checkOverview.finishBtn)).toBeVisible()
    await expect(page.locator(checkOverview.paymentInfo)).toHaveText('Payment Information:')    
    await expect(page.locator(checkOverview.shippingInfo)).toContainText('Shipping Information:')
    await expect(page.locator(checkOverview.priceTotal)).toContainText('Price Total')
    await expect(page.locator(checkOverview.itemTotal)).toBeVisible()
    await expect(page.locator(checkOverview.taxTotal)).toBeVisible()

    await checkOverview.finishButtonCheckout()
    // Complete the order and verify the confirmation message
    await expect(page.locator(checkOverview.orderConfirmMsg)).toContainText('Thank you for your order!')  
    await page.locator(prod.productPage).waitFor;
    const wool = await page.locator(prod.productTitle).isVisible()  //Checkout: Complete!
    console.log(wool);
    expect(wool).toBeTruthy;
    await expect(page.locator(checkOverview.backButtonCompleteOrder)).toBeVisible() //Back home button

});

test('Checkout process with multiple products', async ({ page }) => {


});