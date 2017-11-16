import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ITOBDummyForm } from './dummy-form.model';
import { ITOBDummyFormService } from './dummy-form.service';

@Injectable()
export class ITOBDummyFormPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private absDummyFormService: ITOBDummyFormService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.absDummyFormService.find(id).subscribe((absDummyForm) => {
                    this.ngbModalRef = this.absDummyFormModalRef(component, absDummyForm);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.absDummyFormModalRef(component, new ITOBDummyForm());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    absDummyFormModalRef(component: Component, absDummyForm: ITOBDummyForm): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.absDummyForm = absDummyForm;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
