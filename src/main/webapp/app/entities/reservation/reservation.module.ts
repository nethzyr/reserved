import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../../shared';
import {ReservedAdminModule} from '../../admin/admin.module';
import {
    ReservationComponent,
    ReservationDeleteDialogComponent,
    ReservationDeletePopupComponent,
    ReservationDetailComponent,
    ReservationDialogComponent,
    ReservationPopupComponent,
    reservationPopupRoute,
    ReservationPopupService,
    reservationRoute,
    ReservationService,
} from './';

const ENTITY_STATES = [
    ...reservationRoute,
    ...reservationPopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        ReservedAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReservationComponent,
        ReservationDetailComponent,
        ReservationDialogComponent,
        ReservationDeleteDialogComponent,
        ReservationPopupComponent,
        ReservationDeletePopupComponent,
    ],
    entryComponents: [
        ReservationComponent,
        ReservationDialogComponent,
        ReservationPopupComponent,
        ReservationDeleteDialogComponent,
        ReservationDeletePopupComponent,
    ],
    providers: [
        ReservationService,
        ReservationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedReservationModule {}
