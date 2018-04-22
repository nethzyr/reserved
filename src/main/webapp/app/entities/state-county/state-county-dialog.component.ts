import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StateCounty } from './state-county.model';
import { StateCountyPopupService } from './state-county-popup.service';
import { StateCountyService } from './state-county.service';
import { Country, CountryService } from '../country';

@Component({
    selector: 'jhi-state-county-dialog',
    templateUrl: './state-county-dialog.component.html'
})
export class StateCountyDialogComponent implements OnInit {

    stateCounty: StateCounty;
    isSaving: boolean;

    countries: Country[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stateCountyService: StateCountyService,
        private countryService: CountryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService.query()
            .subscribe((res: HttpResponse<Country[]>) => { this.countries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stateCounty.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stateCountyService.update(this.stateCounty));
        } else {
            this.subscribeToSaveResponse(
                this.stateCountyService.create(this.stateCounty));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StateCounty>>) {
        result.subscribe((res: HttpResponse<StateCounty>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StateCounty) {
        this.eventManager.broadcast({ name: 'stateCountyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-state-county-popup',
    template: ''
})
export class StateCountyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stateCountyPopupService: StateCountyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stateCountyPopupService
                    .open(StateCountyDialogComponent as Component, params['id']);
            } else {
                this.stateCountyPopupService
                    .open(StateCountyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
