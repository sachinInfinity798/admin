import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { FlexLayoutModule } from '@angular/flex-layout'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FullComponent } from './layouts/full/full.component'
import { BlankComponent } from './layouts/blank/blank.component'
import { ThemeModule } from "./layouts/theme.module"

import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { DashboardsModule } from './dashboards/dashboards.module'
import { NgxPermissionsModule } from 'ngx-permissions'

import { AuthGuard } from './auth/auth.guard'
import { AuthInterceptor } from './auth/auth.interceptor'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { environment } from '../environments/environment'
import { setContext } from 'apollo-link-context'
import { HttpHeaders } from '@angular/common/http'
import { DatePipe } from '@angular/common'
import { PersonComponent } from './dashboards/person/person.component'
import { DeleteComponent } from './dashboards/delete/delete.component'

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,

} from '@angular/material'



@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    FullComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ThemeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    ApolloModule,
    HttpLinkModule,
    DashboardsModule,
    NgxPermissionsModule.forRoot(),
  ],
  entryComponents: [
    PersonComponent, DeleteComponent
  ],
  providers: [DatePipe, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    apollo.create({
      link: httpLink.create({ uri: environment.graphql }),
      cache: new InMemoryCache()
    })
  }
}
