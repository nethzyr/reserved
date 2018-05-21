import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Restaurant, RestaurantService} from '../../entities/restaurant';
import {JhiAlertService, JhiLanguageService, JhiParseLinks} from 'ng-jhipster';
import {Kitchen, KitchenService} from '../../entities/kitchen';
import {Food, FoodService} from '../../entities/food';
import {City, CityService} from '../../entities/city';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {distinctUntilChanged, map} from 'rxjs/operators';
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
        private config: NgbTabsetConfig,
        private languageService: JhiLanguageService
    ) {
        config.justify = 'center';
        config.type = 'pills';
    }

    public resetFilters() {
        this.cityFilter.clear();
        this.kitchenFilter.clear();
        this.foodFilter.clear();
        this.searchInput = '';
        this.currentSearch = '';
        this.loadAll();
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

    formatter = (x: any) => (this.languageService.currentLang === 'en' ? x.typeEng : x.typeHun) || x.name;

    applyFilters() {
        if (this.cityFilter.size === 0 && this.kitchenFilter.size === 0 && this.foodFilter.size === 0) {
            this.loadAll();
        } else {
            this.subscriptions.add(this.restaurantService.filter(this.cityFilter, this.kitchenFilter, this.foodFilter, {
                size: 6,
                page: this.page - 1,
                sort: ['rating,desc', 'name,asc']
            }).subscribe(
                    (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                ));
        }
    }

    addFilter(array: any, model: string, filter: Set<any>) {
        if (array.includes(model)) {
            this.page = 1;
            filter.add(model);
            this.cityModel = '';
            this.kitchenModel = '';
            this.foodModel = '';
            this.applyFilters();
        }
    }

    removeFilter(element: any, filter: Set<any>) {
        this.page = 1;
        filter.delete(element);
        this.applyFilters();
    }

    searchCity = (text$: Observable<string>) =>
        text$.pipe(
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.cities.filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    searchKitchen = (text$: Observable<string>) =>
        text$.pipe(
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.kitchens.filter((v) => (this.languageService.currentLang === 'en' ? v.typeEng : v.typeHun).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    searchFood = (text$: Observable<string>) =>
        text$.pipe(
            distinctUntilChanged(),
            map((term) => term.length < 2 ? []
                : this.foods.filter((v) => (this.languageService.currentLang === 'en' ? v.typeEng : v.typeHun).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
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
            this.subscriptions.add(this.restaurantService.searchVisible({
                query: this.currentSearch,
                size: 6,
                page: this.page - 1,
                sort: ['rating,desc', 'name,asc']
            }).subscribe(
                (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            ));
            return;
        }
        this.subscriptions.add(this.restaurantService.query({
            'visible.equals': true,
            size: 6,
            page: this.page - 1,
            sort: ['rating,desc', 'name,asc']
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

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.restaurants = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
