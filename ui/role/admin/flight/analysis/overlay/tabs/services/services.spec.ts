import ServicesPo from "./services.po";
import {test, expect} from "@playwright/test";
import {ROUTES_FLIGHT_ANALYSIS} from "../../../../../../../../../src/utils/Constants";

let servicesPo: ServicesPo;

test.describe('Services Tab', () => {
    test.beforeEach('Overlay', async ({page}) => {
        servicesPo = new ServicesPo(page);
        await page.goto(ROUTES_FLIGHT_ANALYSIS);

        await servicesPo.openOverlay();
        await servicesPo.goToServiceTab();
    });

    test('Verify the default chart view', async () => {
        const axisLabels = await servicesPo.getChartAxisLabels('Bookings');
        const dataPointsCount = await servicesPo.getDataPointsCount();

        expect(axisLabels).toContain('Bookings');
        expect(dataPointsCount).toBeGreaterThan(0);
    });

    test('Validate Metric toggle functionality in the chart', async () => {
        await servicesPo.selectMetricToggle('Revenue');
        const axisLabels = await servicesPo.getChartAxisLabels('Revenue');
        expect(axisLabels).toContain('Revenue');
    });

    test('Verify Cabin toggle functionality in the chart', async () => {
        await servicesPo.selectCabinToggle('C');
        const dataPointsCount = await servicesPo.getDataPointsCount();
        expect(dataPointsCount).toBeGreaterThan(0);
    });

    test('Validate current vs. expected data representation in the chart', async () => {
        const dataPointsCount = await servicesPo.getDataPointsCount();
        expect(dataPointsCount).toBeGreaterThan(1);
    });

    test('Verify axis labels and data points on the chart', async () => {
        const axisLabels = await servicesPo.getChartAxisLabels('Bookings');
        const dataPointsCount = await servicesPo.getDataPointsCount();

        expect(axisLabels).toContain('Bookings');
        expect(dataPointsCount).toBeGreaterThan(0);
    });

    test('Verify Axis Label Visibility for All Metrics', async () => {
        const metrics = ['Bookings', 'Revenue', 'Avg Fare']; // Add all available metrics
        for (const metric of metrics) {
            await servicesPo.selectMetricToggle(metric);
            const axisLabels = await servicesPo.getChartAxisLabels(metric);
            expect(axisLabels).toContain(metric);
        }
    });

    test('Validate expand/collapse functionality in the grid table', async () => {
        const rowCount = await servicesPo.getRowCount();
        expect(rowCount).toBeGreaterThan(0);

        await servicesPo.expandRow(0);
        await servicesPo.collapseRow(0);
    });
});
