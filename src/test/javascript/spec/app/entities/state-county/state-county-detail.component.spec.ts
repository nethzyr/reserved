/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ReservedTestModule} from '../../../test.module';
import {StateCountyDetailComponent} from '../../../../../../main/webapp/app/entities/state-county/state-county-detail.component';
import {StateCountyService} from '../../../../../../main/webapp/app/entities/state-county/state-county.service';
import {StateCounty} from '../../../../../../main/webapp/app/entities/state-county/state-county.model';

describe('Component Tests', () => {

    describe('StateCounty Management Detail Component', () => {
        let comp: StateCountyDetailComponent;
        let fixture: ComponentFixture<StateCountyDetailComponent>;
        let service: StateCountyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [StateCountyDetailComponent],
                providers: [
                    StateCountyService
                ]
            })
                .overrideTemplate(StateCountyDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateCountyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateCountyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StateCounty(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stateCounty).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
