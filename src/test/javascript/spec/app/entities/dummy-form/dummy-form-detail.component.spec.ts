/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ITOBDummyFormDetailComponent } from '../../../../../../main/webapp/app/entities/dummy-form/dummy-form-detail.component';
import { ITOBDummyFormService } from '../../../../../../main/webapp/app/entities/dummy-form/dummy-form.service';
import { ITOBDummyForm } from '../../../../../../main/webapp/app/entities/dummy-form/dummy-form.model';
import {AppTestModule} from '../../../test.module';

describe('Component Tests', () => {

    describe('ITOBDummyForm Management Detail Component', () => {
        let comp: ITOBDummyFormDetailComponent;
        let fixture: ComponentFixture<ITOBDummyFormDetailComponent>;
        let service: ITOBDummyFormService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppTestModule],
                declarations: [ITOBDummyFormDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ITOBDummyFormService,
                    JhiEventManager
                ]
            }).overrideTemplate(ITOBDummyFormDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ITOBDummyFormDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ITOBDummyFormService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ITOBDummyForm(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.absDummyForm).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
