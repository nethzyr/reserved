import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservedSharedModule } from '../../shared';
import { ReservedAdminModule } from '../../admin/admin.module';
import {
    RestaurantService,
    RestaurantPopupService,
    RestaurantComponent,
    RestaurantDetailComponent,
    RestaurantDialogComponent,
    RestaurantPopupComponent,
    RestaurantDeletePopupComponent,
    RestaurantDeleteDialogComponent,
    restaurantRoute,
    restaurantPopupRoute,
    RestaurantResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...restaurantRoute,
    ...restaurantPopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        ReservedAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RestaurantComponent,
        RestaurantDetailComponent,
        RestaurantDialogComponent,
        RestaurantDeleteDialogComponent,
        RestaurantPopupComponent,
        RestaurantDeletePopupComponent,
    ],
    entryComponents: [
        RestaurantComponent,
        RestaurantDialogComponent,
        RestaurantPopupComponent,
        RestaurantDeleteDialogComponent,
        RestaurantDeletePopupComponent,
    ],
    providers: [
        RestaurantService,
        RestaurantPopupService,
        RestaurantResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedRestaurantModule {}
