import { Component, OnInit, Inject, Optional } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog'
import * as CryptoJS from 'crypto-js'
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms'
import { LineupService } from '../../services/lineup.service'
import { PersonService } from '../../services/person.service'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  user: any
  constructor(private apollo: Apollo, public _lineup: LineupService, public _person: PersonService,
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DeleteComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    dialogRef.disableClose = true
    this.getuserData()
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  getuserData() {
    if (localStorage.getItem('_ur')) {
      var bytes = CryptoJS.AES.decrypt(localStorage.getItem('_ur'), 'angular@2020')
      this.user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    }
  }
  confirmDelete(modalData: any): void {
    switch (modalData.name) {
      case "jobdelete":
        this.jobDelete(modalData)
        break

      case "contactdelete":
        this.contactdelete(modalData)
        break

      default:
        break
    }

  }

  jobDelete(jobData: any) {
    let jobarry: any = []
    this._lineup.deleteJob(this.data.id).subscribe(res => {
      if (res.data['deletejob_M']) {
        this.resetJobList()
        this.setConfirmMsg('Job deleted Successfully')
        this.data = {}
      }
    },
      (error) => {

        // this.error = error
      }
    )


  }

  contactdelete(contactData: any) {
    let personarry: any = []
    this._person.deletePersonContact(this.data.id, this.data.jobId).subscribe(res => {
      if (res.data['deleteperson_M']) {
        this._person.getpersonBox.subscribe(resut => {
          personarry = resut
        })
        let index = personarry.findIndex(a => a.id == this.data.id)
        if (index > -1) { personarry.splice(index, 1) }
        this._person.setpersonBox(personarry)
        this.resetJobList()
        this.setConfirmMsg('Contact Person deleted Successfully')
        this.data = {}
      }
    },
      (error) => {

        // this.error = error
      }
    )
  }

  resetJobList() {
    this._lineup.jobList(this.user.locationID).subscribe(res => {
      if (res.data['joblist_M']) {
        this._lineup.setjobBox(res.data['joblist_M'])
      }
    },
      (error) => {

        // this.error = error
      }
    )

  }
  setConfirmMsg(msg) {
    localStorage.setItem('isSuccess', 'Yes')
    localStorage.setItem('delmsg', msg)
  }

}
