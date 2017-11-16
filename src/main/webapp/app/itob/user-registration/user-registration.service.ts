import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class UserRegister {

    constructor(private http: Http) {}

    save(userDTO: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/abs/createUser', userDTO);
    }
}
