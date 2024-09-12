
class checkoutOverviewPage {

    constructor(page) {
        this.page = page;
        this.addCartBtn = '#add-to-cart-sauce-labs-backpack';
        this.cartItemName = "div[class='inventory_item_name']";
        this.qtyLabel = '.cart_quantity_label';
        this.descriptionLbl = '.cart_desc_label';
        this.cancelBtn = '#cancel';
        this.finishBtn = '#finish';
        this.paymentInfo = "div[data-test='payment-info-label']";
        this.shippingInfo = "div[data-test='shipping-info-label']";
        this.priceTotal = "div[data-test='total-info-label']";
        this.itemTotal = ".summary_subtotal_label";
        this.taxTotal = ".summary_tax_label";
        this.orderConfirmMsg = ".complete-header";
        this.sauceCardId = "div[data-test='payment-info-value']";
        this.sauceCardId = "div[data-test='payment-info-value']";
        this.backButtonCompleteOrder = '#back-to-products';

    }


    async finishButtonCheckout() {
        await this.page.locator(this.finishBtn).click()
    }



}

export default checkoutOverviewPage