import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core'
import { MatCheckboxChange } from '@angular/material'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { LineupService } from '../../services/lineup.service'
import * as CryptoJS from 'crypto-js'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormGroupDirective, FormGroup, NgForm, FormControl, Validators } from '@angular/forms'
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core"
import { lineupType } from './lineup-type'
import { DataSource } from '@angular/cdk/collections'
import { PersonComponent } from '../person/person.component'
import { DeleteComponent } from '../delete/delete.component'

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.scss']
})
export class LineupComponent implements OnInit {
  displayedColumns: string[] = ['JobType', 'Name', 'Location', 'ETA', 'ETC', 'Quantity', 'Options']
  dataSource: lineupType[] = []
  user: any
  msgsuccss: any
  isSuccess = false
  isError = false
  errormsg = ''
  constructor(private changeDetectorRefs: ChangeDetectorRef, private _lineup: LineupService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog) { }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  ngOnInit() {
    this.getuserData()
    this.getJobList()
  }
  getJobList() {
    this._lineup.jobList(this.user.locationID).subscribe(res => {
      if (res.data['joblist_M']) {
        this.dataSource = res.data['joblist_M']
        this._lineup.setjobBox(res.data['joblist_M'])
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
    this._lineup.getjobBox.subscribe(resut => {
      this.dataSource = resut
      this.table.renderRows()
    })
  }
  getuserData() {
    if (localStorage.getItem('_ur')) {
      var bytes = CryptoJS.AES.decrypt(localStorage.getItem('_ur'), 'angular@2020')
      this.user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }
  List(row, index) {
    let dialogRef = this.dialog.open(PersonComponent, {
      data: { jobId: row.id, personlist: row.assigncontactlists },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      }
    })
  }

  delete(row, index) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: row.id, text: 'job ' + row.name, name: 'jobdelete' }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        let jobarry: any = []
        this._lineup.deleteJob(row.id).subscribe(res => {
          if (res.data['deletejob_M']) {
            this._lineup.getjobBox.subscribe(resut => {
              jobarry = resut
            })
            let index = jobarry.findIndex(a => a.id == row.id)
            if (index > -1) { jobarry.splice(index, 1) }
            this._lineup.setjobBox(jobarry)
            this.isSuccess = true
            this.msgsuccss = 'Job deleted Successfully'
            this.clearmsg()
          }
        },
          (error) => {

            // this.error = error
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
}
