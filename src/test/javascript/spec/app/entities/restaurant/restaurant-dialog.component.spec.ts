/* tslint:disable max-line-length */
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {HttpResponse} from '@angular/common/http';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {JhiEventManager} from 'ng-jhipster';

import {ReservedTestModule} from '../../../test.module';
import {RestaurantDialogComponent} from '../../../../../../main/webapp/app/entities/restaurant/restaurant-dialog.component';
import {RestaurantService} from '../../../../../../main/webapp/app/entities/restaurant/restaurant.service';
import {Restaurant} from '../../../../../../main/webapp/app/entities/restaurant/restaurant.model';
import {CityService} from '../../../../../../main/webapp/app/entities/city';
import {UserService} from '../../../../../../main/webapp/app/shared';
import {KitchenService} from '../../../../../../main/webapp/app/entities/kitchen';
import {FoodService} from '../../../../../../main/webapp/app/entities/food';
import {PictureService} from '../../../../../../main/webapp/app/entities/picture';

describe('Component Tests', () => {

    describe('Restaurant Management Dialog Component', () => {
        let comp: RestaurantDialogComponent;
        let fixture: ComponentFixture<RestaurantDialogComponent>;
        let service: RestaurantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [RestaurantDialogComponent],
                providers: [
                    CityService,
                    UserService,
                    KitchenService,
                    FoodService,
                    PictureService,
                    RestaurantService
                ]
            })
            .overrideTemplate(RestaurantDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestaurantDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestaurantService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Restaurant(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.restaurant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'restaurantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Restaurant();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.restaurant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'restaurantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
