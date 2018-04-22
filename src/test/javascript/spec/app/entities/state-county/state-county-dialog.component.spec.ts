/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReservedTestModule } from '../../../test.module';
import { StateCountyDialogComponent } from '../../../../../../main/webapp/app/entities/state-county/state-county-dialog.component';
import { StateCountyService } from '../../../../../../main/webapp/app/entities/state-county/state-county.service';
import { StateCounty } from '../../../../../../main/webapp/app/entities/state-county/state-county.model';
import { CountryService } from '../../../../../../main/webapp/app/entities/country';

describe('Component Tests', () => {

    describe('StateCounty Management Dialog Component', () => {
        let comp: StateCountyDialogComponent;
        let fixture: ComponentFixture<StateCountyDialogComponent>;
        let service: StateCountyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [StateCountyDialogComponent],
                providers: [
                    CountryService,
                    StateCountyService
                ]
            })
            .overrideTemplate(StateCountyDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateCountyDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateCountyService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StateCounty(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stateCounty = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stateCountyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StateCounty();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stateCounty = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stateCountyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
