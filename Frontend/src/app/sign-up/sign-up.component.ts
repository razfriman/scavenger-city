import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  notification: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.notification = null;

    this.apiService.signUp('a', 'b')
    .subscribe(data => {
      this.router.navigate(['/']);
    },
    error => {
      this.submitted = false;
      this.notification = 'Incorrect username or password.';
    });
  }

}
