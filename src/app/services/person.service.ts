import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Md5 } from 'ts-md5/dist/md5'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { DatePipe } from '@angular/common'
const personlist_M = gql`mutation listQueries($personId: String!) {
  personlist_M(personId: $personId){
    id
    name
    address
    email
    contactNumber
    company
  }
}`

const deleteperson_M = gql`mutation deleteQueries($Id: String!,$JobId:String!) {
  deleteperson_M(Id: $Id,JobId:$JobId){
    id
  }
}`

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private isPersonBox = new BehaviorSubject<any>({})
  personbox = this.isPersonBox.asObservable()
  constructor(private _http: HttpClient, private _apollo: Apollo, private datePipe: DatePipe) { }

  setpersonBox(data) {
    this.isPersonBox.next(data)
  }

  get getpersonBox() {
    return this.isPersonBox.asObservable()
  }

  personList(personId) {
    return this._apollo.mutate({
      mutation: personlist_M,
      variables: {
        personId: personId,
      }
    })
  }
  deletePersonContact(Id, jobId) {
    return this._apollo.mutate({
      mutation: deleteperson_M,
      variables: {
        Id: Id,
        JobId: jobId
      }
    })
  }
}
