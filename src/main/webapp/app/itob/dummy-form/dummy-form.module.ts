import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ITOBDummyFormService,
    ITOBDummyFormPopupService,
    ITOBDummyFormComponent,
    ITOBDummyFormDetailComponent,
    ITOBDummyFormDialogComponent,
    ITOBDummyFormPopupComponent,
    ITOBDummyFormDeletePopupComponent,
    ITOBummyFormDeleteDialogComponent,
    itobDummyFormRoute,
    itobDummyFormPopupRoute,
    ITOBDummyFormResolvePagingParams,
} from './';
import {AppSharedModule} from '../../shared/shared.module';

const ENTITY_STATES = [
    ...itobDummyFormRoute,
    ...itobDummyFormPopupRoute,
];

@NgModule({
    imports: [
        AppSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ITOBDummyFormComponent,
        ITOBDummyFormDetailComponent,
        ITOBDummyFormDialogComponent,
        ITOBummyFormDeleteDialogComponent,
        ITOBDummyFormPopupComponent,
        ITOBDummyFormDeletePopupComponent,
    ],
    entryComponents: [
        ITOBDummyFormComponent,
        ITOBDummyFormDialogComponent,
        ITOBDummyFormPopupComponent,
        ITOBummyFormDeleteDialogComponent,
        ITOBDummyFormDeletePopupComponent,
    ],
    providers: [
        ITOBDummyFormService,
        ITOBDummyFormPopupService,
        ITOBDummyFormResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppAbsDummyFormModule {}
