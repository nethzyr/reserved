import {Component, OnInit} from '@angular/core';
import {Reservation, ReservationService} from '../../entities/reservation';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-reservation-confirm',
    templateUrl: './reservation-confirm.component.html',
    styles: []
})
export class ReservationConfirmComponent implements OnInit {
    success: boolean;
    reservation: Reservation;

    constructor(
        private reservationService: ReservationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.reservationService.confirm(params['key']).subscribe((res: HttpResponse<Reservation>) => {
                this.success = true;
                this.reservation = res.body;
            }, () => {
                this.success = false;
            });
        });
    }

}
