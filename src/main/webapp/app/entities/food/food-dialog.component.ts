import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Food } from './food.model';
import { FoodPopupService } from './food-popup.service';
import { FoodService } from './food.service';

@Component({
    selector: 'jhi-food-dialog',
    templateUrl: './food-dialog.component.html'
})
export class FoodDialogComponent implements OnInit {

    food: Food;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private foodService: FoodService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.food.id !== undefined) {
            this.subscribeToSaveResponse(
                this.foodService.update(this.food));
        } else {
            this.subscribeToSaveResponse(
                this.foodService.create(this.food));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Food>>) {
        result.subscribe((res: HttpResponse<Food>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Food) {
        this.eventManager.broadcast({ name: 'foodListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-food-popup',
    template: ''
})
export class FoodPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private foodPopupService: FoodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.foodPopupService
                    .open(FoodDialogComponent as Component, params['id']);
            } else {
                this.foodPopupService
                    .open(FoodDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
