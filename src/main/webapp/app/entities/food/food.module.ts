import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservedSharedModule } from '../../shared';
import {
    FoodService,
    FoodPopupService,
    FoodComponent,
    FoodDetailComponent,
    FoodDialogComponent,
    FoodPopupComponent,
    FoodDeletePopupComponent,
    FoodDeleteDialogComponent,
    foodRoute,
    foodPopupRoute,
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
export class ReservedFoodModule {}
