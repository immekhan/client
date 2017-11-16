import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ITOBDummyForm } from './dummy-form.model';
import { ITOBDummyFormService } from './dummy-form.service';

@Component({
    selector: 'jhi-abs-dummy-form-detail',
    templateUrl: './dummy-form-detail.component.html'
})
export class ITOBDummyFormDetailComponent implements OnInit, OnDestroy {

    absDummyForm: ITOBDummyForm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private absDummyFormService: ITOBDummyFormService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAbsDummyForms();
    }

    load(id) {
        this.absDummyFormService.find(id).subscribe((absDummyForm) => {
            this.absDummyForm = absDummyForm;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAbsDummyForms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'absDummyFormListModification',
            (response) => this.load(this.absDummyForm.id)
        );
    }
}
