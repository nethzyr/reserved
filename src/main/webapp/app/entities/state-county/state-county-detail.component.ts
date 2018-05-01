import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

import {StateCounty} from './state-county.model';
import {StateCountyService} from './state-county.service';

@Component({
    selector: 'jhi-state-county-detail',
    templateUrl: './state-county-detail.component.html'
})
export class StateCountyDetailComponent implements OnInit, OnDestroy {

    stateCounty: StateCounty;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stateCountyService: StateCountyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStateCounties();
    }

    load(id) {
        this.stateCountyService.find(id)
            .subscribe((stateCountyResponse: HttpResponse<StateCounty>) => {
                this.stateCounty = stateCountyResponse.body;
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStateCounties() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stateCountyListModification',
            (response) => this.load(this.stateCounty.id)
        );
    }
}
