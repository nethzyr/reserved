import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../../shared';
import {
    KitchenComponent,
    KitchenDeleteDialogComponent,
    KitchenDeletePopupComponent,
    KitchenDetailComponent,
    KitchenDialogComponent,
    KitchenPopupComponent,
    kitchenPopupRoute,
    KitchenPopupService,
    kitchenRoute,
    KitchenService,
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
export class ReservedKitchenModule {
}
