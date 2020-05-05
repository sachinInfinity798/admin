import { Component, OnInit } from '@angular/core'
import { NgxPermissionsService } from 'ngx-permissions'
import { LoginService } from './services/login.service'
import * as CryptoJS from 'crypto-js'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin';
  user: any

  constructor(private _login: LoginService, private _permission: NgxPermissionsService, private route: ActivatedRoute,
    private router: Router, ) { }
  ngOnInit() {
    this.setprofileData();
  }
  setprofileData() {
    if (localStorage.getItem('_ur')) {
      var bytes = CryptoJS.AES.decrypt(localStorage.getItem('_ur'), 'angular@2020')
      this.user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      this.checkUserExists()
    }
  }

  checkUserExists() {
    let loginobj = {}
    loginobj['username'] = this.user.email
    loginobj['password'] = this.user.pwd
    this._login.loginUser(loginobj).subscribe(res => {
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
      } else {
        this.logout();
      }
    },
      (error) => {
        this.logout();
        // this.error = error;
      }
    );
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this._permission.loadPermissions([]);
    this._login.setProfile({});
    this.user = null;
    this.router.navigate(["/login"]);
  }
}
