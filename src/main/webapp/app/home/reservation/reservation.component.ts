import {Component, Input, OnInit} from '@angular/core';
import {ReservationService} from '../../entities/reservation';
import {ModalDismissReasons, NgbDateStruct, NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {Restaurant} from '../../entities/restaurant';
import {Principal} from '../../shared';

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
    closeResult: string;
    dateModel: NgbDateStruct;
    timeModel: NgbTimeStruct;

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
        console.log(this.restaurant);
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

}
