import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {SERVER_API_URL} from '../../app.constants';

@Injectable()
export class JhiMetricsService {

    private resourceUrl = SERVER_API_URL;
    constructor(private http: Http) {}

    getMetrics(): Observable<any> {
        return this.http.get(this.resourceUrl + 'management/metrics').map((res: Response) => res.json());
    }

    threadDump(): Observable<any> {
        return this.http.get(this.resourceUrl + 'management/dump').map((res: Response) => res.json());
    }
}
