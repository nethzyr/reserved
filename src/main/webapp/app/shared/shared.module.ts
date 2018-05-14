import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    GooglePlaceIdFinderComponent,
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
        ReservedSharedCommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'GOOGLE_MAPS_API',
            libraries: ['places']
        }),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        GooglePlaceIdFinderComponent
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
        DatePipe,
        GooglePlaceIdFinderComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ReservedSharedModule {
}
