import {Component, Input, OnInit} from '@angular/core';
import {Reservation, ReservationService} from '../../entities/reservation';
import {ModalDismissReasons, NgbDateStruct, NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {Restaurant} from '../../entities/restaurant';
import {Principal} from '../../shared';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const now = new Date();

@Component({
    selector: 'jhi-reservation-modal',
    templateUrl: './reservation.component.html',
    styleUrls: [
        'reservation.scss'
    ]
})
export class ReservationComponent implements OnInit {
    @Input() restaurant: Restaurant;
    reservation: Reservation;
    closeResult: string;
    dateModel: NgbDateStruct;
    timeModel: NgbTimeStruct;
    pplModel: number;

    constructor(
        private reservationService: ReservationService,
        private modalService: NgbModal,
        private principal: Principal
    ) {
    }

    selectToday() {
        this.dateModel = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        this.timeModel = {
            hour: now.getHours() + 1,
            minute: now.getMinutes() > 30 ? 30 : 0,
            second: now.getSeconds()
        };
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    ngOnInit(): void {
        this.selectToday();
        this.pplModel = 2;
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    submit() {
        this.reservation = {
            time: new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day, this.timeModel.hour, this.timeModel.minute, 0),
            people: this.pplModel,
            restaurant: this.restaurant,
            user: null
        };
        this.subscribeToSaveResponse(
            this.reservationService.create(this.reservation));
    }

    subscribeToSaveResponse(result: Observable<HttpResponse<Reservation>>) {
        result.subscribe((res: HttpResponse<Reservation>) =>
            console.log(res.body), (res: HttpErrorResponse) => console.log(res));
    }

}
