import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {StateCounty} from './state-county.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<StateCounty>;

@Injectable()
export class StateCountyService {

    private resourceUrl = SERVER_API_URL + 'api/state-counties';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/state-counties';

    constructor(private http: HttpClient) {
    }

    create(stateCounty: StateCounty): Observable<EntityResponseType> {
        const copy = this.convert(stateCounty);
        return this.http.post<StateCounty>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(stateCounty: StateCounty): Observable<EntityResponseType> {
        const copy = this.convert(stateCounty);
        return this.http.put<StateCounty>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StateCounty>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StateCounty[]>> {
        const options = createRequestOption(req);
        return this.http.get<StateCounty[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<StateCounty[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<StateCounty[]>> {
        const options = createRequestOption(req);
        return this.http.get<StateCounty[]>(this.resourceSearchUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<StateCounty[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StateCounty = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StateCounty[]>): HttpResponse<StateCounty[]> {
        const jsonResponse: StateCounty[] = res.body;
        const body: StateCounty[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StateCounty.
     */
    private convertItemFromServer(stateCounty: StateCounty): StateCounty {
        const copy: StateCounty = Object.assign({}, stateCounty);
        return copy;
    }

    /**
     * Convert a StateCounty to a JSON which can be sent to the server.
     */
    private convert(stateCounty: StateCounty): StateCounty {
        const copy: StateCounty = Object.assign({}, stateCounty);
        return copy;
    }
}
