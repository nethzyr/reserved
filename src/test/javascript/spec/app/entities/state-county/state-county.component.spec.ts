/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {ReservedTestModule} from '../../../test.module';
import {StateCountyComponent} from '../../../../../../main/webapp/app/entities/state-county/state-county.component';
import {StateCountyService} from '../../../../../../main/webapp/app/entities/state-county/state-county.service';
import {StateCounty} from '../../../../../../main/webapp/app/entities/state-county/state-county.model';

describe('Component Tests', () => {

    describe('StateCounty Management Component', () => {
        let comp: StateCountyComponent;
        let fixture: ComponentFixture<StateCountyComponent>;
        let service: StateCountyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [StateCountyComponent],
                providers: [
                    StateCountyService
                ]
            })
                .overrideTemplate(StateCountyComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StateCountyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StateCountyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StateCounty(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stateCounties[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
