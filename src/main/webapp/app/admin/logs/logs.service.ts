import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Log } from './log.model';
import {SERVER_API_URL} from '../../app.constants';

@Injectable()
export class LogsService {

    private resourceUrl = SERVER_API_URL;
    constructor(private http: Http) { }

    changeLevel(log: Log): Observable<Response> {
        return this.http.put(this.resourceUrl + 'management/logs', log);
    }

    findAll(): Observable<Log[]> {
        return this.http.get(this.resourceUrl + 'management/logs').map((res: Response) => res.json());
    }
}
