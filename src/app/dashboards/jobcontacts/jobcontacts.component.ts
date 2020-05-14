import { Component, OnInit, Output, Input, OnChanges, EventEmitter } from '@angular/core'
import { FormGroup, FormArray } from '@angular/forms'

@Component({
  selector: 'app-jobcontacts',
  templateUrl: './jobcontacts.component.html',
  styleUrls: ['./jobcontacts.component.scss']
})
export class JobcontactsComponent implements OnInit, OnChanges {
  @Input() contactdetails: FormGroup
  @Output("addContactEmail") addContactEmail: EventEmitter<any> = new EventEmitter()
  @Output("addContactPhone") addContactPhone: EventEmitter<any> = new EventEmitter()
  emailtype = [{ name: 'work' }, { name: 'other' }]
  phonetype = [{ name: 'office' }, { name: 'other' }]
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes) {
    console.log(changes)

  }

  deleteEmail(index: number) {
    const control = <FormArray>this.contactdetails.controls['contactEmailRows']
    control.removeAt(index)
  }

  deletePhone(index: number) {
    const control = <FormArray>this.contactdetails.controls['contactPhoneRows']
    control.removeAt(index)
  }

}
