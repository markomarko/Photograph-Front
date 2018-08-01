import { Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/dataServices';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private data: AuthService) {}

  private token: any;
  onLogin(form: NgForm) {

    const httpParams = new HttpParams()
      .append('username', form.value.username)
      .append('password', form.value.password)
      .append('grant_type', environment.grantType)
      .append('client_id', environment.clientId)
      .append('scope', environment.scope)
      .append('client_secret', environment.clientSecret);

    this.data.login(httpParams).subscribe(token => {
      this.token = token;
      localStorage.setItem('access_token', this.token.access_token);
      localStorage.setItem('expires_in', this.token.expires_in);
      this.router.navigate(['/Home']);
    });
  }

  public resetForm(form: NgForm) {
    form.reset();
  }
}
