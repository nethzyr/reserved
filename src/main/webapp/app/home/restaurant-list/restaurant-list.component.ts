import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Restaurant, RestaurantService} from '../../entities/restaurant';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {Kitchen, KitchenService} from '../../entities/kitchen';
import {Food, FoodService} from '../../entities/food';
import {City, CityService} from '../../entities/city';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

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
    kitchens: String[] = [];
    foods: String[] = [];
    cities: String[] = [];
    kitchenModel: any;
    foodModel: any;
    cityModel: any;
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

    searchCity = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.cities.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    searchKitchen = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.kitchens.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    searchFood = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.foods.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    loadFilterData() {
        this.subscriptions.add(this.kitchenService.list().subscribe(
            (res: HttpResponse<Kitchen[]>) => res.body.forEach((kitchen) => this.kitchens.push(kitchen.type)),
            (res: HttpErrorResponse) => this.onError(res.message)
        ));
        this.subscriptions.add(this.foodService.list().subscribe(
            (res: HttpResponse<Food[]>) => res.body.forEach((food) => this.foods.push(food.type)),
            (res: HttpErrorResponse) => this.onError(res.message)
        ));
        this.subscriptions.add(this.cityService.list().subscribe(
            (res: HttpResponse<City[]>) => res.body.forEach((city) => this.cities.push(city.name)),
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
