import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core'
import { NgxPermissionsService } from 'ngx-permissions'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginService } from '../../services/login.service'
import { MatDialogRef, MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormGroupDirective, FormGroup, NgForm, FormControl, Validators } from '@angular/forms'
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core"
import { AppDateAdapter, APP_DATE_FORMATS } from '../date.adapter'
import { Md5 } from 'ts-md5/dist/md5'
import * as CryptoJS from 'crypto-js'
import { ErrorStateMatcher } from '@angular/material/core'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty)
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty)

    return (invalidCtrl || invalidParent)
  }
}


@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class FullComponent implements OnInit {
  isClicked = false
  profile: any
  passwordForm: FormGroup
  matcher = new MyErrorStateMatcher()
  sucmsg = ''
  changePwd = { password: '', confirmpassword: '' }

  constructor(private formBuilder: FormBuilder, private _login: LoginService, private _permission: NgxPermissionsService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog) {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords })
  }
  @ViewChild('profileDialog', { static: true }) profileDialog: TemplateRef<any>
  private profileDialogRef: MatDialogRef<TemplateRef<any>>
  ngOnInit() {
    this._login.profileget.subscribe(userprofile => this.profile = userprofile)


  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value
    let confirmPass = group.controls.confirmPassword.value

    return pass === confirmPass ? null : { notSame: true }
  }
  logout() {
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['/login'])

  }

  EditProfile() {
    this.profileDialogRef = this.dialog.open(this.profileDialog, { disableClose: true })
    this.profileDialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      }
    })
  }

  formControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ])
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : this.formControl.hasError('email') ? 'Not a valid email' : ''
  }
  onNoClick(): void {
    this.profileDialogRef.close()

  }
  update() {
    this.profileDialogRef.close()
    this._login.updateUser(this.profile).subscribe(res => {
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.profile), 'angular@2020')
      localStorage.setItem('_ur', ciphertext.toString())
      this._login.setProfile(this.profile)
      this.sucmsg = 'Profile updated Successfully'
      this.clearmsg()
    })
  }
  updatePassword() {
    this.profileDialogRef.close()
    if (this.passwordForm.invalid) {
      return
    }
    console.log('this.passwordForm.invalid', this.passwordForm.value)
    this._login.changePassword(this.profile.id, Md5.hashStr(this.passwordForm.value.password)).subscribe(res => {
      if (res) {
        this.sucmsg = 'Password Change Successfully'
        this.clearmsg()
      }
    })
  }

  clearmsg() {
    let _this = this
    setTimeout(function () { _this.sucmsg = "" }, 2000)
  }

}
