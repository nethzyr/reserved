import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Restaurant, RestaurantService} from '../../entities/restaurant';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager, JhiLanguageService} from 'ng-jhipster';
import {Title} from '@angular/platform-browser';
import {Comment, CommentService} from '../../entities/comment';

@Component({
    selector: 'jhi-restaurant-detail',
    templateUrl: './restaurant-detail.component.html',
    styleUrls: [
        'restaurant-detail.scss'
    ]
})
export class RestaurantDetailComponent implements OnInit, OnDestroy {

    restaurant: Restaurant;
    comments: Comment[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private restaurantService: RestaurantService,
        private route: ActivatedRoute,
        private titleService: Title,
        private commentService: CommentService,
        private languageService: JhiLanguageService
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRestaurants();
    }

    delete(event) {
        event.stopPropagation();
    }

    load(id) {
        this.restaurantService.find(id)
            .subscribe((restaurantResponse: HttpResponse<Restaurant>) => {
                this.restaurant = restaurantResponse.body;
                this.titleService.setTitle(this.restaurant.name);
                this.commentService.findByRestaurantId(this.restaurant.id).subscribe((commentResponse: HttpResponse<Comment[]>) => (
                    this.comments = commentResponse.body
                ));
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRestaurants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'restaurantListModification',
            (response) => this.load(this.restaurant.id)
        );
    }
}
