import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import {ForgotPassword} from './forgotpassword/forgotpassword';
import {ResetPassword} from './resetpassword/resetpassword';
import { AuthGuard } from './common/auth.guard';

export const routes: Routes = [
  { path: '',component: Login },
  { path: 'login/',component: Login },
  { path: 'login/:color/:errorMessage',  component: Login },
  { path: 'signup', component: Signup },
  { path: 'forgotPassword', component: ForgotPassword },
  { path: 'resetPassword/:userID/:resetID', component: ResetPassword },
  { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: '**',     component: Login },
];