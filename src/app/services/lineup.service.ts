import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Md5 } from 'ts-md5/dist/md5'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { DatePipe } from '@angular/common'
const joblist_M = gql`mutation listQueries($locationId: ID!,$offset: ID!,$limit: ID!) {
  joblist_M(locationId: $locationId,offset: $offset,limit: $limit){
    count
    id
    jobType
    name
    ETA
    ETC
    quantity
    address
    country
    state
    city
    zip
    latitude
    longitude
    jobphones{
       id
       phoneType
       phone
    }
    jobemails{
          id
          emailType
          email
    }
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
    assignfilelists{
      id
      jobfile{
        id
        clientId
        quantity
        Commodity
        filestatus
        fileNo
        client{
          id
          name
        }
        assignmanagetofiles{
          id
          accountmanager{
            id
            managername
          }
        }
      }
      
    }
  }
}`
const deletejob_M = gql`mutation deleteQueries($Id: String!) {
  deletejob_M(Id: $Id){
    id
  }
}`
const updateJob_M = gql`mutation updateQueries($input: UpdatejobInput!) {
  updateJob_M(input: $input){
    id
  }
}`
const getClient_Q = gql`query userQueries {
  clientlist_Q {
    id
    name
  }
}`
const managerlist_Q = gql`query userQueries {
  managerlist_Q {
   accountmanager{
    id
    managername
   } 
  }
}`
const updatefile_M = gql`mutation updateQueries($input: UpdatefileInput!) {
  updatefile_M(input: $input){
    id
  }
}`
const deletefile_M = gql`mutation deleteQueries($jobId: ID!,$fileId:ID!) {
  deletefile_M(jobId: $jobId,fileId:$fileId){
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

  jobList(locationid, offset, limit) {
    return this._apollo.mutate({
      mutation: joblist_M,
      variables: {
        locationId: locationid,
        offset: offset,
        limit: limit

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
  updatejobs(obj, Id) {
    return this._apollo.mutate({
      mutation: updateJob_M,
      variables: {
        input: {
          Id: Id,
          jobType: obj.jobType,
          name: obj.name,
          ETA: obj.ETA,
          ETC: obj.ETC,
          quantity: obj.quantity,
          address: obj.address,
          country: obj.country,
          state: obj.state,
          city: obj.city,
          zip: obj.zip,
          latitude: parseFloat(obj.latitude),
          longitude: parseFloat(obj.latitude),
          jobphones: obj.contactPhoneRows,
          jobemails: obj.contactEmailRows,
        }
      }

    })
  }

  clientlist() {
    return this._apollo.watchQuery({
      query: getClient_Q,
    })
  }
  managerlist() {
    return this._apollo.watchQuery({
      query: managerlist_Q,
    })
  }
  updatefiles(obj, Id) {
    return this._apollo.mutate({
      mutation: updatefile_M,
      variables: {
        input: {
          Id: Id,
          Commodity: obj.Commodity,
          clientId: obj.clientId,
          quantity: obj.quantity,
          filestatus: obj.filestatus,
          assignmanage: obj.assignmanage
        }
      }

    })
  }

  deletefiles(jobId, fileId) {
    return this._apollo.mutate({
      mutation: deletefile_M,
      variables: {
        jobId: jobId,
        fileId: fileId
      }
    })
  }
}
