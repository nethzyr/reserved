import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StateCounty e2e test', () => {

    let navBarPage: NavBarPage;
    let stateCountyDialogPage: StateCountyDialogPage;
    let stateCountyComponentsPage: StateCountyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StateCounties', () => {
        navBarPage.goToEntity('state-county');
        stateCountyComponentsPage = new StateCountyComponentsPage();
        expect(stateCountyComponentsPage.getTitle())
            .toMatch(/reservedApp.stateCounty.home.title/);

    });

    it('should load create StateCounty dialog', () => {
        stateCountyComponentsPage.clickOnCreateButton();
        stateCountyDialogPage = new StateCountyDialogPage();
        expect(stateCountyDialogPage.getModalTitle())
            .toMatch(/reservedApp.stateCounty.home.createOrEditLabel/);
        stateCountyDialogPage.close();
    });

   /* it('should create and save StateCounties', () => {
        stateCountyComponentsPage.clickOnCreateButton();
        stateCountyDialogPage.setNameInput('name');
        expect(stateCountyDialogPage.getNameInput()).toMatch('name');
        stateCountyDialogPage.countrySelectLastOption();
        stateCountyDialogPage.save();
        expect(stateCountyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StateCountyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-state-county div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StateCountyDialogPage {
    modalTitle = element(by.css('h4#myStateCountyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    countrySelect = element(by.css('select#field_country'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    countrySelectLastOption = function() {
        this.countrySelect.all(by.tagName('option')).last().click();
    };

    countrySelectOption = function(option) {
        this.countrySelect.sendKeys(option);
    };

    getCountrySelect = function() {
        return this.countrySelect;
    };

    getCountrySelectedOption = function() {
        return this.countrySelect.element(by.css('option:checked')).getText();
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
