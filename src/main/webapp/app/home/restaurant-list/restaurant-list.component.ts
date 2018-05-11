import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Restaurant, RestaurantService} from '../../entities/restaurant';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {Kitchen, KitchenService} from '../../entities/kitchen';
import {Food, FoodService} from '../../entities/food';
import {City, CityService} from '../../entities/city';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';
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
    cities: City[] = [];
    cityModel: string;
    cityFilter: Set<City> = new Set<City>();
    kitchens: Kitchen[] = [];
    kitchenModel: any;
    kitchenFilter: Set<Kitchen> = new Set<Kitchen>();
    foods: Food[] = [];
    foodModel: any;
    foodFilter: Set<Food> = new Set<Food>();

    totalItems: any;
    links: any;
    subscriptions = new Subscription();

    constructor(
        private restaurantService: RestaurantService,
        private cityService: CityService,
        private kitchenService: KitchenService,
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

    formatter = (x: any) => x.type || x.name;

    compareRestaurant(a: Restaurant, b: Restaurant) {
        if (a.name > b.name) {
            return -1;
        }
        if (a.name < b.name) {
            return 1;
        }
        return 0;
    }

    applyFilters() {
        while (this.restaurants.length > 0) {
            this.restaurants.pop();
        }

        let filteredByCities: Set<Restaurant> = new Set<Restaurant>();
        let cityFilters: Observable<HttpResponse<Restaurant[]>>[] = [];

        this.cityFilter.forEach((filter) => {
            cityFilters.push(this.restaurantService.query({
                'cityId.equals': filter.id
            }))
        });

        let filteredByKitchens: Set<Restaurant> = new Set<Restaurant>();
        let kitchenFilters: Observable<HttpResponse<Restaurant[]>>[] = [];

        this.kitchenFilter.forEach((filter) => {
            kitchenFilters.push(this.restaurantService.query({
                'kitchenId.equals': filter.id
            }))
        });

        let filteredByFoods: Set<Restaurant> = new Set<Restaurant>();
        let foodFilters: Observable<HttpResponse<Restaurant[]>>[] = [];

        this.foodFilter.forEach((filter) => {
            foodFilters.push(this.restaurantService.query({
                'foodId.equals': filter.id
            }))
        });

        forkJoin(...cityFilters, ...kitchenFilters, ...foodFilters).subscribe((observablesArray) => {
            observablesArray.forEach((restaurantsArray, i) => {
                if (i < cityFilters.length) {
                    restaurantsArray.body.forEach((restaurant) => (
                        filteredByCities.add(restaurant)
                    ));
                    this.restaurants = Array.from(filteredByCities);
                } else if (i < cityFilters.length + kitchenFilters.length) {
                    restaurantsArray.body.forEach((restaurant) => (
                        filteredByKitchens.add(restaurant)
                    ));
                    if (this.restaurants.length > 0) {
                        this.restaurants
                    } else {
                        this.restaurants = Array.from(filteredByKitchens);
                    }
                } else if (i < cityFilters.length + kitchenFilters.length + foodFilters.length) {
                    restaurantsArray.body.forEach((restaurant) => (
                        filteredByFoods.add(restaurant)
                    ));
                    if (this.restaurants.length > 0) {
                        this.restaurants.filter((x) => (filteredByFoods.has(x)));
                    } else {
                        this.restaurants = Array.from(filteredByFoods);
                    }
                }
                console.log(i);
                console.log(observablesArray[i].body);
                console.log(this.restaurants);
            });
        });
    }

    x() {
    }

    addFilter(array: any, model: string, filter: Set<any>) {
        if (array.includes(model)) {
            filter.add(model);
            this.cityModel = '';
            this.kitchenModel = '';
            this.foodModel = '';
            //this.applyFilters();
            this.x();
        }
    }

    removeFilter(element: any, filter: Set<any>) {
        filter.delete(element);
        //this.applyFilters();
        this.x();
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
