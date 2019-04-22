import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  invalidLogin = '';
  constructor(
              private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiService) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const loginPayload = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };

    this.apiService.login(loginPayload).subscribe(
      data => {
        if (data.status === 200) {
          // console.log('-----result server by login----', data.result.token);
          window.localStorage.setItem('token', data.result.token);
          this.router.navigate(['list-user']);
        }
     },
     badReasponse => {
      // this.error = badReasponse.error;
      console.log('----error-----', badReasponse.error);
      this.invalidLogin = badReasponse.error.invalid;
      // alert(badReasponse.error);
    });

    // if (this.loginForm.controls.email.value === 'semen@gmail.com'
    //               && this.loginForm.controls.password.value === '123456') {
    //     this.router.navigate(['list-user']);
    // } else {
    //   this.invalidLogin = true;
    // }
  }
  ngOnInit() {
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailPattern)])],
      password: ['', Validators.required]
    });
  }
}
