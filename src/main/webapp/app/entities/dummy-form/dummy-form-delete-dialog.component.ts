import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITOBDummyForm } from './dummy-form.model';
import { ITOBDummyFormPopupService } from './dummy-form-popup.service';
import { ITOBDummyFormService } from './dummy-form.service';

@Component({
    selector: 'jhi-abs-dummy-form-delete-dialog',
    templateUrl: './dummy-form-delete-dialog.component.html'
})
export class ITOBDummyFormDeleteDialogComponent {

    absDummyForm: ITOBDummyForm;

    constructor(
        private absDummyFormService: ITOBDummyFormService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.absDummyFormService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'absDummyFormListModification',
                content: 'Deleted an absDummyForm'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-abs-dummy-form--delete-popup',
    template: ''
})
export class ITOBDummyFormDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private absDummyFormPopupService: ITOBDummyFormPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.absDummyFormPopupService
                .open(ITOBDummyFormDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
