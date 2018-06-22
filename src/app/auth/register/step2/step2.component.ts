import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from '../../../model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  @Output() nextStepEvent = new EventEmitter();
  @Output() previousStepEvent = new EventEmitter();
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  previousStep() {
    this.previousStepEvent.emit(4);
  }

  onSignup(form: NgForm) {
    const user = new User(
      form.value.username,
      form.value.password,
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      form.value.pEmail,
      new Array('User')
    );
    this.authService.register(user).subscribe(() => {
      this.router.navigate(['/Login']);
    });
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
