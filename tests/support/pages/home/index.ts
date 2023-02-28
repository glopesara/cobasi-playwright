import { Page } from "@playwright/test"

export class HomePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async go() {
        await this.page.goto('/')
    }

    async goToLogin() {
        const target = this.page.locator('//a[text()="Entre ou cadastre-se"]')
        await target.click()
    }
}