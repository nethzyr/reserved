import {Component, Input} from '@angular/core';
import {ReservationService} from '../../entities/reservation';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Restaurant} from '../../entities/restaurant';
import {Principal} from '../../shared';

@Component({
  selector: 'jhi-reservation-modal',
  templateUrl: './reservation.component.html',
  styles: []
})
export class ReservationComponent {
    @Input() restaurant: Restaurant;
    closeResult: string;

    constructor(
      private reservationService: ReservationService,
      private modalService: NgbModal,
      private principal: Principal
    ) { }

    open(content) {
        console.log(this.restaurant);
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

}
