import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservedSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

@NgModule({
    imports: [
        ReservedSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
        RestaurantListComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedHomeModule {}
