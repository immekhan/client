import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {SERVER_API_URL} from '../../app.constants';

@Injectable()
export class CommonService {

    private resourceUrl = SERVER_API_URL + 'api/abs/utility';
    constructor(private http: Http) {}

    fetchByLookUpQuery(idLookup: string): Observable<any> {
        return this.http.post( `${this.resourceUrl}/fetchByLookUpQuery` , idLookup);
    }

    fetchByUserTypeCategory(roleCategory: string): Observable<any> {
        return this.http.post(  `${this.resourceUrl}/fetchUserTypesByRoleCategory` , roleCategory)
            .map((res: Response) => this.convertResponse(res));
    }

    fetchCountries(): Observable<any> {
        return this.http.get(  `${this.resourceUrl}/fetchCountries` )
            .map((res: Response) => this.convertResponse(res));
    }

    fetchCitiesByCountryId(searchCriteria: any): Observable<any> {
        return this.http.post(  `${this.resourceUrl}/fetchCitiesByCountryId` , searchCriteria)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
}
