import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardsRoutes } from './dashboards.routing'
import { ThemeModule } from "../layouts/theme.module"
import { RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CustomersComponent } from './customers/customers.component'
import { NgxPermissionsModule } from 'ngx-permissions'
import { UsersComponent } from './users/users.component'
import { LineupComponent } from './lineup/lineup.component'
import { PersonComponent } from './person/person.component'
import { DeleteComponent } from './delete/delete.component'



@NgModule({
  declarations: [DashboardComponent, CustomersComponent, UsersComponent, LineupComponent, PersonComponent, DeleteComponent],
  exports: [DashboardComponent, CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardsRoutes),
    ThemeModule,
    NgxPermissionsModule.forChild(),

  ]
})
export class DashboardsModule { }
