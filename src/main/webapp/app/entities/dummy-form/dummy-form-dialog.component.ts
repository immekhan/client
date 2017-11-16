import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITOBDummyForm } from './dummy-form.model';
import { ITOBDummyFormPopupService } from './dummy-form-popup.service';
import { ITOBDummyFormService } from './dummy-form.service';

@Component({
    selector: 'jhi-abs-dummy-form-dialog',
    templateUrl: './dummy-form-dialog.component.html'
})
export class ITOBDummyFormDialogComponent implements OnInit {

    absDummyForm: ITOBDummyForm;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private absDummyFormService: ITOBDummyFormService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.absDummyForm, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.absDummyForm.id !== undefined) {
            this.subscribeToSaveResponse(
                this.absDummyFormService.update(this.absDummyForm));
        } else {
            this.subscribeToSaveResponse(
                this.absDummyFormService.create(this.absDummyForm));
        }
    }

    private subscribeToSaveResponse(result: Observable<ITOBDummyForm>) {
        result.subscribe((res: ITOBDummyForm) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ITOBDummyForm) {
        this.eventManager.broadcast({ name: 'absDummyFormListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-abs-dummy-form--popup',
    template: ''
})
export class ITOBDummyFormPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private absDummyFormPopupService: ITOBDummyFormPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.absDummyFormPopupService
                    .open(ITOBDummyFormDialogComponent as Component, params['id']);
            } else {
                this.absDummyFormPopupService
                    .open(ITOBDummyFormDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
