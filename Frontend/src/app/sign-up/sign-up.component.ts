import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

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
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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

    this.apiService.signUp(this.form.value.email, this.form.value.password)
      .subscribe(data => {
        this.authService.setToken(data.data);
        this.router.navigate(['/']);
      },
      error => {
        this.submitted = false;
        this.notification = 'Incorrect username or password.';
        this.snackBar.open('error', 'Cannot create account.', { duration: 2000 });
      });
  }

}
