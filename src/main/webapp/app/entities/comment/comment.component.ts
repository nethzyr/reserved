import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Comment} from './comment.model';
import {CommentService} from './comment.service';
import {Principal} from '../../shared';

@Component({
    selector: 'jhi-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit, OnDestroy {
    comments: Comment[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private commentService: CommentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.commentService.search({
                query: this.currentSearch,
            }).subscribe(
                (res: HttpResponse<Comment[]>) => this.comments = res.body,
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            return;
        }
        this.commentService.query().subscribe(
            (res: HttpResponse<Comment[]>) => {
                this.comments = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInComments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Comment) {
        return item.id;
    }

    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe('commentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
