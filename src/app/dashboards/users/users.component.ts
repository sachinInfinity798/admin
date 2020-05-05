import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core'
import { MatTable, MatCheckboxChange } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginService } from '../../services/login.service'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormGroupDirective, FormGroup, NgForm, FormControl, Validators } from '@angular/forms'
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core"
import { AppDateAdapter, APP_DATE_FORMATS } from '../../layouts/date.adapter'
export interface UsersData {
  name: string
  id: number
}

const ELEMENT_DATA: UsersData[] = [
  { id: 1560608769632, name: 'Artificial Intelligence' },
  { id: 1560608796014, name: 'Machine Learning' },
  { id: 1560608787815, name: 'Robotic Process Automation' },
  { id: 1560608805101, name: 'Blockchain' }
]
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Address', 'DOB', 'Gender', 'City', 'Mobile', 'Email', 'actions']
  dataSource = ELEMENT_DATA
  profile: any = {}

  cartoonsData: any = [
    { id: 0, name: 'Tom and Jerry' },
    { id: 1, name: 'Rick and Morty' },
    { id: 2, name: 'Ben 10' },
    { id: 3, name: 'Batman: The Animated Series' }
  ]

  @ViewChild(MatTable, { static: true }) table: MatTable<any>

  @ViewChild('userDialog', { static: true }) userDialog: TemplateRef<any>
  private userDialogRef: MatDialogRef<TemplateRef<any>>

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    private router: Router) { }

  openDialog(action, obj) {
    obj.action = action
    // const dialogRef = this.dialog.open(DialogBoxComponent, {
    //   width: '250px',
    //   data: obj
    // })

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result.event == 'Add') {
    //     this.addRowData(result.data)
    //   } else if (result.event == 'Update') {
    //     this.updateRowData(result.data)
    //   } else if (result.event == 'Delete') {
    //     this.deleteRowData(result.data)
    //   }
    // })
  }
  adduser() {
    this.userDialogRef = this.dialog.open(this.userDialog, { disableClose: true })
    this.userDialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      }
    })
  }
  addRowData(row_obj) {
    var d = new Date()
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name
    })
    this.table.renderRows()

  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name
      }
      return true
    })
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id
    })
  }

  ngOnInit() {
  }
  formControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ])
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : this.formControl.hasError('email') ? 'Not a valid email' : ''
  }
  onNoClick(): void {
    this.userDialogRef.close()

  }
  cartoons: any = []
  onChangeEventFunc(name: string, event: MatCheckboxChange) {
    // cartoons = (this.form.controls.name as FormArray)

    console.log('isChecked', event.checked)
    if (event.checked) {
      this.cartoons.push(name)
    } else {
      const index = this.cartoons.findIndex(x => x.value === name)
      this.cartoons.splice(index, 1)
    }
    console.log('cartoons', this.cartoons)
  }

}
