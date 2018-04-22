import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Food } from './food.model';
import { FoodService } from './food.service';

@Component({
    selector: 'jhi-food-detail',
    templateUrl: './food-detail.component.html'
})
export class FoodDetailComponent implements OnInit, OnDestroy {

    food: Food;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private foodService: FoodService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFoods();
    }

    load(id) {
        this.foodService.find(id)
            .subscribe((foodResponse: HttpResponse<Food>) => {
                this.food = foodResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFoods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'foodListModification',
            (response) => this.load(this.food.id)
        );
    }
}
