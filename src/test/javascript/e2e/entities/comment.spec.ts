import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

describe('Comment e2e test', () => {

    let navBarPage: NavBarPage;
    let commentDialogPage: CommentDialogPage;
    let commentComponentsPage: CommentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Comments', () => {
        navBarPage.goToEntity('comment');
        commentComponentsPage = new CommentComponentsPage();
        expect(commentComponentsPage.getTitle())
            .toMatch(/reservedApp.comment.home.title/);

    });

    it('should load create Comment dialog', () => {
        commentComponentsPage.clickOnCreateButton();
        commentDialogPage = new CommentDialogPage();
        expect(commentDialogPage.getModalTitle())
            .toMatch(/reservedApp.comment.home.createOrEditLabel/);
        commentDialogPage.close();
    });

    it('should create and save Comments', () => {
        commentComponentsPage.clickOnCreateButton();
        commentDialogPage.setAuthorNameInput('authorName');
        expect(commentDialogPage.getAuthorNameInput()).toMatch('authorName');
        commentDialogPage.setTextInput('text');
        expect(commentDialogPage.getTextInput()).toMatch('text');
        commentDialogPage.restaurantSelectLastOption();
        commentDialogPage.save();
        expect(commentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CommentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-comment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommentDialogPage {
    modalTitle = element(by.css('h4#myCommentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    authorNameInput = element(by.css('input#field_authorName'));
    textInput = element(by.css('input#field_text'));
    restaurantSelect = element(by.css('select#field_restaurant'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAuthorNameInput = function (authorName) {
        this.authorNameInput.sendKeys(authorName);
    };

    getAuthorNameInput = function () {
        return this.authorNameInput.getAttribute('value');
    };

    setTextInput = function (text) {
        this.textInput.sendKeys(text);
    };

    getTextInput = function () {
        return this.textInput.getAttribute('value');
    };

    restaurantSelectLastOption = function () {
        this.restaurantSelect.all(by.tagName('option')).last().click();
    };

    restaurantSelectOption = function (option) {
        this.restaurantSelect.sendKeys(option);
    };

    getRestaurantSelect = function () {
        return this.restaurantSelect;
    };

    getRestaurantSelectedOption = function () {
        return this.restaurantSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
