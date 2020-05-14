import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss']
})
export class JobdetailsComponent implements OnInit {

  @Input() jobdetails: FormGroup
  constructor() { }
  jobType = [{ name: 'Vessel' }, { name: 'NodeJs' }, { name: 'AngularJs' }, { name: 'PHP' }, { name: 'Java' }, { name: 'IOS' }, { name: 'Finance' }, { name: 'SAP' }]

  ngOnInit() {
  }

}
