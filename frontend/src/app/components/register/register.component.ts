import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/modules/customer';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantiyt: number = 0;

  registerFormGroup: FormGroup;
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private authenticationService: AuthenticationService) { }

  customer = { firstName: '', lastName: '', email: '' , password:'', confirmPassword:''};
  address = { street: '', city: '', state: '', country: '', zipCode: '' }
  //creditCard = { cardType: '', nameOnCard: '', cardNumber: '', securityCode: '', expirationMonth: '', expirationYear: '' }
 
  get firstName() { return this.registerFormGroup.get('customer.firstName'); }
  get lastName() { return this.registerFormGroup.get('customer.lastName'); }
  get email() { return this.registerFormGroup.get('customer.email'); }
  get password() { return this.registerFormGroup.get('customer.password'); }
  get confirmPassword() { return this.registerFormGroup.get('customer.confirmPassword'); }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(2)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
      })
    });
  }

  onSubmit() {
    let firstName = this.registerFormGroup.get('customer').value.firstName;
    let lastName = this.registerFormGroup.get('customer').value.lastName;
    let email = this.registerFormGroup.get('customer').value.email;
    let password = this.registerFormGroup.get('customer').value.password;
    let ConfPassoword = this.registerFormGroup.get('customer').value.confirmPassword;
    let username = firstName + " " + lastName
    if (password == ConfPassoword) {
      let customer = new Customer(firstName, lastName, email)

      this.registerService.saveCustomer(customer).subscribe(data => {
        if (data) {
          // console.log(data);       
          this.authenticationService.singUp(username,email, password).subscribe(data => {
            // console.log(data);
            this.snackBar.open("You have successfully registered", "", { duration: 3000 });

          })
        }
      },
        error => {
          console.log("You are  allready  registered")
          this.snackBar.open("You are  allready  registered or your entry failed", "", { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open("Password and Confirm Password are not identical", "", { duration: 3000 });
    }
  }
}
