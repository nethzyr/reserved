import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Restaurant} from './restaurant.model';
import {RestaurantPopupService} from './restaurant-popup.service';
import {RestaurantService} from './restaurant.service';
import {City, CityService} from '../city';
import {Kitchen, KitchenService} from '../kitchen';
import {Food, FoodService} from '../food';
import {Picture, PictureService} from '../picture';
import {User, UserService} from '../../shared';

@Component({
    selector: 'jhi-restaurant-dialog',
    templateUrl: './restaurant-dialog.component.html'
})
export class RestaurantDialogComponent implements OnInit {

    restaurant: Restaurant;
    isSaving: boolean;

    cities: City[];

    kitchens: Kitchen[];

    foods: Food[];

    pictures: Picture[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private restaurantService: RestaurantService,
        private cityService: CityService,
        private kitchenService: KitchenService,
        private foodService: FoodService,
        private pictureService: PictureService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cityService.query()
            .subscribe((res: HttpResponse<City[]>) => {
                this.cities = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.kitchenService.query()
            .subscribe((res: HttpResponse<Kitchen[]>) => {
                this.kitchens = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.foodService.query()
            .subscribe((res: HttpResponse<Food[]>) => {
                this.foods = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.pictureService.query()
            .subscribe((res: HttpResponse<Picture[]>) => {
                this.pictures = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => {
                this.users = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.restaurant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.restaurantService.update(this.restaurant));
        } else {
            this.subscribeToSaveResponse(
                this.restaurantService.create(this.restaurant));
        }
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }

    trackKitchenById(index: number, item: Kitchen) {
        return item.id;
    }

    trackFoodById(index: number, item: Food) {
        return item.id;
    }

    trackPictureById(index: number, item: Picture) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Restaurant>>) {
        result.subscribe((res: HttpResponse<Restaurant>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Restaurant) {
        this.eventManager.broadcast({name: 'restaurantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
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
