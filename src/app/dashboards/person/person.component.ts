import { Component, OnInit, Inject, Optional, ViewChild, ChangeDetectorRef } from '@angular/core'
import { PersonService } from '../../services/person.service'
import { personType } from './person-type'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog'
import { DeleteComponent } from '../delete/delete.component'
import { MatTable } from '@angular/material/table'

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  jobId: any
  msgsuccss: string
  isSuccess = false
  isError = false
  errormsg: string
  displayedColumns: string[] = ['Name', 'Address', 'Email', 'ContactNumber', 'Company', 'Options']
  dataSource: personType[] = []
  constructor(private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog, public _person: PersonService,
    public dialogRef: MatDialogRef<PersonComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true
    if (this.data.personlist) {
      this.jobId = this.data.jobId
      this._person.setpersonBox(data.personlist)
      this.dataSource = data.personlist
    }
  }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  ngOnInit() {
  }
  refreceTable() {
    this._person.getpersonBox.subscribe(resut => {
      this.dataSource = resut
      this.table.renderRows()
    })
  }
  delete(row, index) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: row.personlist.id, jobId: this.jobId, text: 'Person Contact ' + row.personlist.name }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

        let personarry: any = []
        this._person.deletePersonContact(row.personlist.id, this.jobId).subscribe(res => {
          if (res.data['deleteperson_M']) {
            this._person.getpersonBox.subscribe(resut => {
              personarry = resut
            })
            //let index = personarry.findIndex(a => a.id == row.id)
            if (index > -1) { personarry.splice(index, 1) }
            this._person.setpersonBox(personarry)
            this.refreceTable()
            this.isSuccess = true
            this.msgsuccss = 'Contact Person deleted Successfully'
            this.clearmsg()
          }
        },
          (error) => {

            this.isError = true
            this.errormsg = error
          }
        )
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
}
