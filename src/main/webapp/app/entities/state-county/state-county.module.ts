import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../../shared';
import {
    StateCountyComponent,
    StateCountyDeleteDialogComponent,
    StateCountyDeletePopupComponent,
    StateCountyDetailComponent,
    StateCountyDialogComponent,
    StateCountyPopupComponent,
    stateCountyPopupRoute,
    StateCountyPopupService,
    stateCountyRoute,
    StateCountyService,
} from './';

const ENTITY_STATES = [
    ...stateCountyRoute,
    ...stateCountyPopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StateCountyComponent,
        StateCountyDetailComponent,
        StateCountyDialogComponent,
        StateCountyDeleteDialogComponent,
        StateCountyPopupComponent,
        StateCountyDeletePopupComponent,
    ],
    entryComponents: [
        StateCountyComponent,
        StateCountyDialogComponent,
        StateCountyPopupComponent,
        StateCountyDeleteDialogComponent,
        StateCountyDeletePopupComponent,
    ],
    providers: [
        StateCountyService,
        StateCountyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedStateCountyModule {
}
