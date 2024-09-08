import { time } from "console";

export default class navigationBar {

    constructor(page) {
        this.page = page;
        this.menuIcon = '#react-burger-menu-btn';
        this.drawerItemMenu = '.bm-item.menu-item';
        this.aboutMenu = '#about_sidebar_link';
        this.Cross_Btn = '#react-burger-cross-btn';
        this.logOutLocator = '#logout_sidebar_link'

    }

    async navigationDrawerMenu() {
        const menuIconLocator = this.page.locator(this.menuIcon);
        await menuIconLocator.waitFor({ state: 'visible' })
        await menuIconLocator.click();

    }

    async logOut() {
        await this.page.locator(this.logOutLocator).click()

    }

    async closingDrawer() {
        await this.page.locator(this.Cross_Btn).click()

    }


}