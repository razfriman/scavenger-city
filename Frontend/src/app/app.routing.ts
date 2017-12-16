import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { GuestGuard } from './guard/guest.guard';
import { HuntsComponent } from './hunts/hunts.component';
import { HuntDetailComponent } from './hunt-detail/hunt-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
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
