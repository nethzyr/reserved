import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../shared';

import {HOME_ROUTE, HomeComponent} from './';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {RestaurantCardComponent} from './restaurant-list/restaurant-card/restaurant-card.component';
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component';
import {ReservationComponent} from './reservation/reservation.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ReservationConfirmComponent} from './reservation-confirm/reservation-confirm.component';

@NgModule({
    imports: [
        ReservedSharedModule,
        RouterModule.forChild([...HOME_ROUTE])
    ],
    declarations: [
        HomeComponent,
        RestaurantListComponent,
        RestaurantCardComponent,
        RestaurantDetailComponent,
        ReservationComponent,
        ReservationConfirmComponent
    ],
    entryComponents: [],
    providers: [
        NgbActiveModal,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedHomeModule {
}
