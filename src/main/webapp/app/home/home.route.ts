import {Routes} from '@angular/router';

import {HomeComponent} from './';
import {ReservationConfirmComponent} from './reservation-confirm/reservation-confirm.component';
import {RestaurantDetailComponent} from './restaurant-detail/restaurant-detail.component';

export const HOME_ROUTE: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    },
    {
        path: 'reservation/confirm',
        component: ReservationConfirmComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    },
    {
        path: 'restaurant/:id',
        component: RestaurantDetailComponent
    }
];
