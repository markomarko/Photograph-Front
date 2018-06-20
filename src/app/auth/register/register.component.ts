import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-component',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onSignup(form: NgForm) {
    const user = new User(
      form.value.username,
      form.value.password,
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      new Array('Subscriber')
    );
    console.log(user);
    this.authService.register(user).subscribe(() => {
      this.router.navigate(['/Login']);
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
