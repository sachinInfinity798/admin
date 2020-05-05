import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BlankComponent } from './layouts/blank/blank.component'
import { FullComponent } from './layouts/full/full.component'
import { DashboardsModule } from './dashboards/dashboards.module'
import { AuthGuard } from './auth/auth.guard'


const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },

      {
        path: '',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      },
      {
        path: '',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }


    ]
  },
  {
    path: 'dashboard',
    component: FullComponent,
    children: [
      { path: '', loadChildren: () => DashboardsModule, canActivate: [AuthGuard] },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }