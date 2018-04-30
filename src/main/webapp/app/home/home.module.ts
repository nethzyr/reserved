import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../shared';

import {HOME_ROUTE, HomeComponent} from './';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {RestaurantCardComponent} from './restaurant-list/restaurant-card/restaurant-card.component';
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component';
import {ReservationComponent} from './reservation/reservation.component';

@NgModule({
    imports: [
        ReservedSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        RestaurantListComponent,
        RestaurantCardComponent,
        RestaurantDetailComponent,
        ReservationComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedHomeModule {}
