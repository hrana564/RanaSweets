import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import {contentHeaders, hostUrl} from '../common/headers';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";


@Component({
  selector: 'resetPassword',
  templateUrl : './app/resetpassword/resetpassword.html',
  styleUrls: [ './app/resetpassword/resetpassword.css' ]
})
export class ResetPassword implements OnInit{
  public resetPasswordForm : FormGroup;
  constructor(public router: Router, public http: Http,private fb:FormBuilder) {
    this.resetPasswordForm = fb.group({
      password : ['',[Validators.required,Validators.minLength(3)]]
    });
  }

  resetPassword(event, password) {
    event.preventDefault();
    let body = JSON.stringify({ password });
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
    this.router.navigate(['login']);
  }

  ngOnInit(): void {

  }

}
