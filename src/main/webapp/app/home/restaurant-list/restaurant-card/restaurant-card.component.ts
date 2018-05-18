import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from '../../../entities/restaurant/restaurant.model';
import {JhiLanguageService} from 'ng-jhipster';
import {MapsAPILoader} from '@agm/core';

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
        private mapsAPILoader: MapsAPILoader,
        private languageService: JhiLanguageService
    ) {
    }

    ngOnInit() {
        /* if (this.restaurant.googlePlaceId.length > 0) {
             this.mapsAPILoader.load().then(() => {
                 const service = new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div')));
                 service.getDetails({
                     placeId: this.restaurant.googlePlaceId
                 }, (place, status) => {
                     if (status === google.maps.places.PlacesServiceStatus.OK) {
                         this.restaurant.rating = place.rating;
                         console.log(place);
                     }
                 });
             });
         }*/
    }

    delete(event) {
        event.stopPropagation();
    }

}
