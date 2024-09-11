import { faker } from '@faker-js/faker';

// Generate random details using faker
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postalCode = faker.location.zipCode();

class productPage {

    constructor(page) {
        this.page = page;
        this.productSort = '.product_sort_container';
        this.productTitle = '.title';
        this.shoppingCart = ".shopping_cart_badge";
        this.addCartBtn = '#add-to-cart-sauce-labs-backpack';
        this.cartItemName = "div[class='inventory_item_name']";
        this.qtyLabel = '.cart_quantity_label';
        this.descriptionLbl='.cart_desc_label';
        this.continueBtn = '#continue';
        this.continueShoppingBtn = '#continue-shopping';
        this.checkoutBtn = '#checkout';
        this.removeBtn = '#remove-sauce-labs-backpack';
        this.finishBtn = '#finish';
        this.cancelBtn = '#cancel';
        this.paymentInfo = "div[data-test='payment-info-label']";
        this.shippingInfo = "div[data-test='shipping-info-label']";
        this.priceTotal = "div[data-test='total-info-label']";

    }


    async sortingIcon() {
        // Select all items with the selector `cartItemName`
        const items = await this.page.locator(this.cartItemName).allInnerTexts();
        return [...items].sort();
    }

    async selectZToA() {
        // Select the 'Name (Z to A)' option from the dropdown
        await this.page.locator(this.productSort).selectOption({ label: 'Name (Z to A)' });
    }

    async resultSorting() {
        // Get texts of the items and sort them in descending order
        const texts = await this.page.locator(this.cartItemName).allInnerTexts();
        return [...texts].sort().reverse();
    }

    async add_cart_btn_single_prod() {
        await this.page.locator(this.addCartBtn).click()

    }

    async shopping_cart_badge() {
        await this.page.locator(this.shoppingCart).click()

    }


    async remove_product_cart() {
        await this.page.locator(this.removeBtn).click()

    }



}

export default productPage