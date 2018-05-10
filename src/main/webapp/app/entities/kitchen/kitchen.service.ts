import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Kitchen} from './kitchen.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<Kitchen>;

@Injectable()
export class KitchenService {

    private resourceUrl = SERVER_API_URL + 'api/kitchens';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/kitchens';

    constructor(private http: HttpClient) {
    }

    create(kitchen: Kitchen): Observable<EntityResponseType> {
        const copy = this.convert(kitchen);
        return this.http.post<Kitchen>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(kitchen: Kitchen): Observable<EntityResponseType> {
        const copy = this.convert(kitchen);
        return this.http.put<Kitchen>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Kitchen>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Kitchen[]>> {
        const options = createRequestOption(req);
        return this.http.get<Kitchen[]>(`${this.resourceUrl}?isList=0`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Kitchen[]>) => this.convertArrayResponse(res));
    }

    list(req?: any): Observable<HttpResponse<Kitchen[]>> {
        const options = createRequestOption(req);
        return this.http.get<Kitchen[]>(`${this.resourceUrl}?isList=1`, {params: options, observe: 'response'})
            .map((res: HttpResponse<Kitchen[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Kitchen[]>> {
        const options = createRequestOption(req);
        return this.http.get<Kitchen[]>(this.resourceSearchUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<Kitchen[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Kitchen = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Kitchen[]>): HttpResponse<Kitchen[]> {
        const jsonResponse: Kitchen[] = res.body;
        const body: Kitchen[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Kitchen.
     */
    private convertItemFromServer(kitchen: Kitchen): Kitchen {
        const copy: Kitchen = Object.assign({}, kitchen);
        return copy;
    }

    /**
     * Convert a Kitchen to a JSON which can be sent to the server.
     */
    private convert(kitchen: Kitchen): Kitchen {
        const copy: Kitchen = Object.assign({}, kitchen);
        return copy;
    }
}
