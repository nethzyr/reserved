import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../../shared';
import {
    PictureComponent,
    PictureDeleteDialogComponent,
    PictureDeletePopupComponent,
    PictureDetailComponent,
    PictureDialogComponent,
    PicturePopupComponent,
    picturePopupRoute,
    PicturePopupService,
    PictureResolvePagingParams,
    pictureRoute,
    PictureService,
} from './';

const ENTITY_STATES = [
    ...pictureRoute,
    ...picturePopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PictureComponent,
        PictureDetailComponent,
        PictureDialogComponent,
        PictureDeleteDialogComponent,
        PicturePopupComponent,
        PictureDeletePopupComponent,
    ],
    entryComponents: [
        PictureComponent,
        PictureDialogComponent,
        PicturePopupComponent,
        PictureDeleteDialogComponent,
        PictureDeletePopupComponent,
    ],
    providers: [
        PictureService,
        PicturePopupService,
        PictureResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedPictureModule {
}
