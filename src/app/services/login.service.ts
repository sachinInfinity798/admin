import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Md5 } from 'ts-md5/dist/md5'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { DatePipe } from '@angular/common'
const loginUser_M = gql`mutation userQueries($email: String!,$password: String!) {
  loginUser_M(email: $email, password: $password){
    token
    id
    locationID
    userName
    email
    pwd
    gender
    mobile
    dob
    Address
    status
    permission
    locationName
  }
}`
const updateUser_M = gql`mutation updateQueries($input: UpdateuserInput!) {
  updateUser_M(input: $input){
    id
    userName
    gender
    mobile
    dob
    Address
  }
}`
const changePassword_M = gql`mutation updateQueries($id: ID!,$password:String!) {
  changePassword_M(id: $id,password:$password){
    id
  }
}`
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _loginuser = new BehaviorSubject<any>({})
  profileuser = this._loginuser.asObservable()

  constructor(private _http: HttpClient, private _apollo: Apollo, private datePipe: DatePipe) { }
  setProfile(data) {
    this._loginuser.next(data)
  }
  get profileget() {
    return this._loginuser.asObservable()
  }

  loginUser(formData) {
    return this._apollo.mutate({
      mutation: loginUser_M,
      variables: {
        email: formData.username,
        password: formData.password
      },
      context: {
        headers: new HttpHeaders().set("No-Auth", "True")
      }

    })
  }
  updateUser(obj) {
    return this._apollo.mutate({
      mutation: updateUser_M,
      variables: {
        input: {
          id: obj.id,
          userName: obj.userName,
          gender: obj.gender,
          mobile: obj.mobile,
          dob: this.datePipe.transform(obj.dob, 'yyyy-MM-dd'),
          Address: obj.Address,
        }
      }

    })
  }
  changePassword(id, password) {
    return this._apollo.mutate({
      mutation: changePassword_M,
      variables: {
        id: id,
        password: password

      }

    })

  }
}
