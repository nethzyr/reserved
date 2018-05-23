import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Restaurant, RestaurantService} from '../../entities/restaurant';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {Kitchen, KitchenService} from '../../entities/kitchen';
import {Food, FoodService} from '../../entities/food';
import {City, CityService} from '../../entities/city';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-restaurant-list',
    templateUrl: './restaurant-list.component.html',
    providers: [NgbTabsetConfig],
    styleUrls: [
        'restaurant-list.scss'
    ]
})
export class RestaurantListComponent implements OnInit, OnDestroy, OnChanges {
    searchInput: string;
    currentSearch: string;
    restaurants: Restaurant[];
    cities: City[] = [];
    cityModel: string;
    cityFilter: Set<City> = new Set<City>();
    kitchens: Kitchen[] = [];
    kitchenModel: any;
    kitchenFilter: Set<Kitchen> = new Set<Kitchen>();
    foods: Food[] = [];
    foodModel: any;
    foodFilter: Set<Food> = new Set<Food>();
    page = 1;

    totalItems: any;
    links: any;
    subscriptions = new Subscription();

    constructor(
        private restaurantService: RestaurantService,
        private cityService: CityService,
        private kitchenService: KitchenService,
        private foodService: FoodService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private config: NgbTabsetConfig
    ) {
        config.justify = 'center';
        config.type = 'pills';
    }

    ngOnInit() {
        this.loadFilterData();
        this.loadAll();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    ngOnChanges(changes) {
    }

    formatter = (x: any) => x.type || x.name;

    applyFilters() {
        if (this.cityFilter.size === 0 && this.kitchenFilter.size === 0 && this.foodFilter.size === 0) {
            this.loadAll();
        } else {
            this.subscriptions.add(this.restaurantService.filter(this.cityFilter, this.kitchenFilter, this.foodFilter, {
                size: 6,
                page: this.page - 1
            }).subscribe(
                    (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                ));
        }
    }

    addFilter(array: any, model: string, filter: Set<any>) {
        if (array.includes(model)) {
            filter.add(model);
            this.cityModel = '';
            this.kitchenModel = '';
            this.foodModel = '';
            this.applyFilters();
        }
    }

    removeFilter(element: any, filter: Set<any>) {
        filter.delete(element);
        this.applyFilters();
    }

    searchCity = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.cities.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    searchKitchen = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.kitchens.filter((v) => v.type.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    searchFood = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.foods.filter((v) => v.type.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    loadFilterData() {
        this.subscriptions.add(this.cityService.list().subscribe(
            (res: HttpResponse<City[]>) => res.body.forEach((city) => this.cities.push(city)),
            (res: HttpErrorResponse) => this.onError(res.message)
        ));
        this.subscriptions.add(this.kitchenService.list().subscribe(
            (res: HttpResponse<Kitchen[]>) => res.body.forEach((kitchen) => this.kitchens.push(kitchen)),
            (res: HttpErrorResponse) => this.onError(res.message)
        ));
        this.subscriptions.add(this.foodService.list().subscribe(
            (res: HttpResponse<Food[]>) => res.body.forEach((food) => this.foods.push(food)),
            (res: HttpErrorResponse) => this.onError(res.message)
        ));
    }

    loadAll() {
        if (this.currentSearch) {
            this.subscriptions.add(this.restaurantService.search({
                query: this.currentSearch,
                size: 6,
                page: this.page - 1
            }).subscribe(
                (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            ));
            return;
        }
        this.subscriptions.add(this.restaurantService.query({
            size: 6,
            page: this.page - 1
        }).subscribe(
            (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
            ));
    }

    delete(event) {
        event.stopPropagation();
    }

    search() {
        this.currentSearch = this.searchInput;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.searchInput = '';
        this.loadAll();
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
