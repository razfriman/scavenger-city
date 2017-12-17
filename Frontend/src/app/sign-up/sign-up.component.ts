import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  private ngUnsubscribe = new Subject();

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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    this.submitted = true;

    this.apiService.signUp(this.form.value.email, this.form.value.password)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.authService.setToken(data.data);
        this.router.navigate(['/']);
      },
      error => {
        this.submitted = false;
        this.snackBar.open('error', 'Cannot create account.', { duration: 2000 });
      });
  }
}
