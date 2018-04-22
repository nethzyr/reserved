import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Kitchen } from './kitchen.model';
import { KitchenPopupService } from './kitchen-popup.service';
import { KitchenService } from './kitchen.service';

@Component({
    selector: 'jhi-kitchen-delete-dialog',
    templateUrl: './kitchen-delete-dialog.component.html'
})
export class KitchenDeleteDialogComponent {

    kitchen: Kitchen;

    constructor(
        private kitchenService: KitchenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.kitchenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'kitchenListModification',
                content: 'Deleted an kitchen'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-kitchen-delete-popup',
    template: ''
})
export class KitchenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private kitchenPopupService: KitchenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.kitchenPopupService
                .open(KitchenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
