import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatInputModule,
  MatIconRegistry,
  MatListModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTabsModule,
  MatExpansionModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { MarkdownModule } from 'ngx-markdown';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { GuestGuard } from './guard/guest.guard';
import { LoginGuard } from './guard/login.guard';
import { GuestComponent } from './guest/guest.component';
import { HuntsComponent } from './hunts/hunts.component';
import { HuntDetailComponent } from './hunt-detail/hunt-detail.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiService } from './services/api.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HuntInstanceComponent } from './hunt-instance/hunt-instance.component';
import { HuntInstanceListItemComponent } from './hunt-instance-list-item/hunt-instance-list-item.component';
import { HuntSummaryPanelComponent } from './hunt-summary-panel/hunt-summary-panel.component';
import { HuntSummaryComponent } from './hunt-summary/hunt-summary.component';
import { HuntAvailableFilterPipe } from './pipes/hunt-available-filter.pipe';
import { HuntFinishedFilterPipe } from './pipes/hunt-finished-filter.pipe';
import { AvailableHuntInstancesComponent } from './available-hunt-instances/available-hunt-instances.component';
import { CompletedHuntInstancesComponent } from './completed-hunt-instances/completed-hunt-instances.component';
import { FactDialogComponent } from './dialogs/fact-dialog/fact-dialog.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { JoinHuntComponent } from './join-hunt/join-hunt.component';
import { JoinHuntDetailComponent } from './join-hunt-detail/join-hunt-detail.component';


export function tokenGetter() {
  return localStorage.getItem(AuthService.TOKEN_KEY);
}

const jwtConf: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: ['localhost', 'api.razfriman.com', 'api.scavenger.city']
  }
};

Raven
  .config('https://9372ab341f334865a9cc64d2f5d7fabc@sentry.io/263222', {
    release: '0e4fdef81448dcfa0e16ecc4433ff3997aa53572'
  })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ForbiddenComponent,
    LoginComponent,
    GuestComponent,
    HuntsComponent,
    HuntDetailComponent,
    DashboardComponent,
    SignUpComponent,
    HuntInstanceComponent,
    HuntInstanceListItemComponent,
    HuntSummaryPanelComponent,
    HuntSummaryComponent,
    HuntAvailableFilterPipe,
    HuntFinishedFilterPipe,
    AvailableHuntInstancesComponent,
    CompletedHuntInstancesComponent,
    FactDialogComponent,
    MessageDialogComponent,
    JoinHuntComponent,
    JoinHuntDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    JwtModule.forRoot(jwtConf),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [
    LoginGuard,
    GuestGuard,
    AuthService,
    ApiService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  entryComponents: [FactDialogComponent, MessageDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
