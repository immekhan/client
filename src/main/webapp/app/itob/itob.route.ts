import { Routes } from '@angular/router';

import {
    registerRoute,
    fromWithValidationRoute
} from './';
import {UserRouteAccessService} from '../shared/auth/user-route-access-service';

const ABS_ROUTES = [
        ...registerRoute,
    ...fromWithValidationRoute
];

export const absState: Routes = [{
    path: '',
    data: {
        authorities: ['PRIV_USER_PASSWORD']
    },
    canActivate: [UserRouteAccessService],
    children: ABS_ROUTES
}];
