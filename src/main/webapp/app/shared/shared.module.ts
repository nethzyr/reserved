import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent,
    JhiSocialComponent,
    LoginModalService,
    LoginService,
    Principal,
    ReservedSharedCommonModule,
    ReservedSharedLibsModule,
    SocialService,
    StateStorageService,
    UserService,
} from './';

@NgModule({
    imports: [
        ReservedSharedLibsModule,
        ReservedSharedCommonModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        ReservedSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ReservedSharedModule {
}
