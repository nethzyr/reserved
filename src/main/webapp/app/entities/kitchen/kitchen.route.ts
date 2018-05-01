import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {KitchenComponent} from './kitchen.component';
import {KitchenDetailComponent} from './kitchen-detail.component';
import {KitchenPopupComponent} from './kitchen-dialog.component';
import {KitchenDeletePopupComponent} from './kitchen-delete-dialog.component';

export const kitchenRoute: Routes = [
    {
        path: 'kitchen',
        component: KitchenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.kitchen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'kitchen/:id',
        component: KitchenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.kitchen.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const kitchenPopupRoute: Routes = [
    {
        path: 'kitchen-new',
        component: KitchenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.kitchen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'kitchen/:id/edit',
        component: KitchenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.kitchen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'kitchen/:id/delete',
        component: KitchenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.kitchen.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
