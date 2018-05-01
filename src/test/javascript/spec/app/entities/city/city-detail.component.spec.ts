/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ReservedTestModule} from '../../../test.module';
import {CityDetailComponent} from '../../../../../../main/webapp/app/entities/city/city-detail.component';
import {CityService} from '../../../../../../main/webapp/app/entities/city/city.service';
import {City} from '../../../../../../main/webapp/app/entities/city/city.model';

describe('Component Tests', () => {

    describe('City Management Detail Component', () => {
        let comp: CityDetailComponent;
        let fixture: ComponentFixture<CityDetailComponent>;
        let service: CityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [CityDetailComponent],
                providers: [
                    CityService
                ]
            })
                .overrideTemplate(CityDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new City(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.city).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
