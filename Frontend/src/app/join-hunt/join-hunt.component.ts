import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-join-hunt',
  templateUrl: './join-hunt.component.html',
  styleUrls: ['./join-hunt.component.scss']
})
export class JoinHuntComponent implements OnInit {

  form: FormGroup;
  hasHttps: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private platformLocation: PlatformLocation
  ) {
    const origin = (platformLocation as any).location.origin as string;
    this.hasHttps = origin.startsWith('https://') || origin.indexOf('localhost') > -1;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      hunt: ['', Validators.compose([Validators.required])]
    });
  }

  readCompleted(data: string) {
    if (!data) {
      return;
    }

    const splitted = data.split('/');

    if (!splitted.length) {
      return;
    }

    const shareID = splitted[splitted.length - 1];
    this.router.navigate(['/join', shareID]);
  }
}
