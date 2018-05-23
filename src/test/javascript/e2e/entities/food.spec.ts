import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

describe('Food e2e test', () => {

    let navBarPage: NavBarPage;
    let foodDialogPage: FoodDialogPage;
    let foodComponentsPage: FoodComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Foods', () => {
        navBarPage.goToEntity('food');
        foodComponentsPage = new FoodComponentsPage();
        expect(foodComponentsPage.getTitle())
            .toMatch(/reservedApp.food.home.title/);

    });

    it('should load create Food dialog', () => {
        foodComponentsPage.clickOnCreateButton();
        foodDialogPage = new FoodDialogPage();
        expect(foodDialogPage.getModalTitle())
            .toMatch(/reservedApp.food.home.createOrEditLabel/);
        foodDialogPage.close();
    });

    it('should create and save Foods', () => {
        foodComponentsPage.clickOnCreateButton();
        foodDialogPage.setTypeEngInput('typeEng');
        expect(foodDialogPage.getTypeEngInput()).toMatch('typeEng');
        foodDialogPage.setTypeHunInput('typeHun');
        expect(foodDialogPage.getTypeHunInput()).toMatch('typeHun');
        foodDialogPage.save();
        expect(foodDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FoodComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-food div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FoodDialogPage {
    modalTitle = element(by.css('h4#myFoodLabel'));
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
