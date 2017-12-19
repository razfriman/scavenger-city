import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
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
  MatSnackBarModule,
  MatDialogModule,
  MatTabsModule,
  MatExpansionModule
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
import { FactDialogComponent } from './fact-dialog/fact-dialog.component';
import { ErrorInterceptor } from 'app/error-interceptor';

export function tokenGetter() {
  return localStorage.getItem(AuthService.TOKEN_KEY);
}

const jwtConf: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: ['localhost', 'api.razfriman.com', 'api.scavenger.city']
  }
};

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
    FactDialogComponent
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
    MatSnackBarModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [FactDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
