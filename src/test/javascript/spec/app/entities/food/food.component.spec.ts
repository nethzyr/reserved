/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReservedTestModule } from '../../../test.module';
import { FoodComponent } from '../../../../../../main/webapp/app/entities/food/food.component';
import { FoodService } from '../../../../../../main/webapp/app/entities/food/food.service';
import { Food } from '../../../../../../main/webapp/app/entities/food/food.model';

describe('Component Tests', () => {

    describe('Food Management Component', () => {
        let comp: FoodComponent;
        let fixture: ComponentFixture<FoodComponent>;
        let service: FoodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [FoodComponent],
                providers: [
                    FoodService
                ]
            })
            .overrideTemplate(FoodComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FoodComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FoodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Food(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.foods[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
