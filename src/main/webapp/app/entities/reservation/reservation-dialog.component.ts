import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Reservation} from './reservation.model';
import {ReservationPopupService} from './reservation-popup.service';
import {ReservationService} from './reservation.service';
import {Restaurant, RestaurantService} from '../restaurant';
import {User, UserService} from '../../shared';

@Component({
    selector: 'jhi-reservation-dialog',
    templateUrl: './reservation-dialog.component.html'
})
export class ReservationDialogComponent implements OnInit {

    reservation: Reservation;
    isSaving: boolean;

    restaurants: Restaurant[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reservationService: ReservationService,
        private restaurantService: RestaurantService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.restaurantService.query()
            .subscribe((res: HttpResponse<Restaurant[]>) => { this.restaurants = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reservation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reservationService.update(this.reservation));
        } else {
            this.subscribeToSaveResponse(
                this.reservationService.create(this.reservation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Reservation>>) {
        result.subscribe((res: HttpResponse<Reservation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Reservation) {
        this.eventManager.broadcast({ name: 'reservationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRestaurantById(index: number, item: Restaurant) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-reservation-popup',
    template: ''
})
export class ReservationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reservationPopupService: ReservationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reservationPopupService
                    .open(ReservationDialogComponent as Component, params['id']);
            } else {
                this.reservationPopupService
                    .open(ReservationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
