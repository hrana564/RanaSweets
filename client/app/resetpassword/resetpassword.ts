import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import {contentHeaders, hostUrl} from '../common/headers';


@Component({
  selector: 'signup',
  templateUrl : './app/forgotpassword/forgotpassword.html',
  styleUrls: [ './app/forgotpassword/forgotpassword.css' ]
})
export class Signup {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, userName, password) {
    event.preventDefault();
    let body = JSON.stringify({ userName, password });
    this.http.post(hostUrl+'/signup', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login','green','successfully routed']);
  }

}
