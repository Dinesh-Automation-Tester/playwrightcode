import {test} from "@playwright/test";
import UpgradesPo from "./upgrades.po";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../../../../../../src/utils/Constants";

let upgradesPo: UpgradesPo;

test.describe('Upgrade Tab', () => {

    test.beforeEach('Overlay', async ({page}) => {
        upgradesPo = new UpgradesPo(page);
        await page.goto(ROUTES_FLIGHT_OVERVIEW);

        await upgradesPo.openOverlay();
    });

    test('Verify User Pinch Value with Capacity Upgrade', async () => {
        await upgradesPo.verifyUserPinchValue();
    });

    test.skip('Reset Capacity Upgrade and User pinch value to default', async () => {
        await upgradesPo.resetUpgradeToDefault();
    })
})
