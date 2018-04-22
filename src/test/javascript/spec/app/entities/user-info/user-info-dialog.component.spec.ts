/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReservedTestModule } from '../../../test.module';
import { UserInfoDialogComponent } from '../../../../../../main/webapp/app/entities/user-info/user-info-dialog.component';
import { UserInfoService } from '../../../../../../main/webapp/app/entities/user-info/user-info.service';
import { UserInfo } from '../../../../../../main/webapp/app/entities/user-info/user-info.model';
import { PictureService } from '../../../../../../main/webapp/app/entities/picture';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { CityService } from '../../../../../../main/webapp/app/entities/city';
import { RestaurantService } from '../../../../../../main/webapp/app/entities/restaurant';

describe('Component Tests', () => {

    describe('UserInfo Management Dialog Component', () => {
        let comp: UserInfoDialogComponent;
        let fixture: ComponentFixture<UserInfoDialogComponent>;
        let service: UserInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [UserInfoDialogComponent],
                providers: [
                    PictureService,
                    UserService,
                    CityService,
                    RestaurantService,
                    UserInfoService
                ]
            })
            .overrideTemplate(UserInfoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserInfoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserInfo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserInfo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
