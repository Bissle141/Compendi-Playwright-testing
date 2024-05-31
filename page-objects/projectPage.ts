import { Page, expect } from "@playwright/test";

export class ProjectsPage{

    private readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    /**
     * This method will create a new project for you with name and desc 
     * @param projectName 
     * @param projectDesc 
     */
    async createNewProjectWithNameAndDesc(projectName: string, projectDesc: string){
        //if test project exists delete it first so we dont dupe
        if (this.page.getByRole('link', { name: projectName })) {
            await this.page.getByRole('link', { name: projectName }).locator('..').getByRole('button', { name: 'delete' }).click()
        }
        
        await this.page.getByRole('button', { name: 'add_circle' }).click();
        await this.page.getByLabel('Project Name').fill(projectName);
        await this.page.getByLabel('Description').fill(projectDesc);
        await this.page.getByRole('button', { name: 'Create' }).click();
    }
    /**
     * 
     * @param name - the name of your new folder/file
     * @param folder - boolean, true for folder or false for file
     */
    async createNewFolderOrFileInProjectWithName(name: string, folder: boolean){
        await this.page.getByRole('button', { name: 'add_circle' }).click()

        if (folder == true) {
            await this.page.getByLabel('Folder').check()
        } else {
            await this.page.getByLabel('File').check()
        }

        await this.page.getByLabel('name', { exact: true }).fill(name)
        await this.page.getByRole('button', { name: 'Create' }).click()
    }


    async createNewSectionWithSectionNameAndSectionBody(sectionName: string, sectionBody: string){
        await this.page.getByRole('button', { name: 'add', exact: true }).click()
        await this.page.getByPlaceholder('Section Name').fill(sectionName)
        await this.page.getByPlaceholder('...').click()
        await this.page.getByPlaceholder('...').fill(sectionBody)
        await this.page.getByRole('button', { name: 'Create' }).click()

        await this.page.getByRole('button', { name: sectionName }).click()
    }

    async addImageToFileWithImageLink(imageURL:string){
        await this.page.getByRole('button', { name: 'add_photo_alternate' }).click()
        await this.page.frameLocator('[data-test="uw-iframe"]').locator('[data-test="search-input-box"]').fill(imageURL)
        await this.page.frameLocator('[data-test="uw-iframe"]').locator('[data-test="upload-from-link-btn"]').click()
    }
    
}