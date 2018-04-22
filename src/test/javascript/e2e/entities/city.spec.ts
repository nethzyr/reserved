import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('City e2e test', () => {

    let navBarPage: NavBarPage;
    let cityDialogPage: CityDialogPage;
    let cityComponentsPage: CityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cities', () => {
        navBarPage.goToEntity('city');
        cityComponentsPage = new CityComponentsPage();
        expect(cityComponentsPage.getTitle())
            .toMatch(/reservedApp.city.home.title/);

    });

    it('should load create City dialog', () => {
        cityComponentsPage.clickOnCreateButton();
        cityDialogPage = new CityDialogPage();
        expect(cityDialogPage.getModalTitle())
            .toMatch(/reservedApp.city.home.createOrEditLabel/);
        cityDialogPage.close();
    });

   /* it('should create and save Cities', () => {
        cityComponentsPage.clickOnCreateButton();
        cityDialogPage.setNameInput('name');
        expect(cityDialogPage.getNameInput()).toMatch('name');
        cityDialogPage.stateCountySelectLastOption();
        cityDialogPage.save();
        expect(cityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-city div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CityDialogPage {
    modalTitle = element(by.css('h4#myCityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    stateCountySelect = element(by.css('select#field_stateCounty'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    stateCountySelectLastOption = function() {
        this.stateCountySelect.all(by.tagName('option')).last().click();
    };

    stateCountySelectOption = function(option) {
        this.stateCountySelect.sendKeys(option);
    };

    getStateCountySelect = function() {
        return this.stateCountySelect;
    };

    getStateCountySelectedOption = function() {
        return this.stateCountySelect.element(by.css('option:checked')).getText();
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
