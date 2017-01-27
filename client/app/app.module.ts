import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


// import { AUTH_PROVIDERS } from 'angular2-jwt';

import {App} from './app'
import { AuthGuard } from './common/auth.guard';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import {ForgotPassword} from './forgotpassword/forgotpassword';
import  {ResetPassword} from './resetpassword/resetpassword';
import { routes } from './app.routes';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes,{useHash:true})],
    providers:[
        //...AUTH_PROVIDERS,
        AuthGuard],
    declarations: [App ,
        Home,
        Login,
        Signup,
        ForgotPassword,
        ResetPassword],
    bootstrap: [App]
})
export class AppModule {}