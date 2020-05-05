import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Apollo, QueryRef } from 'apollo-angular'
import gql from 'graphql-tag'
import { HttpClient } from '@angular/common/http'
import { LoginService } from '../../services/login.service'
import * as CryptoJS from 'crypto-js'
import { Md5 } from 'ts-md5/dist/md5'
import { NgxPermissionsService } from 'ngx-permissions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  submitted = false
  error = ''
  constructor(private _permission: NgxPermissionsService, private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private apollo: Apollo, public httpClient: HttpClient, private _login: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return
    }
    this.loginForm.value.password = Md5.hashStr(this.loginForm.value.password)
    this._login.loginUser(this.loginForm.value).subscribe(res => {
      if (res.data['loginUser_M']) {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(res.data['loginUser_M'][0]), 'angular@2020')
        localStorage.setItem('_ur', ciphertext.toString())
        localStorage.setItem('_to', res.data['loginUser_M'][0].token)
        this._login.setProfile(res.data['loginUser_M'][0])
        if (res.data['loginUser_M'][0].permission) {
          const perm = res.data['loginUser_M'][0].permission.split(",")
          localStorage.setItem('perm', perm)
          this._permission.loadPermissions(perm)
        }
        this.router.navigate(['/dashboard/lineup'])
      } else {
        this.error = "EmailId/Password don't match."
      }

    },
      (error) => {
        this.error = error
      }
    )
  }


}
