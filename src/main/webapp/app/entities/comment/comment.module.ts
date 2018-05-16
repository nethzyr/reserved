import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReservedSharedModule} from '../../shared';
import {
    CommentComponent,
    CommentDeleteDialogComponent,
    CommentDeletePopupComponent,
    CommentDetailComponent,
    CommentDialogComponent,
    CommentPopupComponent,
    commentPopupRoute,
    CommentPopupService,
    commentRoute,
    CommentService,
} from './';

const ENTITY_STATES = [
    ...commentRoute,
    ...commentPopupRoute,
];

@NgModule({
    imports: [
        ReservedSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommentComponent,
        CommentDetailComponent,
        CommentDialogComponent,
        CommentDeleteDialogComponent,
        CommentPopupComponent,
        CommentDeletePopupComponent,
    ],
    entryComponents: [
        CommentComponent,
        CommentDialogComponent,
        CommentPopupComponent,
        CommentDeleteDialogComponent,
        CommentDeletePopupComponent,
    ],
    providers: [
        CommentService,
        CommentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservedCommentModule {
}
