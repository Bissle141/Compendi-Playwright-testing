// IMPORTS
import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';


test.beforeEach(async({page}) => {
  await page.goto('http://127.0.0.1:5000/')
  await expect(await page.getByRole('link', { name: 'Compendi' })).toContainText('Compendi')

})

test.describe('Profile Tests', () => {
  const profilePicURL = 'https://i.pinimg.com/originals/7f/75/e0/7f75e0befab8096ae9443a2d6b7ce71a.jpg'

    test('add profile picture', async({page}) => {
      const pm = new PageManager(page)
      await pm.navigateTo().profilePage()

      await page.getByRole('button', { name: 'add_a_photo' }).click();
      await page.frameLocator('[data-test="uw-iframe"]').locator('[data-test="search-input-box"]').fill(profilePicURL)
      await page.frameLocator('[data-test="uw-iframe"]').locator('[data-test="upload-from-link-btn"]').click()

      // Profile alt text is only 'ProfilePicture' if one has been set, otherwise it is 'DefaultAvatar' so this checks that the change has occured
      await expect(page.getByAltText('ProfilePicture')).toBeTruthy()
  })
})


test.describe('Project Tests', () =>{
  const testProjectName = 'Test Project'
  const testProjectDesc ='Test project description'
  const testFolder = 'Test Folder'
  const testFile = 'Test File'
  const testSection = 'Test Section'
  const testSectionBody = 'Test Section Body'
  const testImage = 'https://i.pinimg.com/originals/c5/04/a4/c504a4cb6903ec98c7a3497449837b21.jpg'
  

  test.beforeEach(async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().projectsRoot()
  })

  test('add test project', async({page}) => {
    const pm = new PageManager(page)

    await pm.onProjectPage().createNewProjectWithNameAndDesc(testProjectName,testProjectDesc)

    await expect(page.getByRole('link', { name: testProjectName })).toBeTruthy()
  })

  test('add test folder and file', async({page}) => {
    const pm = new PageManager(page)
  
    //first create a test project for the new folder and navigate into it
    await pm.onProjectPage().createNewProjectWithNameAndDesc(testProjectName,testProjectDesc)
    await page.getByRole('link', { name: testProjectName }).click()

    await pm.onProjectPage().createNewFolderOrFileInProjectWithName(testFolder,true)
    await expect(page.getByRole('link', { name: `folder ${testFolder}` })).toBeTruthy()

    await pm.onProjectPage().createNewFolderOrFileInProjectWithName(testFile,false)
    await expect(page.getByRole('link', { name: `folder ${testFile}` })).toBeTruthy()
  })

  test('add new file section', async({page}) => {
    const pm = new PageManager(page)

    //first need to create a new project and then a file in that project
    await pm.onProjectPage().createNewProjectWithNameAndDesc(testProjectName,testProjectDesc)
    await page.getByRole('link', { name: testProjectName }).click()
    await pm.onProjectPage().createNewFolderOrFileInProjectWithName(testFile,false)
    await expect(page.getByRole('link', { name: `folder ${testFile}` })).toBeTruthy()

    //nav into the new file
    await page.getByRole('link', { name: `article ${testFile}` }).click()

    await pm.onProjectPage().createNewSectionWithSectionNameAndSectionBody(testSection, testSectionBody)

    await expect(page.getByRole('button', { name: testSection })).toContainText(testSection)
  })

  test('add new file image', async({page}) => {
    const pm = new PageManager(page)
    
    //need to make new project, nav in, make a new file, nav in, then add new image
    await pm.onProjectPage().createNewProjectWithNameAndDesc(testProjectName,testProjectDesc)
    await page.getByRole('link', { name: testProjectName }).click()
    await pm.onProjectPage().createNewFolderOrFileInProjectWithName(testFile,false)
    await expect(page.getByRole('link', { name: `folder ${testFile}` })).toBeTruthy()

    //nav into the new file
    await page.getByRole('link', { name: `article ${testFile}` }).click()

    await pm.onProjectPage().addImageToFileWithImageLink(testImage)

    await expect(page.locator('#galleryCarousel')).toBeTruthy()
  })

})

