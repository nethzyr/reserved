import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../entities/restaurant';

@Component({
    selector: 'jhi-restaurant-card',
    templateUrl: './restaurant-card.component.html',
    styleUrls: [
        'restaurant-card.scss'
    ]
})
export class RestaurantCardComponent implements OnInit {
    @Input() restaurant: Restaurant;

    constructor() {
    }

    ngOnInit() {
    }

    delete(event) {
        event.stopPropagation();
    }

}
