import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

describe('Reservation e2e test', () => {

    let navBarPage: NavBarPage;
    let reservationDialogPage: ReservationDialogPage;
    let reservationComponentsPage: ReservationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Reservations', () => {
        navBarPage.goToEntity('reservation');
        reservationComponentsPage = new ReservationComponentsPage();
        expect(reservationComponentsPage.getTitle())
            .toMatch(/reservedApp.reservation.home.title/);

    });

    it('should load create Reservation dialog', () => {
        reservationComponentsPage.clickOnCreateButton();
        reservationDialogPage = new ReservationDialogPage();
        expect(reservationDialogPage.getModalTitle())
            .toMatch(/reservedApp.reservation.home.createOrEditLabel/);
        reservationDialogPage.close();
    });

   /* it('should create and save Reservations', () => {
        reservationComponentsPage.clickOnCreateButton();
        reservationDialogPage.setTimeInput(12310020012301);
        expect(reservationDialogPage.getTimeInput()).toMatch('2001-12-31T02:30');
        reservationDialogPage.setPeopleInput('5');
        expect(reservationDialogPage.getPeopleInput()).toMatch('5');
        reservationDialogPage.getConfirmedInput().isSelected().then((selected) => {
            if (selected) {
                reservationDialogPage.getConfirmedInput().click();
                expect(reservationDialogPage.getConfirmedInput().isSelected()).toBeFalsy();
            } else {
                reservationDialogPage.getConfirmedInput().click();
                expect(reservationDialogPage.getConfirmedInput().isSelected()).toBeTruthy();
            }
        });
        reservationDialogPage.restaurantSelectLastOption();
        reservationDialogPage.userSelectLastOption();
        reservationDialogPage.save();
        expect(reservationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ReservationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-reservation div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReservationDialogPage {
    modalTitle = element(by.css('h4#myReservationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    timeInput = element(by.css('input#field_time'));
    peopleInput = element(by.css('input#field_people'));
    confirmedInput = element(by.css('input#field_confirmed'));
    restaurantSelect = element(by.css('select#field_restaurant'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTimeInput = function(time) {
        this.timeInput.sendKeys(time);
    };

    getTimeInput = function() {
        return this.timeInput.getAttribute('value');
    };

    setPeopleInput = function(people) {
        this.peopleInput.sendKeys(people);
    };

    getPeopleInput = function() {
        return this.peopleInput.getAttribute('value');
    };

    getConfirmedInput = function() {
        return this.confirmedInput;
    };
    restaurantSelectLastOption = function() {
        this.restaurantSelect.all(by.tagName('option')).last().click();
    };

    restaurantSelectOption = function(option) {
        this.restaurantSelect.sendKeys(option);
    };

    getRestaurantSelect = function() {
        return this.restaurantSelect;
    };

    getRestaurantSelectedOption = function() {
        return this.restaurantSelect.element(by.css('option:checked')).getText();
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
