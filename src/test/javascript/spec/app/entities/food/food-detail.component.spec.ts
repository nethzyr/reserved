/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReservedTestModule } from '../../../test.module';
import { FoodDetailComponent } from '../../../../../../main/webapp/app/entities/food/food-detail.component';
import { FoodService } from '../../../../../../main/webapp/app/entities/food/food.service';
import { Food } from '../../../../../../main/webapp/app/entities/food/food.model';

describe('Component Tests', () => {

    describe('Food Management Detail Component', () => {
        let comp: FoodDetailComponent;
        let fixture: ComponentFixture<FoodDetailComponent>;
        let service: FoodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [FoodDetailComponent],
                providers: [
                    FoodService
                ]
            })
            .overrideTemplate(FoodDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FoodDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FoodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Food(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.food).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
