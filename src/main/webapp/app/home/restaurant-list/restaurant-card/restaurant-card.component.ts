import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../entities/restaurant/restaurant.model';
import {JhiLanguageService} from 'ng-jhipster';

@Component({
    selector: 'jhi-restaurant-card',
    templateUrl: './restaurant-card.component.html',
    styleUrls: [
        'restaurant-card.scss'
    ]
})
export class RestaurantCardComponent implements OnInit {
    @Input() restaurant: Restaurant;

    constructor(
        public languageService: JhiLanguageService
    ) {
    }

    ngOnInit() {
    }

    delete(event) {
        event.stopPropagation();
    }

}
