import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {FormControl} from '@angular/forms';
import {Restaurant} from '../../entities/restaurant';

@Component({
    selector: 'jhi-google-place-id-finder',
    templateUrl: './google-place-id-finder.component.html',
    styleUrls: [
        'google-place-id-finder.scss'
    ]
})
export class GooglePlaceIdFinderComponent implements OnInit {
    restaurant: Restaurant;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild('search')
    public searchElementRef: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
    }

    ngOnInit() {
        // set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        // create search FormControl
        this.searchControl = new FormControl();

        // set current position
        this.setCurrentPosition();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    // set latitude, longitude and zoom
                    /*this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                    console.log(place);
                    this.restaurant.name = place.name;
                    this.restaurant.googlePlaceId = place.place_id;
                    this.restaurant.website = place.website;
                    this.restaurant.phone = place.international_phone_number;
                    this.restaurant.rating = place.rating * 10;
                    place.address_components.forEach((line) => {
                        if (line.types.includes('')) {

                        }
                    });
                    console.log(this.restaurant);*/

                });
            });
        });
    }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

}
