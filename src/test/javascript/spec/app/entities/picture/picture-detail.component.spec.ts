/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReservedTestModule } from '../../../test.module';
import { PictureDetailComponent } from '../../../../../../main/webapp/app/entities/picture/picture-detail.component';
import { PictureService } from '../../../../../../main/webapp/app/entities/picture/picture.service';
import { Picture } from '../../../../../../main/webapp/app/entities/picture/picture.model';

describe('Component Tests', () => {

    describe('Picture Management Detail Component', () => {
        let comp: PictureDetailComponent;
        let fixture: ComponentFixture<PictureDetailComponent>;
        let service: PictureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [PictureDetailComponent],
                providers: [
                    PictureService
                ]
            })
            .overrideTemplate(PictureDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PictureDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PictureService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Picture(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.picture).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
