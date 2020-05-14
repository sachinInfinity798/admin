import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-jobaddresses',
  templateUrl: './jobaddresses.component.html',
  styleUrls: ['./jobaddresses.component.scss']
})
export class JobaddressesComponent implements OnInit {
  @Input() addresses: FormGroup
  constructor() { }
  ngOnInit() {
  }

}
