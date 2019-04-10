import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../core/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;
  loading = false;
  error = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    salary: ''
  };
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    const regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
    this.addForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.loading = true;

    this.apiService.createUser(this.addForm.value)
      .subscribe(
      data => {
        this.router.navigate(['list-user']);
      },
      badReasponse => {
        this.error = badReasponse.error;
        console.log('----error-----', this.error);
      }
    );
  }
}
