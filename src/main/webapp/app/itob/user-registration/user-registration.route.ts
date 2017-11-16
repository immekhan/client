import { Route , CanActivate , Resolve , ActivatedRouteSnapshot, RouterStateSnapshot , Routes} from '@angular/router';

import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService , Principal } from '../../shared';
import { UserRegisterComponent } from './user-registration.component';
import {UserRegisterDetailsComponent} from './user-registration-details.component';
import {Injectable} from '@angular/core';

@Injectable()
export class UserRegistrationResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then((account) => this.principal.hasAnyAuthority(['PRIV_USER_PASSWORD']));
    }
}

@Injectable()
export class UserResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const registerRoute: Routes = [
    {
        path: 'user-register',
        component: UserRegisterComponent,
        data: {
            authorities: ['PRIV_USER_PASSWORD'],
            pageTitle: 'register.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-registration-details',
        component: UserRegisterDetailsComponent,
        resolve: {
            'pagingParams': UserResolvePagingParams
        },
        data: {
            authorities: ['PRIV_USER_PASSWORD'],
            pageTitle: 'register.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
