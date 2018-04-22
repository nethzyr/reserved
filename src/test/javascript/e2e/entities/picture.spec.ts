import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Picture e2e test', () => {

    let navBarPage: NavBarPage;
    let pictureDialogPage: PictureDialogPage;
    let pictureComponentsPage: PictureComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Pictures', () => {
        navBarPage.goToEntity('picture');
        pictureComponentsPage = new PictureComponentsPage();
        expect(pictureComponentsPage.getTitle())
            .toMatch(/reservedApp.picture.home.title/);

    });

    it('should load create Picture dialog', () => {
        pictureComponentsPage.clickOnCreateButton();
        pictureDialogPage = new PictureDialogPage();
        expect(pictureDialogPage.getModalTitle())
            .toMatch(/reservedApp.picture.home.createOrEditLabel/);
        pictureDialogPage.close();
    });

    it('should create and save Pictures', () => {
        pictureComponentsPage.clickOnCreateButton();
        pictureDialogPage.setTitleInput('title');
        expect(pictureDialogPage.getTitleInput()).toMatch('title');
        pictureDialogPage.setUrlInput('url');
        expect(pictureDialogPage.getUrlInput()).toMatch('url');
        pictureDialogPage.setImgInput(absolutePath);
        pictureDialogPage.save();
        expect(pictureDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PictureComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-picture div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PictureDialogPage {
    modalTitle = element(by.css('h4#myPictureLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    urlInput = element(by.css('input#field_url'));
    imgInput = element(by.css('input#file_img'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setUrlInput = function(url) {
        this.urlInput.sendKeys(url);
    };

    getUrlInput = function() {
        return this.urlInput.getAttribute('value');
    };

    setImgInput = function(img) {
        this.imgInput.sendKeys(img);
    };

    getImgInput = function() {
        return this.imgInput.getAttribute('value');
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
