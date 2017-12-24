import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-hunt',
  templateUrl: './join-hunt.component.html',
  styleUrls: ['./join-hunt.component.scss']
})
export class JoinHuntComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      hunt: ['', Validators.compose([Validators.required])]
    });
  }

  decodedOutput(data: any) {
    console.log(data);
  }
}
