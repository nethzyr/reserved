import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiDataUtils, JhiEventManager, JhiLanguageService} from 'ng-jhipster';

import {Restaurant} from './restaurant.model';
import {RestaurantPopupService} from './restaurant-popup.service';
import {RestaurantService} from './restaurant.service';
import {City, CityService} from '../city';
import {Principal, User, UserService} from '../../shared';
import {Picture, PictureService} from '../picture';
import {Kitchen, KitchenService} from '../kitchen';
import {Food, FoodService} from '../food';

@Component({
    selector: 'jhi-restaurant-dialog',
    templateUrl: './restaurant-dialog.component.html'
})
export class RestaurantDialogComponent implements OnInit {

    restaurant: Restaurant;
    savedRestaurant = new Restaurant();
    isSaving: boolean;
    picture: Picture = new Picture();
    deletePicture: Picture = new Picture();

    cities: City[];

    users: User[];

    pictures: Picture[];

    kitchens: Kitchen[];

    foods: Food[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private restaurantService: RestaurantService,
        private cityService: CityService,
        private userService: UserService,
        private pictureService: PictureService,
        private kitchenService: KitchenService,
        private foodService: FoodService,
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private elementRef: ElementRef,
        public languageService: JhiLanguageService,
        private principal: Principal
    ) {
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.picture, this.elementRef, field, fieldContentType, idInput);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        this.picture.title = this.restaurant.name;
    }

    resetFields() {
        Object.assign(this.restaurant, this.savedRestaurant);
    }

    ngOnInit() {
        Object.assign(this.savedRestaurant, this.restaurant);
        Object.assign(this.deletePicture, this.restaurant.picture);
        this.isSaving = false;
        this.cityService.list()
            .subscribe((res: HttpResponse<City[]>) => { this.cities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.pictureService.query()
            .subscribe((res: HttpResponse<Picture[]>) => { this.pictures = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.kitchenService.list()
            .subscribe((res: HttpResponse<Kitchen[]>) => { this.kitchens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.foodService.list()
            .subscribe((res: HttpResponse<Food[]>) => { this.foods = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.restaurant.id !== undefined) {
            if (this.picture.img !== undefined) {
                this.pictureService.create(this.picture).subscribe((res: HttpResponse<Picture>) => {
                    this.restaurant.picture = res.body;
                    this.subscribeToSaveResponse(
                        this.restaurantService.update(this.restaurant), true);
                });
            } else {
                this.subscribeToSaveResponse(
                    this.restaurantService.update(this.restaurant), false);
            }
        } else {
            if (this.picture.img !== undefined) {
                this.pictureService.create(this.picture).subscribe((res: HttpResponse<Picture>) => {
                    this.restaurant.picture = res.body;
                    this.subscribeToSaveResponse(
                        this.restaurantService.create(this.restaurant), true);
                });
            } else {
                this.subscribeToSaveResponse(
                    this.restaurantService.create(this.restaurant), false);
            }
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Restaurant>>, isDeletePic: boolean) {
        result.subscribe((res: HttpResponse<Restaurant>) =>
            this.onSaveSuccess(res.body, isDeletePic), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Restaurant, isDeletePic: boolean) {
        if (isDeletePic) {
            this.pictureService.delete(this.deletePicture.id).subscribe((response) => {
                this.eventManager.broadcast({
                    name: 'pictureListModification',
                    content: 'Deleted an picture'
                });
            });
        }
        this.eventManager.broadcast({ name: 'restaurantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackPictureById(index: number, item: Picture) {
        return item.id;
    }

    trackKitchenById(index: number, item: Kitchen) {
        return item.id;
    }

    trackFoodById(index: number, item: Food) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-restaurant-popup',
    template: ''
})
export class RestaurantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private restaurantPopupService: RestaurantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.restaurantPopupService
                    .open(RestaurantDialogComponent as Component, params['id']);
            } else {
                this.restaurantPopupService
                    .open(RestaurantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
