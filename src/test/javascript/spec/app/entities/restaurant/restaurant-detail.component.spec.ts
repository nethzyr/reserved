/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ReservedTestModule} from '../../../test.module';
import {RestaurantDetailComponent} from '../../../../../../main/webapp/app/entities/restaurant/restaurant-detail.component';
import {RestaurantService} from '../../../../../../main/webapp/app/entities/restaurant/restaurant.service';
import {Restaurant} from '../../../../../../main/webapp/app/entities/restaurant/restaurant.model';

describe('Component Tests', () => {

    describe('Restaurant Management Detail Component', () => {
        let comp: RestaurantDetailComponent;
        let fixture: ComponentFixture<RestaurantDetailComponent>;
        let service: RestaurantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [RestaurantDetailComponent],
                providers: [
                    RestaurantService
                ]
            })
            .overrideTemplate(RestaurantDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestaurantDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestaurantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Restaurant(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.restaurant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
