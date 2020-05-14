import { Component, ElementRef, ContentChildren, QueryList, OnInit, Input, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core'
import { MatTable } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { LineupService } from '../../services/lineup.service'
import * as CryptoJS from 'crypto-js'
import { MatDialogRef, MatDialog } from '@angular/material/dialog'
import { CdkDetailRowDirective } from './cdk-detail-row.directive'
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms'
import { lineupType } from './lineup-type'
import { PersonComponent } from '../person/person.component'
import { DeleteComponent } from '../delete/delete.component'
import { animate, state, style, transition, trigger } from '@angular/animations'



@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class LineupComponent implements OnInit {
  displayedColumns: string[] = ['JobType', 'Name', 'Location', 'ETA', 'ETC', 'Quantity', 'Options']
  displayedClientColumns: string[] = ['File No', 'Client', 'Quantity', 'Commodity', 'Account Managers', 'File Status', 'Options']
  dataSource: lineupType[] = []
  user: any
  msgsuccss: string
  isSuccess = false
  isError = false
  errormsg: string
  jobForm: FormGroup
  jobfileForm: FormGroup
  emailsarry: any = []
  phonesarry: any = []
  jobId: any
  limits = 10
  offset = 0
  totalrow: number
  pageEvent: any
  pageSize = 10
  currentPage = 0
  clientlist: any = []
  managerlist: any = []
  constructor(private fb: FormBuilder, private changeDetectorRefs: ChangeDetectorRef, private _lineup: LineupService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog) { }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  @ViewChild('addjobDialog', { static: true }) addjobDialog: TemplateRef<any>
  @ViewChild('editfileDialog', { static: true }) editfileDialog: TemplateRef<any>
  private readonly triggerElementRef: ElementRef
  private editJobDialogRef: MatDialogRef<TemplateRef<any>>
  private editFileDialogRef: MatDialogRef<TemplateRef<any>>
  @ViewChild(MatTable, { static: true }) subtable: MatTable<any>
  @ContentChildren(TemplateRef) tpl: QueryList<TemplateRef<any>>
  ngOnInit() {
    this.getclientList()
    this.getmanagerList()
    this.jobformFieldGroup()
    this.getuserData()
    this.getJobList()
    this.jobFileFieldGroup()
  }
  getJobList() {
    this._lineup.jobList(this.user.locationID, this.offset, this.limits).subscribe(res => {
      if (res.data['joblist_M']) {
        this.dataSource = res.data['joblist_M']
        this.totalrow = res.data['joblist_M'][0]['count']
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
  handlePage(e: any) {
    this.currentPage = e.pageIndex
    this.pageSize = e.pageSize
    this.limits = this.pageSize
    this.offset = this.currentPage * this.pageSize
    this.getJobList()
  }
  refreceTable() {
    this._lineup.getjobBox.subscribe(resut => {
      this.dataSource = resut
      //this.dataSource._updateChangeSubscription()
      this.table.renderRows()
      this.subtable.renderRows()
    })
  }
  getclientList() {
    this._lineup.clientlist().valueChanges.subscribe(res => {
      if (res.data['clientlist_Q']) {
        this.clientlist = res.data['clientlist_Q']
      }

    },
      (error) => {
      }
    )
  }
  getmanagerList() {
    this._lineup.managerlist().valueChanges.subscribe(res => {
      if (res.data['managerlist_Q']) {
        this.managerlist = res.data['managerlist_Q']
      }
    },
      (error) => {
      }
    )
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
      data: { id: row.id, text: 'job ' + row.name }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        let jobarry: any = []
        this._lineup.deleteJob(row.id).subscribe(res => {
          if (res.data['deletejob_M']) {
            this._lineup.getjobBox.subscribe(resut => {
              jobarry = resut
            })
            //let index = jobarry.findIndex(a => a.id == row.id)
            if (index > -1) { jobarry.splice(index, 1) }
            this._lineup.setjobBox(jobarry)
            this.isSuccess = true
            this.msgsuccss = 'Job deleted Successfully'
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

  jobformFieldGroup() {
    this.jobForm = this.fb.group({
      jobType: ['', [Validators.required]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      ETA: ['', [Validators.required]],
      ETC: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      contactEmailRows: this.fb.array([this.initEmailRows()]),
      contactPhoneRows: this.fb.array([this.initPhoneRows()])

    })
  }
  public get contactEmailRows(): FormArray {
    return this.jobForm.get('contactEmailRows') as FormArray

  }
  addContactEmail() {
    const control = <FormArray>this.jobForm.controls['contactEmailRows']
    control.push(this.initEmailRows())
  }
  addContactPhone() {
    const control = <FormArray>this.jobForm.controls['contactPhoneRows']
    control.push(this.initPhoneRows())
  }
  initEmailRows() {
    return this.fb.group({
      emailType: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }
  initPhoneRows() {
    return this.fb.group({
      phoneType: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
  }
  edit(row, index) {
    let _this = this
    _this.jobId = row.id
    _this.setEditFromfield(row)
    this.editJobDialogRef = this.dialog.open(this.addjobDialog, {
      disableClose: true, position: {
        top: '30px',
      }
    })
    this.editJobDialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        _this._lineup.updatejobs(this.jobForm.value, row.id).subscribe(res => {
          if (res.data['updateJob_M']) {
            row['jobType'] = this.jobForm.value.jobType
            row['name'] = this.jobForm.value.name
            row['ETA'] = this.jobForm.value.ETA
            row['ETC'] = this.jobForm.value.ETC
            row['quantity'] = this.jobForm.value.quantity
            row['address'] = this.jobForm.value.address
            row['country'] = this.jobForm.value.country
            row['state'] = this.jobForm.value.state
            row['city'] = this.jobForm.value.city
            row['zip'] = this.jobForm.value.zip
            row['latitude'] = this.jobForm.value.latitude
            row['longitude'] = this.jobForm.value.longitude
            row['jobphones'] = this.jobForm.value.contactPhoneRows
            row['jobemails'] = this.jobForm.value.contactEmailRows

            _this.isSuccess = true
            _this.msgsuccss = "Job Updated Successfully"
            _this.clearmsg()
          }
        })

      }
    })
  }


  setEditFromfield(row) {
    this.jobForm.patchValue({
      jobType: row.jobType,
      name: row.name,
      location: row.location.name,
      ETA: row.ETA,
      ETC: row.ETC,
      quantity: row.quantity,
      address: row.address,
      country: row.country,
      state: row.state,
      city: row.city,
      zip: row.zip,
      latitude: row.latitude,
      longitude: row.longitude
    })
    this.setjobEmailvals(row)
    this.setjobPhonevals(row)
  }
  setjobEmailvals(row) {
    const control = <FormArray>this.jobForm.controls['contactEmailRows']
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i)
    }
    row['jobemails'].forEach(x => {
      control.push(this.emailValues(x.emailType, x.email))
    })
  }
  emailValues(emailtype, email) {
    return this.fb.group({
      emailType: [emailtype, [Validators.required]],
      email: [email, [Validators.required, Validators.email]],
    })
  }

  setjobPhonevals(row) {
    const control = <FormArray>this.jobForm.controls['contactPhoneRows']
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i)
    }
    row['jobphones'].forEach(x => {
      control.push(this.phoneValues(x.phoneType, x.phone))
    })
  }
  phoneValues(phonetype, phone) {
    return this.fb.group({
      phoneType: [phonetype, [Validators.required]],
      phone: [phone, [Validators.required]],
    })
  }
  onNoClick(): void {
    this.editJobDialogRef.close()

  }
  onfileClick(): void {
    this.editFileDialogRef.close()
  }

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow')

  @Input() singleChildRowDetail: boolean
  private openedRow: CdkDetailRowDirective
  onToggleChange(cdkDetailRow: CdkDetailRowDirective, row): void {
    if (this.singleChildRowDetail && this.openedRow && this.openedRow.expended) {
      this.openedRow.toggle()
    }


    if (!row.close) {
      row.close = true
    } else {
      row.close = false
    }
    this.openedRow = cdkDetailRow.expended ? cdkDetailRow : undefined

  }
  checkExpanded(element): boolean {
    let flag = false
    element.close = false
    this.dataSource.forEach(e => {
      if (e.id === element.id) {
        flag = true
        element.close = true

      }
    })
    return flag
  }


  updatejob() {
    if (this.jobForm.invalid) {
      return
    }

  }
  jobFileFieldGroup() {
    this.jobfileForm = this.fb.group({
      clientId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      Commodity: ['', [Validators.required]],
      filestatus: ['', [Validators.required]],
      fileNo: ['', [Validators.required]],
      assignmanage: ['', [Validators.required]]
    })
  }
  editfile(element, index) {
    let _this = this
    _this.setFiledata(element)
    this.editFileDialogRef = this.dialog.open(this.editfileDialog, {
      disableClose: true, position: {
        top: '30px',
      }
    })
    this.editFileDialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        this._lineup.updatefiles(this.jobfileForm.value, element.jobfile.id).subscribe(res => {
          if (res.data['updatefile_M']) {
            element.jobfile.filestatus = this.jobfileForm.value.filestatus
            element.jobfile.quantity = this.jobfileForm.value.quantity
            element.jobfile.Commodity = this.jobfileForm.value.Commodity
            let filterclient = this.clientlist.filter(i => (i.id == this.jobfileForm.value.clientId))
            element.jobfile.client = filterclient[0]
            element.jobfile.clientId = this.jobfileForm.value.clientId
            let filtermanager = this.managerlist.filter(i => this.jobfileForm.value.assignmanage.includes(i.accountmanager.id))
            element.jobfile.assignmanagetofiles = filtermanager
            element.jobfile.assignmanage = this.jobfileForm.value.assignmanagetofiles
            _this.isSuccess = true
            _this.msgsuccss = "File Updated Successfully"
            _this.clearmsg()

          }

        })
      }
    })
  }
  deletefile(subtable, element, row, index) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: element.id, text: 'File ' + element.jobfile.fileNo }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this._lineup.deletefiles(row.id, element.jobfile.id).subscribe(res => {
          if (res.data['deletefile_M']) {
            let jobarry: any = []
            this._lineup.getjobBox.subscribe(resut => {
              jobarry = resut
            })
            let jobindex = jobarry.findIndex(a => a.id == row.id)
            if (jobindex > -1 && index > -1) { jobarry[jobindex].assignfilelists.splice(index, 1) }
            if (index > -1) { row.assignfilelists.splice(index, 1) }
            this._lineup.setjobBox(jobarry)
            this.refreceTable()
            element.show = true
            this.isSuccess = true
            this.msgsuccss = 'File deleted Successfully'
            this.clearmsg()
          }
        })

      }
    })
  }
  setFiledata(element) {
    let managerarry = []
    for (let i in element.jobfile.assignmanagetofiles) {
      managerarry.push(element.jobfile.assignmanagetofiles[i].accountmanager.id)
    }
    this.jobfileForm.patchValue({
      clientId: element.jobfile.clientId,
      quantity: element.jobfile.quantity,
      Commodity: element.jobfile.Commodity,
      filestatus: element.jobfile.filestatus,
      fileNo: element.jobfile.fileNo,
      assignmanage: managerarry
    })
  }
  updatejobfile() {
  }
}
