/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {ReservedTestModule} from '../../../test.module';
import {RestaurantComponent} from '../../../../../../main/webapp/app/entities/restaurant/restaurant.component';
import {RestaurantService} from '../../../../../../main/webapp/app/entities/restaurant/restaurant.service';
import {Restaurant} from '../../../../../../main/webapp/app/entities/restaurant/restaurant.model';

describe('Component Tests', () => {

    describe('Restaurant Management Component', () => {
        let comp: RestaurantComponent;
        let fixture: ComponentFixture<RestaurantComponent>;
        let service: RestaurantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [RestaurantComponent],
                providers: [
                    RestaurantService
                ]
            })
            .overrideTemplate(RestaurantComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestaurantComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestaurantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Restaurant(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.restaurants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
