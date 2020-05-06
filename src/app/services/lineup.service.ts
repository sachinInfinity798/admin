import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Md5 } from 'ts-md5/dist/md5'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { DatePipe } from '@angular/common'
const joblist_M = gql`mutation listQueries($locationId: ID!) {
  joblist_M(locationId: $locationId){
    id
    jobType
    name
    ETA
    ETC
    quantity
    location{
      name
    }
    assigncontactlists{
      id
      personlist{
        id
        name
        address
        email
        contactNumber
        company
      }
    }
  }
}`
const deletejob_M = gql`mutation deleteQueries($Id: String!) {
  deletejob_M(Id: $Id){
    id
  }
}`
@Injectable({
  providedIn: 'root'
})
export class LineupService {
  private isjobBox = new BehaviorSubject<any>({})
  jobbox = this.isjobBox.asObservable()

  constructor(private _http: HttpClient, private _apollo: Apollo, private datePipe: DatePipe) { }
  setjobBox(data) {
    this.isjobBox.next(data)
  }

  get getjobBox() {
    return this.isjobBox.asObservable()
  }

  jobList(locationid) {
    return this._apollo.mutate({
      mutation: joblist_M,
      variables: {
        locationId: locationid,

      }

    })

  }
  deleteJob(Id) {
    return this._apollo.mutate({
      mutation: deletejob_M,
      variables: {
        Id: Id,
      }
    })
  }

}
