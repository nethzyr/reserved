import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Food} from './food.model';
import {FoodPopupService} from './food-popup.service';
import {FoodService} from './food.service';

@Component({
    selector: 'jhi-food-delete-dialog',
    templateUrl: './food-delete-dialog.component.html'
})
export class FoodDeleteDialogComponent {

    food: Food;

    constructor(
        private foodService: FoodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.foodService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'foodListModification',
                content: 'Deleted an food'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-food-delete-popup',
    template: ''
})
export class FoodDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private foodPopupService: FoodPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.foodPopupService
                .open(FoodDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
