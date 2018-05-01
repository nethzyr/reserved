import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../../shared';
import {
    FoodComponent,
    FoodDeleteDialogComponent,
    FoodDeletePopupComponent,
    FoodDetailComponent,
    FoodDialogComponent,
    FoodPopupComponent,
    foodPopupRoute,
    FoodPopupService,
    foodRoute,
    FoodService,
} from './';

const ENTITY_STATES = [
    ...foodRoute,
    ...foodPopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FoodComponent,
        FoodDetailComponent,
        FoodDialogComponent,
        FoodDeleteDialogComponent,
        FoodPopupComponent,
        FoodDeletePopupComponent,
    ],
    entryComponents: [
        FoodComponent,
        FoodDialogComponent,
        FoodPopupComponent,
        FoodDeleteDialogComponent,
        FoodDeletePopupComponent,
    ],
    providers: [
        FoodService,
        FoodPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedFoodModule {
}
