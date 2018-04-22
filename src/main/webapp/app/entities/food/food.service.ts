import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Food } from './food.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Food>;

@Injectable()
export class FoodService {

    private resourceUrl =  SERVER_API_URL + 'api/foods';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/foods';

    constructor(private http: HttpClient) { }

    create(food: Food): Observable<EntityResponseType> {
        const copy = this.convert(food);
        return this.http.post<Food>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(food: Food): Observable<EntityResponseType> {
        const copy = this.convert(food);
        return this.http.put<Food>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Food>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Food[]>> {
        const options = createRequestOption(req);
        return this.http.get<Food[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Food[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Food[]>> {
        const options = createRequestOption(req);
        return this.http.get<Food[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Food[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Food = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Food[]>): HttpResponse<Food[]> {
        const jsonResponse: Food[] = res.body;
        const body: Food[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Food.
     */
    private convertItemFromServer(food: Food): Food {
        const copy: Food = Object.assign({}, food);
        return copy;
    }

    /**
     * Convert a Food to a JSON which can be sent to the server.
     */
    private convert(food: Food): Food {
        const copy: Food = Object.assign({}, food);
        return copy;
    }
}
