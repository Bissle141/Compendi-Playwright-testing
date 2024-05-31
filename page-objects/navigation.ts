import { Page, expect } from "@playwright/test";

export class NavigationPage{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async profilePage(){
        await this.page.getByRole('link').nth(3).click()
        const changePassBtn = this.page.getByRole('button', { name: 'Change Password' })
        await expect(changePassBtn).toBeTruthy()
    }

    async projectsRoot(){
        await this.page.getByRole('button', { name: 'Projects' }).first().click()
        await expect(this.page.getByRole('heading', { name: 'Stats' })).toBeVisible()
    }

    async homePage(){
        await this.page.getByRole('link', { name: 'Compendi' }).click()
        await expect(this.page.getByRole('button', { name: 'See Your Projects' })).toBeVisible()
    }
}