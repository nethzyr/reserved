/* tslint:disable max-line-length */
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {JhiEventManager} from 'ng-jhipster';

import {ReservedTestModule} from '../../../test.module';
import {RestaurantDeleteDialogComponent} from '../../../../../../main/webapp/app/entities/restaurant/restaurant-delete-dialog.component';
import {RestaurantService} from '../../../../../../main/webapp/app/entities/restaurant/restaurant.service';

describe('Component Tests', () => {

    describe('Restaurant Management Delete Component', () => {
        let comp: RestaurantDeleteDialogComponent;
        let fixture: ComponentFixture<RestaurantDeleteDialogComponent>;
        let service: RestaurantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [RestaurantDeleteDialogComponent],
                providers: [
                    RestaurantService
                ]
            })
                .overrideTemplate(RestaurantDeleteDialogComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestaurantDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestaurantService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
