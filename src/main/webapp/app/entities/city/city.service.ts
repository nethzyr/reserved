import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { City } from './city.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<City>;

@Injectable()
export class CityService {

    private resourceUrl =  SERVER_API_URL + 'api/cities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cities';

    constructor(private http: HttpClient) { }

    create(city: City): Observable<EntityResponseType> {
        const copy = this.convert(city);
        return this.http.post<City>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(city: City): Observable<EntityResponseType> {
        const copy = this.convert(city);
        return this.http.put<City>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<City>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<City[]>> {
        const options = createRequestOption(req);
        return this.http.get<City[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<City[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<City[]>> {
        const options = createRequestOption(req);
        return this.http.get<City[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<City[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: City = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<City[]>): HttpResponse<City[]> {
        const jsonResponse: City[] = res.body;
        const body: City[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to City.
     */
    private convertItemFromServer(city: City): City {
        const copy: City = Object.assign({}, city);
        return copy;
    }

    /**
     * Convert a City to a JSON which can be sent to the server.
     */
    private convert(city: City): City {
        const copy: City = Object.assign({}, city);
        return copy;
    }
}
