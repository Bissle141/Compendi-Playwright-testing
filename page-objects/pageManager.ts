import { Page, expect } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigation';
import { ProjectsPage } from '../page-objects/projectPage';

export class PageManager{

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly projectsPage: ProjectsPage

    constructor(page:Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.projectsPage = new ProjectsPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onProjectPage(){
        return this.projectsPage
    }
}