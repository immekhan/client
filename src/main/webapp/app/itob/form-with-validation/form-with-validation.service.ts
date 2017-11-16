import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';

@Injectable()
export class FormWithValidationService {

    private resourceUrl = SERVER_API_URL + 'api/abs-dummy-form-custom';

    constructor(private http: Http) {}

    save(fromData: any): Observable<any> {
        return this.http.post(this.resourceUrl, fromData)
            .map((res: Response) => this.convertResponse(res));
    }

    update(fromData: any): Observable<any> {
        return this.http.post(this.resourceUrl + '/update' , fromData)
            .map((res: Response) => this.convertResponse(res));
    }

    find(id: number): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${id}`)
            .map((res: Response) => this.convertResponse(res));
    }

    fetchFileFromSftp(fileName: string): Observable<any> {
        return this.http.post(this.resourceUrl + '/fetchFileFromSftp', fileName)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
}
