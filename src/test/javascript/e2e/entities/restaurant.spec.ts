import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

describe('Restaurant e2e test', () => {

    let navBarPage: NavBarPage;
    let restaurantDialogPage: RestaurantDialogPage;
    let restaurantComponentsPage: RestaurantComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Restaurants', () => {
        navBarPage.goToEntity('restaurant');
        restaurantComponentsPage = new RestaurantComponentsPage();
        expect(restaurantComponentsPage.getTitle())
            .toMatch(/reservedApp.restaurant.home.title/);

    });

    it('should load create Restaurant dialog', () => {
        restaurantComponentsPage.clickOnCreateButton();
        restaurantDialogPage = new RestaurantDialogPage();
        expect(restaurantDialogPage.getModalTitle())
            .toMatch(/reservedApp.restaurant.home.createOrEditLabel/);
        restaurantDialogPage.close();
    });

   /* it('should create and save Restaurants', () => {
        restaurantComponentsPage.clickOnCreateButton();
        restaurantDialogPage.setNameInput('name');
        expect(restaurantDialogPage.getNameInput()).toMatch('name');
        restaurantDialogPage.setStreetAddressInput('streetAddress');
        expect(restaurantDialogPage.getStreetAddressInput()).toMatch('streetAddress');
        restaurantDialogPage.setPostalCodeInput('postalCode');
        expect(restaurantDialogPage.getPostalCodeInput()).toMatch('postalCode');
        restaurantDialogPage.setInfoEngInput('infoEng');
        expect(restaurantDialogPage.getInfoEngInput()).toMatch('infoEng');
        restaurantDialogPage.setInfoHunInput('infoHun');
        expect(restaurantDialogPage.getInfoHunInput()).toMatch('infoHun');
        restaurantDialogPage.setEmailInput('email');
        expect(restaurantDialogPage.getEmailInput()).toMatch('email');
        restaurantDialogPage.setPhoneInput('phone');
        expect(restaurantDialogPage.getPhoneInput()).toMatch('phone');
        restaurantDialogPage.setWebsiteInput('website');
        expect(restaurantDialogPage.getWebsiteInput()).toMatch('website');
        restaurantDialogPage.setFacebookInput('facebook');
        expect(restaurantDialogPage.getFacebookInput()).toMatch('facebook');
        restaurantDialogPage.setGooglePlaceIdInput('googlePlaceId');
        expect(restaurantDialogPage.getGooglePlaceIdInput()).toMatch('googlePlaceId');
        restaurantDialogPage.setRatingInput('5');
        expect(restaurantDialogPage.getRatingInput()).toMatch('5');
        restaurantDialogPage.citySelectLastOption();
        restaurantDialogPage.userSelectLastOption();
        restaurantDialogPage.pictureSelectLastOption();
        // restaurantDialogPage.kitchenSelectLastOption();
        // restaurantDialogPage.foodSelectLastOption();
        restaurantDialogPage.save();
        expect(restaurantDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RestaurantComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-restaurant div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RestaurantDialogPage {
    modalTitle = element(by.css('h4#myRestaurantLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    streetAddressInput = element(by.css('input#field_streetAddress'));
    postalCodeInput = element(by.css('input#field_postalCode'));
    infoEngInput = element(by.css('input#field_infoEng'));
    infoHunInput = element(by.css('input#field_infoHun'));
    emailInput = element(by.css('input#field_email'));
    phoneInput = element(by.css('input#field_phone'));
    websiteInput = element(by.css('input#field_website'));
    facebookInput = element(by.css('input#field_facebook'));
    googlePlaceIdInput = element(by.css('input#field_googlePlaceId'));
    ratingInput = element(by.css('input#field_rating'));
    citySelect = element(by.css('select#field_city'));
    userSelect = element(by.css('select#field_user'));
    pictureSelect = element(by.css('select#field_picture'));
    kitchenSelect = element(by.css('select#field_kitchen'));
    foodSelect = element(by.css('select#field_food'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setStreetAddressInput = function(streetAddress) {
        this.streetAddressInput.sendKeys(streetAddress);
    };

    getStreetAddressInput = function() {
        return this.streetAddressInput.getAttribute('value');
    };

    setPostalCodeInput = function(postalCode) {
        this.postalCodeInput.sendKeys(postalCode);
    };

    getPostalCodeInput = function() {
        return this.postalCodeInput.getAttribute('value');
    };

    setInfoEngInput = function (infoEng) {
        this.infoEngInput.sendKeys(infoEng);
    };

    getInfoEngInput = function () {
        return this.infoEngInput.getAttribute('value');
    };

    setInfoHunInput = function (infoHun) {
        this.infoHunInput.sendKeys(infoHun);
    };

    getInfoHunInput = function () {
        return this.infoHunInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setPhoneInput = function(phone) {
        this.phoneInput.sendKeys(phone);
    };

    getPhoneInput = function() {
        return this.phoneInput.getAttribute('value');
    };

    setWebsiteInput = function(website) {
        this.websiteInput.sendKeys(website);
    };

    getWebsiteInput = function() {
        return this.websiteInput.getAttribute('value');
    };

    setFacebookInput = function(facebook) {
        this.facebookInput.sendKeys(facebook);
    };

    getFacebookInput = function() {
        return this.facebookInput.getAttribute('value');
    };

    setGooglePlaceIdInput = function(googlePlaceId) {
        this.googlePlaceIdInput.sendKeys(googlePlaceId);
    };

    getGooglePlaceIdInput = function() {
        return this.googlePlaceIdInput.getAttribute('value');
    };

    setRatingInput = function (rating) {
        this.ratingInput.sendKeys(rating);
    };

    getRatingInput = function () {
        return this.ratingInput.getAttribute('value');
    };

    citySelectLastOption = function() {
        this.citySelect.all(by.tagName('option')).last().click();
    };

    citySelectOption = function(option) {
        this.citySelect.sendKeys(option);
    };

    getCitySelect = function() {
        return this.citySelect;
    };

    getCitySelectedOption = function() {
        return this.citySelect.element(by.css('option:checked')).getText();
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

    kitchenSelectLastOption = function() {
        this.kitchenSelect.all(by.tagName('option')).last().click();
    };

    kitchenSelectOption = function(option) {
        this.kitchenSelect.sendKeys(option);
    };

    getKitchenSelect = function() {
        return this.kitchenSelect;
    };

    getKitchenSelectedOption = function() {
        return this.kitchenSelect.element(by.css('option:checked')).getText();
    };

    foodSelectLastOption = function() {
        this.foodSelect.all(by.tagName('option')).last().click();
    };

    foodSelectOption = function(option) {
        this.foodSelect.sendKeys(option);
    };

    getFoodSelect = function() {
        return this.foodSelect;
    };

    getFoodSelectedOption = function() {
        return this.foodSelect.element(by.css('option:checked')).getText();
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
