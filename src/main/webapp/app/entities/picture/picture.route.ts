import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PictureComponent } from './picture.component';
import { PictureDetailComponent } from './picture-detail.component';
import { PicturePopupComponent } from './picture-dialog.component';
import { PictureDeletePopupComponent } from './picture-delete-dialog.component';

@Injectable()
export class PictureResolvePagingParams implements Resolve<any> {

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

export const pictureRoute: Routes = [
    {
        path: 'picture',
        component: PictureComponent,
        resolve: {
            'pagingParams': PictureResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.picture.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'picture/:id',
        component: PictureDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.picture.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const picturePopupRoute: Routes = [
    {
        path: 'picture-new',
        component: PicturePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.picture.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'picture/:id/edit',
        component: PicturePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.picture.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'picture/:id/delete',
        component: PictureDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reservedApp.picture.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
