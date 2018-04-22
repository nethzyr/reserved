import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservedSharedModule } from '../../shared';
import {
    PictureService,
    PicturePopupService,
    PictureComponent,
    PictureDetailComponent,
    PictureDialogComponent,
    PicturePopupComponent,
    PictureDeletePopupComponent,
    PictureDeleteDialogComponent,
    pictureRoute,
    picturePopupRoute,
    PictureResolvePagingParams,
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
export class ReservedPictureModule {}
