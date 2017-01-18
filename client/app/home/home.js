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
var headers_1 = require("../common/headers");
//import { AuthHttp } from 'angular2-jwt';
var Home = (function () {
    function Home() {
    }
    // constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    //   this.jwt = localStorage.getItem('id_token');
    //   this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    // }
    Home.prototype.logout = function () {
        localStorage.removeItem('id_token');
        //this.router.navigate(['login']);
    };
    Home.prototype.callAnonymousApi = function () {
        this._callApi('Anonymous', headers_1.hostUrl + '/api/random-quote');
    };
    Home.prototype.callSecuredApi = function () {
        this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
    };
    Home.prototype._callApi = function (type, url) {
        this.response = null;
        if (type === 'Anonymous') {
        }
        if (type === 'Secured') {
        }
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './app/home/home.html',
            styleUrls: ['./app/home/home.css']
        }), 
        __metadata('design:paramtypes', [])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map