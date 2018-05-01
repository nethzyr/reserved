/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {ReservedTestModule} from '../../../test.module';
import {KitchenComponent} from '../../../../../../main/webapp/app/entities/kitchen/kitchen.component';
import {KitchenService} from '../../../../../../main/webapp/app/entities/kitchen/kitchen.service';
import {Kitchen} from '../../../../../../main/webapp/app/entities/kitchen/kitchen.model';

describe('Component Tests', () => {

    describe('Kitchen Management Component', () => {
        let comp: KitchenComponent;
        let fixture: ComponentFixture<KitchenComponent>;
        let service: KitchenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [KitchenComponent],
                providers: [
                    KitchenService
                ]
            })
                .overrideTemplate(KitchenComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KitchenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KitchenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Kitchen(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.kitchens[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
