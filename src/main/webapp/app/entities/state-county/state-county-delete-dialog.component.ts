import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StateCounty } from './state-county.model';
import { StateCountyPopupService } from './state-county-popup.service';
import { StateCountyService } from './state-county.service';

@Component({
    selector: 'jhi-state-county-delete-dialog',
    templateUrl: './state-county-delete-dialog.component.html'
})
export class StateCountyDeleteDialogComponent {

    stateCounty: StateCounty;

    constructor(
        private stateCountyService: StateCountyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stateCountyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stateCountyListModification',
                content: 'Deleted an stateCounty'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-state-county-delete-popup',
    template: ''
})
export class StateCountyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stateCountyPopupService: StateCountyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stateCountyPopupService
                .open(StateCountyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
