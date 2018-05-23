/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {ReservedTestModule} from '../../../test.module';
import {CommentDetailComponent} from '../../../../../../main/webapp/app/entities/comment/comment-detail.component';
import {CommentService} from '../../../../../../main/webapp/app/entities/comment/comment.service';
import {Comment} from '../../../../../../main/webapp/app/entities/comment/comment.model';

describe('Component Tests', () => {

    describe('Comment Management Detail Component', () => {
        let comp: CommentDetailComponent;
        let fixture: ComponentFixture<CommentDetailComponent>;
        let service: CommentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReservedTestModule],
                declarations: [CommentDetailComponent],
                providers: [
                    CommentService
                ]
            })
                .overrideTemplate(CommentDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Comment(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
