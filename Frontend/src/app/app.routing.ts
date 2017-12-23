import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { GuestGuard } from './guard/guest.guard';
import { LoginGuard } from './guard/login.guard';
import { HuntsComponent } from './hunts/hunts.component';
import { HuntDetailComponent } from './hunt-detail/hunt-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HuntInstanceComponent } from './hunt-instance/hunt-instance.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { GuestComponent } from 'app/guest/guest.component';
import { AvailableHuntInstancesComponent } from 'app/available-hunt-instances/available-hunt-instances.component';
import { CompletedHuntInstancesComponent } from 'app/completed-hunt-instances/completed-hunt-instances.component';
import { JoinHuntComponent } from 'app/join-hunt/join-hunt.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'guest',
    component: GuestComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'available', pathMatch: 'full' },
      { path: 'available', component: AvailableHuntInstancesComponent, canActivate: [LoginGuard] },
      { path: 'completed', component: CompletedHuntInstancesComponent, canActivate: [LoginGuard] }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'hunts',
    component: HuntsComponent
  },
  {
    path: 'hunts/:id',
    component: HuntDetailComponent
  },
  {
    path: 'hunt-instances/:id',
    component: HuntInstanceComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'join',
    component: JoinHuntComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
