import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { MessageDialogComponent } from 'app/dialogs/message-dialog/message-dialog.component';
import { MessageDialogData } from 'app/models/message-dialog-data';

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
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    this.submitted = true;

    this.apiService.signUp({
      email: this.form.value.email,
      password: this.form.value.password
    })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.authService.setToken(data.data);
        this.router.navigate(['/']);
      },
      error => {
        this.submitted = false;
        this.openDialog('Error', error.error.data);
      });
  }

  openDialog(title: string, message: string, closeButtonLabel: string = 'Close'): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: {
        title: title,
        message: message,
        closeButtonLabel: closeButtonLabel
      } as MessageDialogData
    });
  }
}
