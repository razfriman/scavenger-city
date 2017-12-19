import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HuntInstance } from '../models/hunt-instance';
import { Subject } from 'rxjs/Subject';
import { HuntStatus } from 'app/models/hunt-status';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FactDialogComponent } from 'app/fact-dialog/fact-dialog.component';
import { Question } from 'app/models/question';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

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

    return 'NOT USED';
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
          this.snackBar.open('Success', 'That was correct!');
          this.form.reset();
          this.openDialog(this.hunt.currentQuestionInstance.question);
        } else {
          this.snackBar.open('Sorry', 'That was incorrect, try again');
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

  openDialog(question: Question): void {
    const dialogRef = this.dialog.open(FactDialogComponent, {
      width: '250px',
      data: { question: this.hunt.currentQuestionInstance.question }
    });
  }
}
