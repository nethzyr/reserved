import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {ReservedCountryModule} from './country/country.module';
import {ReservedStateCountyModule} from './state-county/state-county.module';
import {ReservedCityModule} from './city/city.module';
import {ReservedRestaurantModule} from './restaurant/restaurant.module';
import {ReservedPictureModule} from './picture/picture.module';
import {ReservedKitchenModule} from './kitchen/kitchen.module';
import {ReservedFoodModule} from './food/food.module';
import {ReservedUserInfoModule} from './user-info/user-info.module';
import {ReservedReservationModule} from './reservation/reservation.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ReservedCountryModule,
        ReservedStateCountyModule,
        ReservedCityModule,
        ReservedRestaurantModule,
        ReservedPictureModule,
        ReservedKitchenModule,
        ReservedFoodModule,
        ReservedUserInfoModule,
        ReservedReservationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedEntityModule {
}
