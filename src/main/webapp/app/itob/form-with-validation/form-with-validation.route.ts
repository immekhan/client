import { Route , CanActivate , Resolve , ActivatedRouteSnapshot, RouterStateSnapshot , Routes} from '@angular/router';

import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService , Principal } from '../../shared';
import {Injectable} from '@angular/core';
import {FormWithValidationComponent} from './form-with-validation.component';

@Injectable()
export class FormWithValidationResolve implements CanActivate {

    constructor(private principal: Principal) { }

    canActivate() {
        return this.principal.identity().then((account) => this.principal.hasAnyAuthority(['PRIV_FORM_WITH_VALIDATION_TEMP']));
    }
}

@Injectable()
export class FormWithValidationPagingParams implements Resolve<any> {

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

export const fromWithValidationRoute: Routes = [
    {
        path: 'form-with-validation',
        component: FormWithValidationComponent,
        data: {
            authorities: ['PRIV_FORM_WITH_VALIDATION_TEMP'],
            pageTitle: 'fromWithValidation.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'form-with-validation/:id/edit',
        component: FormWithValidationComponent,
        data: {
            authorities: [],
            pageTitle: 'fromWithValidation.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
