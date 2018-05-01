import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Kitchen} from './kitchen.model';
import {KitchenPopupService} from './kitchen-popup.service';
import {KitchenService} from './kitchen.service';

@Component({
    selector: 'jhi-kitchen-dialog',
    templateUrl: './kitchen-dialog.component.html'
})
export class KitchenDialogComponent implements OnInit {

    kitchen: Kitchen;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private kitchenService: KitchenService,
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
        if (this.kitchen.id !== undefined) {
            this.subscribeToSaveResponse(
                this.kitchenService.update(this.kitchen));
        } else {
            this.subscribeToSaveResponse(
                this.kitchenService.create(this.kitchen));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Kitchen>>) {
        result.subscribe((res: HttpResponse<Kitchen>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Kitchen) {
        this.eventManager.broadcast({name: 'kitchenListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-kitchen-popup',
    template: ''
})
export class KitchenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private kitchenPopupService: KitchenPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.kitchenPopupService
                    .open(KitchenDialogComponent as Component, params['id']);
            } else {
                this.kitchenPopupService
                    .open(KitchenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
