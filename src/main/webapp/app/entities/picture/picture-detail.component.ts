import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import {Picture} from './picture.model';
import {PictureService} from './picture.service';

@Component({
    selector: 'jhi-picture-detail',
    templateUrl: './picture-detail.component.html'
})
export class PictureDetailComponent implements OnInit, OnDestroy {

    picture: Picture;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private pictureService: PictureService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPictures();
    }

    load(id) {
        this.pictureService.find(id)
            .subscribe((pictureResponse: HttpResponse<Picture>) => {
                this.picture = pictureResponse.body;
            });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPictures() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pictureListModification',
            (response) => this.load(this.picture.id)
        );
    }
}
