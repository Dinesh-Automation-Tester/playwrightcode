import NotesPO from "./notes.po";
import {test} from "@playwright/test";
import {ROUTES_FLIGHT_OVERVIEW} from "../../../../../../../../src/utils/Constants";

let notePO: NotesPO;

test.describe('Notes Functionality Tests', () => {
    test.beforeEach(async ({page}) => {
        notePO = new NotesPO(page);
        await page.goto(ROUTES_FLIGHT_OVERVIEW);
        await notePO.openOverlay();
    });

    test('Verify that the Note button opens the note dialog and allows commenting', async () => {
        await notePO.verifyAddingNote();
    });

    test('Confirm User Can Cancel Note Edit', async () => {
        await notePO.cancelEditNote();
    });

    test('Verify User Can Successfully Edit a Note', async () => {
        await notePO.verifyEditingNote();
    });

    test('Confirm User Can Cancel Note Delete', async () => {
        await notePO.cancelDeleteNote();
    });

    test('Verify User Can Successfully Delete a Note', async () => {
        await notePO.verifyDeletingNote();
    });

    test('Confirm User Can Close Note Modal', async () => {
        await notePO.verifyCloseNoteButton();
    });
});
