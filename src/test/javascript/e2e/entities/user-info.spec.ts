import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UserInfo e2e test', () => {

    let navBarPage: NavBarPage;
    let userInfoDialogPage: UserInfoDialogPage;
    let userInfoComponentsPage: UserInfoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserInfos', () => {
        navBarPage.goToEntity('user-info');
        userInfoComponentsPage = new UserInfoComponentsPage();
        expect(userInfoComponentsPage.getTitle())
            .toMatch(/reservedApp.userInfo.home.title/);

    });

    it('should load create UserInfo dialog', () => {
        userInfoComponentsPage.clickOnCreateButton();
        userInfoDialogPage = new UserInfoDialogPage();
        expect(userInfoDialogPage.getModalTitle())
            .toMatch(/reservedApp.userInfo.home.createOrEditLabel/);
        userInfoDialogPage.close();
    });

    it('should create and save UserInfos', () => {
        userInfoComponentsPage.clickOnCreateButton();
        userInfoDialogPage.setFacebookInput('facebook');
        expect(userInfoDialogPage.getFacebookInput()).toMatch('facebook');
        userInfoDialogPage.setPhoneInput('phone');
        expect(userInfoDialogPage.getPhoneInput()).toMatch('phone');
        userInfoDialogPage.pictureSelectLastOption();
        userInfoDialogPage.userSelectLastOption();
        // userInfoDialogPage.preferredCitySelectLastOption();
        // userInfoDialogPage.favoriteRestaurantSelectLastOption();
        userInfoDialogPage.save();
        expect(userInfoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserInfoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-info div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserInfoDialogPage {
    modalTitle = element(by.css('h4#myUserInfoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    facebookInput = element(by.css('input#field_facebook'));
    phoneInput = element(by.css('input#field_phone'));
    pictureSelect = element(by.css('select#field_picture'));
    userSelect = element(by.css('select#field_user'));
    preferredCitySelect = element(by.css('select#field_preferredCity'));
    favoriteRestaurantSelect = element(by.css('select#field_favoriteRestaurant'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFacebookInput = function(facebook) {
        this.facebookInput.sendKeys(facebook);
    };

    getFacebookInput = function() {
        return this.facebookInput.getAttribute('value');
    };

    setPhoneInput = function(phone) {
        this.phoneInput.sendKeys(phone);
    };

    getPhoneInput = function() {
        return this.phoneInput.getAttribute('value');
    };

    pictureSelectLastOption = function() {
        this.pictureSelect.all(by.tagName('option')).last().click();
    };

    pictureSelectOption = function(option) {
        this.pictureSelect.sendKeys(option);
    };

    getPictureSelect = function() {
        return this.pictureSelect;
    };

    getPictureSelectedOption = function() {
        return this.pictureSelect.element(by.css('option:checked')).getText();
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    preferredCitySelectLastOption = function() {
        this.preferredCitySelect.all(by.tagName('option')).last().click();
    };

    preferredCitySelectOption = function(option) {
        this.preferredCitySelect.sendKeys(option);
    };

    getPreferredCitySelect = function() {
        return this.preferredCitySelect;
    };

    getPreferredCitySelectedOption = function() {
        return this.preferredCitySelect.element(by.css('option:checked')).getText();
    };

    favoriteRestaurantSelectLastOption = function() {
        this.favoriteRestaurantSelect.all(by.tagName('option')).last().click();
    };

    favoriteRestaurantSelectOption = function(option) {
        this.favoriteRestaurantSelect.sendKeys(option);
    };

    getFavoriteRestaurantSelect = function() {
        return this.favoriteRestaurantSelect;
    };

    getFavoriteRestaurantSelectedOption = function() {
        return this.favoriteRestaurantSelect.element(by.css('option:checked')).getText();
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
