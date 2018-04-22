import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservedSharedModule } from '../../shared';
import {
    KitchenService,
    KitchenPopupService,
    KitchenComponent,
    KitchenDetailComponent,
    KitchenDialogComponent,
    KitchenPopupComponent,
    KitchenDeletePopupComponent,
    KitchenDeleteDialogComponent,
    kitchenRoute,
    kitchenPopupRoute,
} from './';

const ENTITY_STATES = [
    ...kitchenRoute,
    ...kitchenPopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KitchenComponent,
        KitchenDetailComponent,
        KitchenDialogComponent,
        KitchenDeleteDialogComponent,
        KitchenPopupComponent,
        KitchenDeletePopupComponent,
    ],
    entryComponents: [
        KitchenComponent,
        KitchenDialogComponent,
        KitchenPopupComponent,
        KitchenDeleteDialogComponent,
        KitchenDeletePopupComponent,
    ],
    providers: [
        KitchenService,
        KitchenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedKitchenModule {}
