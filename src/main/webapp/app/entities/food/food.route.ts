import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FoodComponent } from './food.component';
import { FoodDetailComponent } from './food-detail.component';
import { FoodPopupComponent } from './food-dialog.component';
import { FoodDeletePopupComponent } from './food-delete-dialog.component';

export const foodRoute: Routes = [
    {
        path: 'food',
        component: FoodComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.food.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'food/:id',
        component: FoodDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.food.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const foodPopupRoute: Routes = [
    {
        path: 'food-new',
        component: FoodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.food.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'food/:id/edit',
        component: FoodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.food.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'food/:id/delete',
        component: FoodDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.food.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
