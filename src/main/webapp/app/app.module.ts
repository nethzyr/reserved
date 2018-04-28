import './vendor.ts';

import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LocalStorageService, Ng2Webstorage, SessionStorageService} from 'ngx-webstorage';
import {JhiEventManager} from 'ng-jhipster';

import {AuthInterceptor} from './blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor';
import {ReservedSharedModule, UserRouteAccessService} from './shared';
import {ReservedAppRoutingModule} from './app-routing.module';
import {ReservedHomeModule} from './home';
import {ReservedAdminModule} from './admin/admin.module';
import {ReservedAccountModule} from './account/account.module';
import {ReservedEntityModule} from './entities/entity.module';
import {PaginationConfig} from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    ActiveMenuDirective,
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        ReservedAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        ReservedSharedModule,
        ReservedHomeModule,
        ReservedAdminModule,
        ReservedAccountModule,
        ReservedEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class ReservedAppModule {}
