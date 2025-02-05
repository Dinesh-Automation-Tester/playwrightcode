import {test} from "@playwright/test";
import AnalysisPo from "./analysis.po";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../src/utils/Constants";

let analysisPo: AnalysisPo;

test.describe("Analysis Page", () => {

    test.beforeEach('Overlay Testing', async ({page}) => {
        analysisPo = new AnalysisPo(page);
        await page.goto(ROUTES_FLIGHT_OVERVIEW);

        await analysisPo.gotoAnalysisPage();
    });

    test('', async () => {
    })
});
