import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppSharedModule} from '../shared';

import {FormWithValidationComponent, FormWithValidationService, UserRegister, UserRegisterComponent} from './';
import {absState} from './itob.route';
import {UserRegisterDetailsComponent} from './user-registration/user-registration-details.component';
import {UserRegistrationResolve, UserResolvePagingParams} from './user-registration/user-registration.route';
import {CommonService} from './common/common.service';
import {WindowRefService} from './common/window.service';
import {
    ButtonModule,
    CodeHighlighterModule,
    DropdownModule,
    FileUploadModule,
    GrowlModule,
    InputTextareaModule,
    InputTextModule,
    PanelModule,
    SharedModule,
    TabViewModule
} from 'primeng/primeng';
import {DownloadCsvService} from './common/download.csv.service';
import {DownloadFileService} from './common/download.file.service';
import {AppAbsDummyFormModule} from './dummy-form/dummy-form.module';

// import {FormWithValidationComponent} from './form-with-validation/form-with-validation.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppSharedModule,
        ButtonModule,
        GrowlModule,
        InputTextModule,
        PanelModule,
        DropdownModule,
        InputTextareaModule,
        TabViewModule,
        CodeHighlighterModule,
        FileUploadModule,
        SharedModule,
        AppAbsDummyFormModule,
        RouterModule.forRoot(absState, { useHash: true })
    ],
    declarations: [
        UserRegisterComponent,
        UserRegisterDetailsComponent,
        FormWithValidationComponent,
    ],
    providers: [
        UserRegister,
        UserResolvePagingParams,
        UserRegistrationResolve,
        FormWithValidationService,
        CommonService,
        WindowRefService,
        DownloadCsvService,
        DownloadFileService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppITOBModule {}
