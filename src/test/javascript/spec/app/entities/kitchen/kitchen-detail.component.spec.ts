/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReservedTestModule } from '../../../test.module';
import { KitchenDetailComponent } from '../../../../../../main/webapp/app/entities/kitchen/kitchen-detail.component';
import { KitchenService } from '../../../../../../main/webapp/app/entities/kitchen/kitchen.service';
import { Kitchen } from '../../../../../../main/webapp/app/entities/kitchen/kitchen.model';

describe('Component Tests', () => {

    describe('Kitchen Management Detail Component', () => {
        let comp: KitchenDetailComponent;
        let fixture: ComponentFixture<KitchenDetailComponent>;
        let service: KitchenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [KitchenDetailComponent],
                providers: [
                    KitchenService
                ]
            })
            .overrideTemplate(KitchenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KitchenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KitchenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Kitchen(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.kitchen).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
