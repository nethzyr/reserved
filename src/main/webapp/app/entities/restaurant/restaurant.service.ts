import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {Restaurant} from './restaurant.model';
import {createRequestOption} from '../../shared';
import {City} from "../city";
import {Kitchen} from "../kitchen";
import {Food} from "../food";

export type EntityResponseType = HttpResponse<Restaurant>;

@Injectable()
export class RestaurantService {

    private resourceUrl =  SERVER_API_URL + 'api/restaurants';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/restaurants';

    constructor(private http: HttpClient) { }

    create(restaurant: Restaurant): Observable<EntityResponseType> {
        const copy = this.convert(restaurant);
        return this.http.post<Restaurant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(restaurant: Restaurant): Observable<EntityResponseType> {
        const copy = this.convert(restaurant);
        return this.http.put<Restaurant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Restaurant>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Restaurant[]>> {
        const options = createRequestOption(req);
        return this.http.get<Restaurant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Restaurant[]>) => this.convertArrayResponse(res));
    }

    filter(cityFilter: Set<City>, kitchenFilter: Set<Kitchen>, foodFilter: Set<Food>): Observable<HttpResponse<Restaurant[]>> {
        let cityIds: string = '';
        let kitchenIds: string = '';
        let foodIds: string = '';
        cityFilter.forEach((filter) => (cityIds += filter.id + ','));
        kitchenFilter.forEach((filter) => (kitchenIds += filter.id + ','));
        foodFilter.forEach((filter) => (foodIds += filter.id + ','));
        return this.http.get<Restaurant[]>(this.resourceUrl + '/filter', {
            params: new HttpParams().set('cityIds', cityIds)
                .set('kitchenIds', kitchenIds)
                .set('foodIds', foodIds), observe: 'response'
        })
            .map((res: HttpResponse<Restaurant[]>) => this.convertArrayResponse(res));
    }

    queryOwned(req?: any): Observable<HttpResponse<Restaurant[]>> {
        const options = createRequestOption(req);
        return this.http.get<Restaurant[]>(`${this.resourceUrl}-owned`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Restaurant[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Restaurant[]>> {
        const options = createRequestOption(req);
        return this.http.get<Restaurant[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Restaurant[]>) => this.convertArrayResponse(res));
    }

    searchOwned(req?: any): Observable<HttpResponse<Restaurant[]>> {
        const options = createRequestOption(req);
        return this.http.get<Restaurant[]>(`${this.resourceSearchUrl}-owned`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Restaurant[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Restaurant = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Restaurant[]>): HttpResponse<Restaurant[]> {
        const jsonResponse: Restaurant[] = res.body;
        const body: Restaurant[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Restaurant.
     */
    private convertItemFromServer(restaurant: Restaurant): Restaurant {
        const copy: Restaurant = Object.assign({}, restaurant);
        return copy;
    }

    /**
     * Convert a Restaurant to a JSON which can be sent to the server.
     */
    private convert(restaurant: Restaurant): Restaurant {
        const copy: Restaurant = Object.assign({}, restaurant);
        return copy;
    }
}
