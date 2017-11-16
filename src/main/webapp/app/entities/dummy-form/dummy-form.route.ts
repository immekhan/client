import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ITOBDummyFormComponent } from './dummy-form.component';
import { ITOBDummyFormDetailComponent } from './dummy-form-detail.component';
import { ITOBDummyFormPopupComponent } from './dummy-form-dialog.component';
import { ITOBDummyFormDeletePopupComponent } from './dummy-form-delete-dialog.component';

@Injectable()
export class ITOBDummyFormResolvePagingParams implements Resolve<any> {

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

export const itobDummyFormRoute: Routes = [
    {
        path: 'abs-dummy-form',
        component: ITOBDummyFormComponent,
        resolve: {
            'pagingParams': ITOBDummyFormResolvePagingParams
        },
        data: {
            authorities: [],
            pageTitle: 'AbsDummyForms'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'abs-dummy-form/:id',
        component: ITOBDummyFormDetailComponent,
        data: {
            authorities: [],
            pageTitle: 'AbsDummyForms'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const itobDummyFormPopupRoute: Routes = [
    {
        path: 'abs-dummy-form-new',
        component: ITOBDummyFormPopupComponent,
        data: {
            authorities: [],
            pageTitle: 'AbsDummyForms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'abs-dummy-form/:id/edit',
        component: ITOBDummyFormPopupComponent,
        data: {
            authorities: [],
            pageTitle: 'AbsDummyForms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'abs-dummy-form/:id/delete',
        component: ITOBDummyFormDeletePopupComponent,
        data: {
            authorities: [],
            pageTitle: 'AbsDummyForms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
