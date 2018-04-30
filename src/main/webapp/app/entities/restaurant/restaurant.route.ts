import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';

import {UserRouteAccessService} from '../../shared';
import {RestaurantComponent} from './restaurant.component';
import {RestaurantDetailComponent} from './restaurant-detail.component';
import {RestaurantPopupComponent} from './restaurant-dialog.component';
import {RestaurantDeletePopupComponent} from './restaurant-delete-dialog.component';

@Injectable()
export class RestaurantResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const restaurantRoute: Routes = [
    {
        path: 'restaurant',
        component: RestaurantComponent,
        resolve: {
            'pagingParams': RestaurantResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.restaurant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'restaurant/:id',
        component: RestaurantDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.restaurant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const restaurantPopupRoute: Routes = [
    {
        path: 'restaurant-new',
        component: RestaurantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.restaurant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'restaurant/:id/edit',
        component: RestaurantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.restaurant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'restaurant/:id/delete',
        component: RestaurantDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.restaurant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
