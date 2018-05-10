import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Restaurant, RestaurantService} from '../../entities/restaurant';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {Kitchen, KitchenService} from '../../entities/kitchen';
import {Food, FoodService} from '../../entities/food';
import {City, CityService} from '../../entities/city';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-restaurant-list',
    templateUrl: './restaurant-list.component.html',
    styleUrls: [
        'restaurant-list.scss'
    ]
})
export class RestaurantListComponent implements OnInit, OnDestroy, OnChanges {
    @Input() currentSearch: string;
    restaurants: Restaurant[];
    kitchens: Kitchen[];
    foods: Food[];
    cities: City[];
    totalItems: any;
    links: any;
    subscriptions = new Subscription();

    constructor(
        private restaurantService: RestaurantService,
        private kitchenService: KitchenService,
        private cityService: CityService,
        private foodService: FoodService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService
    ) {
    }

    ngOnInit() {
        this.loadFilterData();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    ngOnChanges(changes) {
        this.loadAll();
    }

    loadFilterData() {
        this.subscriptions.add(this.kitchenService.list().subscribe(
            (res: HttpResponse<Kitchen[]>) => this.kitchens = res.body,
            (res: HttpErrorResponse) => this.onError(res.message)
        ));
        this.subscriptions.add(this.foodService.list().subscribe(
            (res: HttpResponse<Kitchen[]>) => this.foods = res.body,
            (res: HttpErrorResponse) => this.onError(res.message)
        ));
        this.subscriptions.add(this.cityService.list().subscribe(
            (res: HttpResponse<Kitchen[]>) => this.cities = res.body,
            (res: HttpErrorResponse) => this.onError(res.message)
        ));
    }

    loadAll() {
        if (this.currentSearch) {
            this.subscriptions.add(this.restaurantService.search({
                query: this.currentSearch
            }).subscribe(
                (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            ));
            return;
        }
        this.subscriptions.add(this.restaurantService.query()
            .subscribe(
            (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
            ));
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.restaurants = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
