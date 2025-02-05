import {test} from "@playwright/test";
import OptimizationPo from './optimization.po';
import {ROUTES_FLIGHT_ANALYSIS} from "../../../../../../../../../src/utils/Constants";

let optimizationPo: OptimizationPo;

test.describe('Services Tab', () => {

    test.beforeEach('Overlay', async ({page}) => {
        optimizationPo = new OptimizationPo(page);
        await page.goto(ROUTES_FLIGHT_ANALYSIS);
        await optimizationPo.openOverlay();
    });

    test('Verify Optimized Flight Details and Optimization Status', async () => {
        const validStatuses = ['Pending', 'Failed'];
        await optimizationPo.sendOptimizationRequest();
        await optimizationPo.goToOptimizationTab();
        await optimizationPo.verifyFlightInformation();
        await optimizationPo.verifyFlightOptimizationStatus(validStatuses);
    });
});
