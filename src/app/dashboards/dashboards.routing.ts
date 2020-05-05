import { Routes } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'
import { CustomersComponent } from './customers/customers.component'
import { NgxPermissionsGuard } from 'ngx-permissions'
import { UsersComponent } from './users/users.component'
import { LineupComponent } from './lineup/lineup.component'

export const DashboardsRoutes: Routes = [


    {
        path: '',
        children: [
            {
                path: '',
                component: DashboardComponent,
                canActivate: [NgxPermissionsGuard],
            },
            {
                path: 'customers',
                component: CustomersComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions:
                    {
                        only: ['2', 'ALL'],
                        redirectTo: '/dashboard'
                    }
                }
            },
            {
                path: 'lineup',
                component: LineupComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions:
                    {
                        only: ['1', 'ALL'],
                        redirectTo: '/dashboard'
                    }
                }
            },
            {
                path: 'viewusers',
                component: UsersComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions:
                    {
                        only: ['ALL'],
                        redirectTo: '/dashboard'
                    }
                }
            }


        ]
    }
]