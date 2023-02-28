import { UserModel } from './../../fixtures/user.model';
import { Page, expect } from '@playwright/test';
import { HomePage } from '../home'

export class LoginPage {
    readonly homePage: HomePage
    readonly page: Page

    constructor(page: Page) {
        this.page = page
        this.homePage = new HomePage(page)
    }

    async goToPageLogin() {
        await this.homePage.go()

        await this.homePage.goToLogin()
    }

    async optionsLogin(option: string) {
        switch (option) {
            case 'Entrar com email e senha':
                await this.page.click(`css=span >> text=${option}`)
                break;
            default:
                console.log(`não existe a opição: ${option}.`);
                break;
        }
    }

    async login(user: UserModel) {
        const inputEmail = this.page.locator('#email')
        await inputEmail.fill(user.email)

        const inputPassword = this.page.locator('#password')
        await inputPassword.fill(user.pass)

        await this.page.click('css=button >> text=Entrar')
    }

    async validateLogin() {
        const validate = this.page.locator('css=span >> text=Olá')
        await expect(validate).toBeVisible()
    }
}