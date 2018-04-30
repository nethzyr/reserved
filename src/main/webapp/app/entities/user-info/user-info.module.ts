import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../../shared';
import {ReservedAdminModule} from '../../admin/admin.module';
import {
    UserInfoComponent,
    UserInfoDeleteDialogComponent,
    UserInfoDeletePopupComponent,
    UserInfoDetailComponent,
    UserInfoDialogComponent,
    UserInfoPopupComponent,
    userInfoPopupRoute,
    UserInfoPopupService,
    UserInfoResolvePagingParams,
    userInfoRoute,
    UserInfoService,
} from './';

const ENTITY_STATES = [
    ...userInfoRoute,
    ...userInfoPopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        ReservedAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserInfoComponent,
        UserInfoDetailComponent,
        UserInfoDialogComponent,
        UserInfoDeleteDialogComponent,
        UserInfoPopupComponent,
        UserInfoDeletePopupComponent,
    ],
    entryComponents: [
        UserInfoComponent,
        UserInfoDialogComponent,
        UserInfoPopupComponent,
        UserInfoDeleteDialogComponent,
        UserInfoDeletePopupComponent,
    ],
    providers: [
        UserInfoService,
        UserInfoPopupService,
        UserInfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedUserInfoModule {}
