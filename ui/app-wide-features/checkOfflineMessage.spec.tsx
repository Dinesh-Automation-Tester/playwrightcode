import {test} from "@playwright/test";

import {ROUTES_HOME} from "../../../src/utils/Constants";
import CheckOfflineMessagePo from "./checkOfflineMessage.po";

test.describe("Offline Message", () => {
    test.beforeEach(async ({page}) => {
        await page.goto(ROUTES_HOME);
        await page.waitForLoadState("networkidle", {
            timeout: 50000,
        });
    });

    test("should display offline message when browser goes offline", async ({
                                                                                page,
                                                                            }) => {
        const offlineMessagePO = new CheckOfflineMessagePo(page);
        await offlineMessagePO.setOffline();
        await offlineMessagePO.verifyIfOfflineTextVisible();

        await page.context().setOffline(false);
        await offlineMessagePO.verifyIfOfflineTextHidden();
    });

    test("should not display offline message when browser is online", async ({
                                                                                 page,
                                                                             }) => {
        const offlineMessagePO = new CheckOfflineMessagePo(page);
        await offlineMessagePO.setOnline();
        await offlineMessagePO.verifyIfOfflineTextHidden();
    });
});
