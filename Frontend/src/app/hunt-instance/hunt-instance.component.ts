import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { HuntInstance } from '../models/hunt-instance';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HuntStatus } from 'app/models/hunt-status';
import { Question } from 'app/models/question';
import { FactDialogData } from 'app/models/fact-dialog-data';
import { MessageDialogData } from 'app/models/message-dialog-data';
import { DialogService } from 'app/services/dialog.services';

@Component({
  selector: 'app-hunt-instance',
  templateUrl: './hunt-instance.component.html',
  styleUrls: ['./hunt-instance.component.scss']
})
export class HuntInstanceComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  hunt: HuntInstance;

  private id: number;
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      answer: ['', Validators.compose([Validators.required])]
    });

    this.reloadQuestion();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  start() {
    this.submitted = true;

    this.apiService.start(this.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.submitted = false;
        this.reloadQuestion();
      });
  }

  getHint() {
    if (this.hunt &&
      this.hunt.currentQuestionInstance &&
      this.hunt.currentQuestionInstance.question &&
      this.hunt.currentQuestionInstance.question.hint) {
      return this.hunt.currentQuestionInstance.question.hint.text;
    }

    return '<NOT USED>';
  }

  isHintUsed() {
    return this.hunt.currentQuestionInstance.question.hint;
  }

  hint() {
    this.submitted = true;

    this.apiService.hint(this.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.submitted = false;

        this.reloadQuestion();
      });
  }

  skip() {
    this.submitted = true;

    this.apiService.skip(this.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.submitted = false;
        this.reloadQuestion();
      });
  }

  submit() {
    this.submitted = true;

    this.apiService.submitAnswer(this.id, {
      text: this.form.value.answer
    })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.submitted = false;

        if (x.data.isCorrect) {
          this.form.reset();
          this.dialogService.openFactDialog(this.hunt.currentQuestionInstance.question);
          this.dialogService.openMessageDialog('Success', 'That was correct!');
        } else {
          this.dialogService.openMessageDialog('Incorrect', 'That was incorrect, please try again');
        }

        this.reloadQuestion();
      });
  }

  reloadQuestion() {
    this.submitted = true;

    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.id = +params['id'];

        if (!this.id) {
          this.router.navigate(['/404']);
          return;
        }

        this.apiService.getInstance(this.id)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(x => {
            this.hunt = x.data;
            this.submitted = false;
          }, err => {
            this.router.navigate(['/404']);
            return;
          });
      });
  }

  isAvailable(): boolean {
    return this.hunt && this.hunt.status === HuntStatus.Available;
  }

  isInProgress(): boolean {
    return this.hunt && this.hunt.status === HuntStatus.InProgress;
  }

  isFinished(): boolean {
    return this.hunt && this.hunt.status === HuntStatus.Finished;
  }

  getHuntStatus(): string {

    if (!this.hunt) {
      return null;
    }

    switch (this.hunt.status) {
      case HuntStatus.Available:
        return 'Available';
      case HuntStatus.InProgress:
        return 'In Progress';
      case HuntStatus.Finished:
        return 'Finished';
      default:
        return 'Unknown';
    }
  }
}
