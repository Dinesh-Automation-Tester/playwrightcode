import { Locator, Page,} from "@playwright/test";


export default class OverviewGridFunctionality {
  private page: Page;
  readonly flightTittle: Locator;
  readonly marketTittle: Locator;
  readonly rulesTittle: Locator;
  readonly adminTittle: Locator;
  readonly overViewTab : Locator;
  readonly analysisTab : Locator;
  readonly demandReview : Locator;
  readonly removeDefaultLeg : Locator;
  readonly applyButton : Locator;
  readonly userEditOption : Locator;
  constructor(page: Page) {

    this.page = page;
    this.flightTittle = page.locator('#menu_item_header_0_0');
    this.marketTittle = page.getByRole('link', { name: 'Market' });
    this.rulesTittle = page.getByRole('link', { name: 'Rules' });
    this.adminTittle = page.getByRole('link', { name: 'Admin' });
    this.overViewTab = page.getByRole('tab', { name: 'Overview' });
    this.analysisTab = page.getByRole('tab', { name: 'Analysis', exact: true });
    this.demandReview= page.getByRole('tab', { name: 'Demand Review' });
    this.removeDefaultLeg = page.locator('#leg-selector span').nth(2);
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.userEditOption= page.locator('.ag-row-odd > div:nth-child(12)').first();
  }
}
