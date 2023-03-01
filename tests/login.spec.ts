import { test, expect } from '@playwright/test';
import { UserModel } from './support/fixtures/user.model'
import data from './support/fixtures/user.json'

import { HomePage } from './support/pages/home';
import { LoginPage } from './support/pages/login';

let loginPage: LoginPage
let homePage: HomePage

test.beforeEach(({ page }) => {
  homePage = new HomePage(page)
  loginPage = new LoginPage(page)
})

test.describe('realizar login com sucesso', () => {
  test('realizar login com sucesso', async () => {
    const user: UserModel = data.user

    await loginPage.goToPageLogin()
    await loginPage.optionsLogin('Entrar com email e senha')

    await loginPage.login(user)

    await loginPage.validateLogin()
  })
})

test.describe('tentativa de login', () => {
  test('tentativa de login sem e-mail', async () => {
    const user: UserModel = data.userWithoutEmail

    await loginPage.goToPageLogin()
    await loginPage.optionsLogin('Entrar com email e senha')

    await loginPage.login(user)

    await loginPage.validateAlert()
  })

  test('tentativa de login sem senha', async () => {
    const user: UserModel = data.userWithoutPass

    await loginPage.goToPageLogin()
    await loginPage.optionsLogin('Entrar com email e senha')

    await loginPage.login(user)

    await loginPage.validateAlert()
  })

  test('tentativa de login sem e-mail e sem sengha', async () => {
    const user: UserModel = data.userWithoutEmailAndPass

    await loginPage.goToPageLogin()
    await loginPage.optionsLogin('Entrar com email e senha')

    await loginPage.login(user)

    await loginPage.validateAlert()
  })
})


