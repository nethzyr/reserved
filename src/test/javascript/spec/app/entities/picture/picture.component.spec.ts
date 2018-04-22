/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReservedTestModule } from '../../../test.module';
import { PictureComponent } from '../../../../../../main/webapp/app/entities/picture/picture.component';
import { PictureService } from '../../../../../../main/webapp/app/entities/picture/picture.service';
import { Picture } from '../../../../../../main/webapp/app/entities/picture/picture.model';

describe('Component Tests', () => {

    describe('Picture Management Component', () => {
        let comp: PictureComponent;
        let fixture: ComponentFixture<PictureComponent>;
        let service: PictureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [PictureComponent],
                providers: [
                    PictureService
                ]
            })
            .overrideTemplate(PictureComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PictureComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PictureService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Picture(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pictures[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
