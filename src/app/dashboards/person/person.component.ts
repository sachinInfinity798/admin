import { Component, OnInit, Inject, Optional, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core'
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms'
import { PersonService } from '../../services/person.service'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { personType } from './person-type'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog'
import { DeleteComponent } from '../delete/delete.component'
import { MatTable, MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  personId: any
  jobId: any
  msgsuccss: any
  isSuccess = false
  isError = false
  errormsg = ''
  displayedColumns: string[] = ['Name', 'Address', 'Email', 'ContactNumber', 'Company', 'Options']
  dataSource: personType[] = []
  constructor(private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog, private apollo: Apollo, public _person: PersonService,
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<PersonComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true
    if (this.data.personsId != undefined) {
      this.resetlocalStorage()
      this.personId = this.data.personsId
      this.jobId = this.data.jobId
      this.getPersonList()
    }
  }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  ngOnInit() {

  }
  getPersonList() {
    this._person.personList(this.personId).subscribe(res => {
      if (res.data['personlist_M']) {
        this.dataSource = res.data['personlist_M']
        this._person.setpersonBox(res.data['personlist_M'])
        this.refreceTable()
      }
    },
      (error) => {
        this.isError = true
        this.errormsg = error
      }
    )

  }
  refreceTable() {
    this._person.getpersonBox.subscribe(resut => {
      this.dataSource = resut
      this.table.renderRows()
    })
  }
  delete(row, index) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: row.id, jobId: this.jobId, text: 'Person Contact ' + row.name, name: 'contactdelete' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        if (localStorage.getItem('isSuccess') == "Yes") {
          this.isSuccess = true
          this.msgsuccss = localStorage.getItem('delmsg')
          this.clearmsg()

        }
      }
    })
  }
  clearmsg() {

    let _this = this
    setTimeout(function () {
      _this.isSuccess = false
      _this.msgsuccss = ""
    }, 2000)
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  resetlocalStorage() {
    localStorage.removeItem('isSuccess')
    localStorage.removeItem('delmsg')
  }
}
