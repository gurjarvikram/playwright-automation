import { faker } from '@faker-js/faker';

// Generate random details using faker
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postalCode = faker.location.zipCode();

class productPage {

    constructor(page) {
        this.page = page;
        this.productSort = '.product_sort_container';
        this.productTitle = '.title';       // Common locator for all left-side page titles
        this.shoppingCart = ".shopping_cart_badge";
        this.addCartBtn = '#add-to-cart-sauce-labs-backpack';
        this.cartItemName = "div[class='inventory_item_name']";
        this.qtyLabel = '.cart_quantity_label';
        this.descriptionLbl = '.cart_desc_label';
        this.continueBtn = '#continue';
        this.continueShoppingBtn = '#continue-shopping';
        this.checkoutBtn = '#checkout';
        this.removeBtn = '#remove-sauce-labs-backpack';
        this.multipleProductLocator = '.inventory_item_description';

        this.firstNameLoc = "#first-name";
        this.lastNameLoc = "#last-name";
        this.zipCodeLoc = "#postal-code";


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

    async clickCheckoutButton() {
        await this.page.locator(this.checkoutBtn).click()
    }

    async continueButtonClick() {
        await this.page.locator(this.continueBtn).click()
    }

    async firstNameInput() {
        await this.page.locator(this.firstNameLoc).fill(firstName)
    }

    async lastNameInput() {
        await this.page.locator(this.lastNameLoc).fill(lastName)
    }

    async zipCodeInput() {
        await this.page.locator(this.zipCodeLoc).fill(postalCode)
    }

    async addFirstTwoProducts() {
        const productLocator = this.page.locator(this.multipleProductLocator);
    
        // Add only the first two visible products
        for (let i = 0; i < 2; i++) {
            const product = productLocator.nth(i);
    
            if (await product.isVisible()) {
                console.log(`Adding product ${i + 1} to cart`);
                await product.locator('text="Add to cart"').click();
                await this.page.waitForTimeout(1000); // Ensure product is added
            }
        }
    }
    



}

export default productPage