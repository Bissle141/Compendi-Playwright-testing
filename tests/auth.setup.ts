import {expect, test as setup} from '@playwright/test'

// const authFile = '.auth/user.json'

setup('authentication', async({page}) => {
    await page.goto('http://127.0.0.1:5000/')

    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByPlaceholder('Username').fill('tester')
    await page.getByPlaceholder('Password').fill('password')
    await page.locator('#submit').click()

    // ensure that login has completed by checking for logout button
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()

    await page.context().storageState({path: '.auth/user.json'})
})