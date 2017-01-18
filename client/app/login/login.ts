import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import {contentHeaders, hostUrl} from '../common/headers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './app/login/login.html',
  styleUrls:  ['./app/login/login.css']
})
export class Login implements OnInit {
  color: string;
  errorMessage : string;
  constructor(public router: Router, public http: Http,private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.color = params['color']; // this.id = +params['id'] (+) converts string 'id' to a number
      this.errorMessage = params['errorMessage'];
      // In a real app: dispatch action to load the details here.
    });
  }

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.post(hostUrl+'/login', body, { headers: contentHeaders })
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

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
