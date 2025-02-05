import OverlayPo from "../overlay.po";
import {Locator, Page, expect} from "@playwright/test";

export default class NotesPO extends OverlayPo {
    readonly noteButton: Locator;
    readonly noteInputField: Locator;
    readonly saveNoteBtn: Locator;
    readonly deleteNoteBtn: Locator;
    readonly notedText: Locator;
    readonly noteActionMenu: Locator;
    readonly noteEditButton: Locator;
    readonly noteDeleteButton: Locator;
    readonly closeNoteModal: Locator;
    readonly updatedNoteText: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        super(page);

        this.noteButton = page.locator('.cro-overlay-toolbar .notes-icon-button');
        this.noteInputField = page.locator('input[name="note"]');
        this.saveNoteBtn = page.locator('button', {hasText: 'Save'});
        this.deleteNoteBtn = page.locator('button', {hasText: 'Delete'});
        this.cancelButton = page.locator('button', {hasText: 'Cancel'}).nth(0);
        this.notedText = page.locator('#scroll-content >> text="For testing purpose"');
        this.updatedNoteText = page.locator('#scroll-content >> text="For testing purpose only"');
        this.noteActionMenu = page.locator('button[title="Note actions"]');
        this.noteEditButton = page.locator('.note-action--edit');
        this.noteDeleteButton = page.locator('.note-action--delete');
        this.closeNoteModal = page.locator('.spark-modal__close.spark-icon-close');
    }

    async verifyAddingNote(): Promise<void> {
        const note = 'For testing purpose';
        await this.noteButton.click();
        await this.noteInputField.fill(note);
        await this.saveNoteBtn.click();

        await this.closeNoteModal.waitFor({state: 'hidden', timeout: 2000});

        await this.noteButton.click();
        await expect(this.notedText).toHaveText(note);
        await this.closeNoteModal.click();
    }

    async cancelEditNote(): Promise<void> {
        const note = 'For testing purpose';
        await this.noteButton.click();
        if (await this.notedText.textContent()) {
            await this.noteActionMenu.click();
            await this.noteEditButton.click();
            await this.cancelButton.click();
            await expect(this.notedText).toHaveText(note, {timeout: 5000});
        }
        await this.closeNoteModal.click();
    }

    async verifyEditingNote(): Promise<void> {
        const newNote = 'For testing purpose only';
        await this.noteButton.click();
        await this.noteActionMenu.click();
        await this.noteEditButton.click();
        if (this.notedText) {
            await this.noteInputField.fill(newNote);
            await this.saveNoteBtn.click();
        }
        await expect(this.updatedNoteText).toHaveText(newNote);
        await this.closeNoteModal.click();
    }

    async cancelDeleteNote(): Promise<void> {
        const noteText = 'For testing purpose only';

        await this.noteButton.waitFor({state: 'visible'});
        await this.noteButton.click();

        await this.noteActionMenu.waitFor({state: 'visible'});
        await this.noteActionMenu.click();

        await this.noteDeleteButton.waitFor({state: 'visible'});
        await this.noteDeleteButton.click();

        await this.cancelButton.waitFor({state: 'visible'});
        await this.cancelButton.click();

        await this.updatedNoteText.waitFor({state: 'visible'});
        await expect(this.updatedNoteText).toHaveText(noteText);

        if (await this.closeNoteModal.isVisible()) {
            await this.closeNoteModal.click();
        }
    }

    async verifyDeletingNote(): Promise<void> {
        await this.noteButton.waitFor({state: 'visible'});
        await this.noteButton.click();

        await this.noteActionMenu.waitFor({state: 'visible'});
        await this.noteActionMenu.click();

        await this.noteDeleteButton.waitFor({state: 'visible'});
        await this.noteDeleteButton.click();

        await this.deleteNoteBtn.waitFor({state: 'visible'});
        await this.deleteNoteBtn.click();

        await expect(this.notedText).not.toBeVisible({timeout: 2000});

        await this.closeNoteModal.waitFor({state: 'visible'});
        await this.closeNoteModal.click();
    }

    async verifyCloseNoteButton(): Promise<void> {
        await this.noteButton.click();
        await this.closeNoteModal.click();
    }
}
