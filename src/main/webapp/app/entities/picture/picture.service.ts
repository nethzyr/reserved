import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Picture } from './picture.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Picture>;

@Injectable()
export class PictureService {

    private resourceUrl =  SERVER_API_URL + 'api/pictures';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/pictures';

    constructor(private http: HttpClient) { }

    create(picture: Picture): Observable<EntityResponseType> {
        const copy = this.convert(picture);
        return this.http.post<Picture>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(picture: Picture): Observable<EntityResponseType> {
        const copy = this.convert(picture);
        return this.http.put<Picture>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Picture>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Picture[]>> {
        const options = createRequestOption(req);
        return this.http.get<Picture[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Picture[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Picture[]>> {
        const options = createRequestOption(req);
        return this.http.get<Picture[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Picture[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Picture = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Picture[]>): HttpResponse<Picture[]> {
        const jsonResponse: Picture[] = res.body;
        const body: Picture[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Picture.
     */
    private convertItemFromServer(picture: Picture): Picture {
        const copy: Picture = Object.assign({}, picture);
        return copy;
    }

    /**
     * Convert a Picture to a JSON which can be sent to the server.
     */
    private convert(picture: Picture): Picture {
        const copy: Picture = Object.assign({}, picture);
        return copy;
    }
}
