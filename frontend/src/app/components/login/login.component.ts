import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: boolean;
  logingFormGroup: FormGroup;
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService,
    public dialogRef: MatDialogRef<LoginComponent>,) { }

  ngOnInit(): void {
    this.logingFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        usrnameOrEmail: new FormControl('', [Validators.required, Validators.minLength(2)]),
        password: new FormControl('', [Validators.required, Validators.minLength(2)])
      })
    });
  }

  onSubmit() {
    let usrnameOrEmail = this.logingFormGroup.get('user').value.usrnameOrEmail;
    let password = this.logingFormGroup.get('user').value.password;
    this.authenticationService.login(usrnameOrEmail, password).subscribe((response: HttpResponse<any>) => {
      const JWT = response.body.accessToken
      if (JWT) {
        this.authenticationService.setToken(JWT);
        this.dialogRef.close();
        this.registerService.login();
        this.snackBar.open("successfully login", "", { duration: 3000 });
      }

    },
      error => {
        
        console.log("wrong entry")
        this.snackBar.open("wrong entry", "", { duration: 3000 });
      }
    )
  }
}
