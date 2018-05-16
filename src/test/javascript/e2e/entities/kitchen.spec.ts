import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

describe('Kitchen e2e test', () => {

    let navBarPage: NavBarPage;
    let kitchenDialogPage: KitchenDialogPage;
    let kitchenComponentsPage: KitchenComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Kitchens', () => {
        navBarPage.goToEntity('kitchen');
        kitchenComponentsPage = new KitchenComponentsPage();
        expect(kitchenComponentsPage.getTitle())
            .toMatch(/reservedApp.kitchen.home.title/);

    });

    it('should load create Kitchen dialog', () => {
        kitchenComponentsPage.clickOnCreateButton();
        kitchenDialogPage = new KitchenDialogPage();
        expect(kitchenDialogPage.getModalTitle())
            .toMatch(/reservedApp.kitchen.home.createOrEditLabel/);
        kitchenDialogPage.close();
    });

    it('should create and save Kitchens', () => {
        kitchenComponentsPage.clickOnCreateButton();
        kitchenDialogPage.setTypeEngInput('typeEng');
        expect(kitchenDialogPage.getTypeEngInput()).toMatch('typeEng');
        kitchenDialogPage.setTypeHunInput('typeHun');
        expect(kitchenDialogPage.getTypeHunInput()).toMatch('typeHun');
        kitchenDialogPage.save();
        expect(kitchenDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class KitchenComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-kitchen div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class KitchenDialogPage {
    modalTitle = element(by.css('h4#myKitchenLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    typeEngInput = element(by.css('input#field_typeEng'));
    typeHunInput = element(by.css('input#field_typeHun'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTypeEngInput = function (typeEng) {
        this.typeEngInput.sendKeys(typeEng);
    };

    getTypeEngInput = function () {
        return this.typeEngInput.getAttribute('value');
    };

    setTypeHunInput = function (typeHun) {
        this.typeHunInput.sendKeys(typeHun);
    };

    getTypeHunInput = function () {
        return this.typeHunInput.getAttribute('value');
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
