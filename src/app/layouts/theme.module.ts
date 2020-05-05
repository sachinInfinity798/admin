import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { HttpClientModule } from "@angular/common/http"
import { MatPaginatorModule } from "@angular/material"
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms'
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
  MatSidenavModule,
  MatListModule,
  MatDialogModule,

} from '@angular/material'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatRadioModule } from '@angular/material/radio'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCheckboxModule } from '@angular/material/checkbox'


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  exports: [RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatPaginatorModule, MatToolbarModule,
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
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule

  ]
})
export class ThemeModule {


}
