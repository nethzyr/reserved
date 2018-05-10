import {Component, Input, OnInit} from '@angular/core';
import {Reservation, ReservationService} from '../../entities/reservation';
import {ModalDismissReasons, NgbDateStruct, NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {Restaurant} from '../../entities/restaurant';
import {Principal} from '../../shared';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operators';

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
    private _success = new Subject<string>();
    successMessage: string;
    now: Date;

    constructor(
        private reservationService: ReservationService,
        private modalService: NgbModal,
        private principal: Principal
    ) {
    }

    selectToday() {
        this.now = new Date;
        this.dateModel = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
        this.timeModel = {
            hour: this.now.getHours() + this.now.getMinutes() > 30 ? 2 : 1,
            minute: this.now.getMinutes() > 30 ? 0 : 30,
            second: this.now.getSeconds()
        };
    }

    ngOnInit(): void {
        this.selectToday();
        this.pplModel = 2;
        this._success.subscribe((message) => this.successMessage = message);
        this._success.pipe(
            debounceTime(10000)
        ).subscribe(() => this.successMessage = null);
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
        this.subscribeToSaveResponse(this.reservationService.create(this.reservation));
        this._success.next('Sikeres asztalfoglalás. Amint az étterem visszaigazolta a foglalásodat, küldünk egy emailt.');
    }

    subscribeToSaveResponse(result: Observable<HttpResponse<Reservation>>) {
        result.subscribe((res: HttpResponse<Reservation>) =>
            res.body, (res: HttpErrorResponse) => res);
    }

}
