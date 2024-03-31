import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.login(
      {
        'grant_type': 'password',
        'client_id': 'enigma-client',
        'username': 'esse',
        'password': 'esse'
      }
    )
      .subscribe(value => console.log(value['access_token']))
  }

}
