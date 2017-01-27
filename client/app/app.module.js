"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
// import { AUTH_PROVIDERS } from 'angular2-jwt';
var app_1 = require('./app');
var auth_guard_1 = require('./common/auth.guard');
var home_1 = require('./home/home');
var login_1 = require('./login/login');
var signup_1 = require('./signup/signup');
var forgotpassword_1 = require('./forgotpassword/forgotpassword');
var resetpassword_1 = require('./resetpassword/resetpassword');
var app_routes_1 = require('./app.routes');
var router_1 = require("@angular/router");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(app_routes_1.routes, { useHash: true })],
            providers: [
                //...AUTH_PROVIDERS,
                auth_guard_1.AuthGuard],
            declarations: [app_1.App,
                home_1.Home,
                login_1.Login,
                signup_1.Signup,
                forgotpassword_1.ForgotPassword,
                resetpassword_1.ResetPassword],
            bootstrap: [app_1.App]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map