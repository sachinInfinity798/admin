import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthenticationRoutes } from './authentication.routing'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { ThemeModule } from "../layouts/theme.module"


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    ThemeModule
  ]
})
export class AuthenticationModule { }
