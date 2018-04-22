import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Kitchen } from './kitchen.model';
import { KitchenService } from './kitchen.service';

@Component({
    selector: 'jhi-kitchen-detail',
    templateUrl: './kitchen-detail.component.html'
})
export class KitchenDetailComponent implements OnInit, OnDestroy {

    kitchen: Kitchen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private kitchenService: KitchenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKitchens();
    }

    load(id) {
        this.kitchenService.find(id)
            .subscribe((kitchenResponse: HttpResponse<Kitchen>) => {
                this.kitchen = kitchenResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKitchens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'kitchenListModification',
            (response) => this.load(this.kitchen.id)
        );
    }
}
