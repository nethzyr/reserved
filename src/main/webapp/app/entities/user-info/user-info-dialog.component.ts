import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserInfo } from './user-info.model';
import { UserInfoPopupService } from './user-info-popup.service';
import { UserInfoService } from './user-info.service';
import { Picture, PictureService } from '../picture';
import { User, UserService } from '../../shared';
import { City, CityService } from '../city';
import { Restaurant, RestaurantService } from '../restaurant';

@Component({
    selector: 'jhi-user-info-dialog',
    templateUrl: './user-info-dialog.component.html'
})
export class UserInfoDialogComponent implements OnInit {

    userInfo: UserInfo;
    isSaving: boolean;

    pictures: Picture[];

    users: User[];

    cities: City[];

    restaurants: Restaurant[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userInfoService: UserInfoService,
        private pictureService: PictureService,
        private userService: UserService,
        private cityService: CityService,
        private restaurantService: RestaurantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pictureService
            .query({filter: 'userinfo-is-null'})
            .subscribe((res: HttpResponse<Picture[]>) => {
                if (!this.userInfo.picture || !this.userInfo.picture.id) {
                    this.pictures = res.body;
                } else {
                    this.pictureService
                        .find(this.userInfo.picture.id)
                        .subscribe((subRes: HttpResponse<Picture>) => {
                            this.pictures = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cityService.query()
            .subscribe((res: HttpResponse<City[]>) => { this.cities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.restaurantService.query()
            .subscribe((res: HttpResponse<Restaurant[]>) => { this.restaurants = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userInfoService.update(this.userInfo));
        } else {
            this.subscribeToSaveResponse(
                this.userInfoService.create(this.userInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserInfo>>) {
        result.subscribe((res: HttpResponse<UserInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserInfo) {
        this.eventManager.broadcast({ name: 'userInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPictureById(index: number, item: Picture) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }

    trackRestaurantById(index: number, item: Restaurant) {
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
    selector: 'jhi-user-info-popup',
    template: ''
})
export class UserInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userInfoPopupService: UserInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userInfoPopupService
                    .open(UserInfoDialogComponent as Component, params['id']);
            } else {
                this.userInfoPopupService
                    .open(UserInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
