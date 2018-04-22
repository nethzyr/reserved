import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StateCountyComponent } from './state-county.component';
import { StateCountyDetailComponent } from './state-county-detail.component';
import { StateCountyPopupComponent } from './state-county-dialog.component';
import { StateCountyDeletePopupComponent } from './state-county-delete-dialog.component';

export const stateCountyRoute: Routes = [
    {
        path: 'state-county',
        component: StateCountyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.stateCounty.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'state-county/:id',
        component: StateCountyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.stateCounty.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stateCountyPopupRoute: Routes = [
    {
        path: 'state-county-new',
        component: StateCountyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.stateCounty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'state-county/:id/edit',
        component: StateCountyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.stateCounty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'state-county/:id/delete',
        component: StateCountyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.stateCounty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
