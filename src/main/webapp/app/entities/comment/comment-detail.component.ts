import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

import {Comment} from './comment.model';
import {CommentService} from './comment.service';

@Component({
    selector: 'jhi-comment-detail',
    templateUrl: './comment-detail.component.html'
})
export class CommentDetailComponent implements OnInit, OnDestroy {

    comment: Comment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commentService: CommentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComments();
    }

    load(id) {
        this.commentService.find(id)
            .subscribe((commentResponse: HttpResponse<Comment>) => {
                this.comment = commentResponse.body;
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commentListModification',
            (response) => this.load(this.comment.id)
        );
    }
}
