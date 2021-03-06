import {LOCALE_ID, NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import locale from '@angular/common/locales/hu';

import {
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLanguageHelper,
    ReservedSharedLibsModule
} from './';

@NgModule({
    imports: [
        ReservedSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'hu'
        },
    ],
    exports: [
        ReservedSharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class ReservedSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
