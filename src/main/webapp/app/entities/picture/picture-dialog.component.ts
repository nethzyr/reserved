import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Picture } from './picture.model';
import { PicturePopupService } from './picture-popup.service';
import { PictureService } from './picture.service';

@Component({
    selector: 'jhi-picture-dialog',
    templateUrl: './picture-dialog.component.html'
})
export class PictureDialogComponent implements OnInit {

    picture: Picture;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private pictureService: PictureService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.picture, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.picture.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pictureService.update(this.picture));
        } else {
            this.subscribeToSaveResponse(
                this.pictureService.create(this.picture));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Picture>>) {
        result.subscribe((res: HttpResponse<Picture>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Picture) {
        this.eventManager.broadcast({ name: 'pictureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-picture-popup',
    template: ''
})
export class PicturePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private picturePopupService: PicturePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.picturePopupService
                    .open(PictureDialogComponent as Component, params['id']);
            } else {
                this.picturePopupService
                    .open(PictureDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
