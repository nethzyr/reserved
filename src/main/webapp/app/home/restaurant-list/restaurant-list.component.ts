import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RestaurantService} from '../../entities/restaurant/restaurant.service';
import {Restaurant} from '../../entities/restaurant/restaurant.model';
import {JhiParseLinks, JhiAlertService} from 'ng-jhipster';

@Component({
    selector: 'jhi-restaurant-list',
    templateUrl: './restaurant-list.component.html',
    styles: []
})
export class RestaurantListComponent implements OnInit, OnDestroy {
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

    ngOnDestroy() {}

    loadAll() {
        this.restaurantService.query({
        }).subscribe(
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
