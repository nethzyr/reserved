import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReservedAdminModule} from '../../admin/admin.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {ReservedSharedModule} from '../../shared';
import {
    GooglePlaceIdFinderComponent,
    RestaurantComponent,
    RestaurantDeleteDialogComponent,
    RestaurantDeletePopupComponent,
    RestaurantDetailComponent,
    RestaurantDialogComponent,
    RestaurantPopupComponent,
    restaurantPopupRoute,
    RestaurantPopupService,
    RestaurantResolvePagingParams,
    restaurantRoute,
    RestaurantService
} from './';

const ENTITY_STATES = [
    ...restaurantRoute,
    ...restaurantPopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        ReservedAdminModule,
        RouterModule.forChild(ENTITY_STATES),
        AgmCoreModule.forRoot({
            apiKey: 'GOOGLE_MAPS_API_KEY',
            libraries: ['places']
        }),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        RestaurantComponent,
        RestaurantDetailComponent,
        RestaurantDialogComponent,
        RestaurantDeleteDialogComponent,
        RestaurantPopupComponent,
        RestaurantDeletePopupComponent,
        GooglePlaceIdFinderComponent
    ],
    entryComponents: [
        RestaurantComponent,
        RestaurantDialogComponent,
        RestaurantPopupComponent,
        RestaurantDeleteDialogComponent,
        RestaurantDeletePopupComponent,
        GooglePlaceIdFinderComponent
    ],
    providers: [
        RestaurantService,
        RestaurantPopupService,
        RestaurantResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedRestaurantModule {}
