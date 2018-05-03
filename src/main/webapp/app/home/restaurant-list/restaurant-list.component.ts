import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Restaurant, RestaurantService} from '../../entities/restaurant';
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';

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
    totalItems: any;
    links: any;

    constructor(
        private restaurantService: RestaurantService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService
    ) {
    }

    ngOnInit() {
        this.loadAll();
    }

    ngOnDestroy() {
    }

    ngOnChanges(changes) {
        this.loadAll();
    }

    loadAll() {
        if (this.currentSearch) {
            this.restaurantService.search({
                query: this.currentSearch
            }).subscribe(
                (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            return;
        }
        this.restaurantService.query()
            .subscribe(
            (res: HttpResponse<Restaurant[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
