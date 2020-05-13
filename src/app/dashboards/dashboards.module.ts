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
import { CdkDetailRowDirective } from './lineup/cdk-detail-row.directive';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { JobaddressesComponent } from './jobaddresses/jobaddresses.component';
import { JobcontactsComponent } from './jobcontacts/jobcontacts.component';



@NgModule({
  declarations: [DashboardComponent, CustomersComponent, UsersComponent, LineupComponent, PersonComponent, DeleteComponent, CdkDetailRowDirective, JobdetailsComponent, JobaddressesComponent, JobcontactsComponent],
  exports: [DashboardComponent, CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardsRoutes),
    ThemeModule,
    NgxPermissionsModule.forChild(),

  ]
})
export class DashboardsModule { }
