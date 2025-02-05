import {type Locator, type Page} from "@playwright/test";

export class UserManagementSection {
    readonly page: Page;
    readonly usersTab: Locator;

    readonly marketsLegsButton: Locator;
    readonly editRoleButtonUser: Locator;
    readonly deleteRoleButtonUser: Locator;

    constructor(page: Page) {
        this.page = page;
        this.marketsLegsButton = page
            .locator("[col-id='actions'] .spark-icon-cog")
            .nth(0);
        this.editRoleButtonUser = page.getByRole('row', {name: 'Local User localuser@'}).getByLabel('Edit role');
        this.deleteRoleButtonUser = page.getByRole('row', {name: 'Local User localuser@'}).getByLabel('Delete User');
    }
}
