import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscriber } from '../../model/Subscriber';

@Component({
  selector: 'app-register-component',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {
  private step: number;
  private addStep: number;
  private maxStep = 5;
  private subscriber: Subscriber = new Subscriber();

  constructor(private router: Router, private authService: AuthService) {
    this.addStep = 100 / 4;
    this.step = 1;
  }

  increaseStep(stepNumber: number) {
    if (this.step + stepNumber <= this.maxStep) {
      this.step += stepNumber;
    }
  }
  decreaseStep(stepNumber: number) {
    if (this.step - stepNumber > 0) {
      this.step -= stepNumber;
    }
  }

  saveSubscriber(data: Subscriber) {
    this.subscriber.email = data.email;
    this.subscriber.userName = data.userName;
    this.subscriber.firstName = data.firstName;
    this.subscriber.lastName = data.lastName;
    this.subscriber.password = data.password;
    this.subscriber.roles = data.roles;
  }

  savePricingPlan(subscriptionPlan: string) {
    this.subscriber.subscriptionPlan = subscriptionPlan;
  }

  saveTokenId(tokenId: string) {
    this.subscriber.tokenId = tokenId;

    this.authService.registerSubscriber(this.subscriber).subscribe(() => {
      this.router.navigate(['/Login']);
    });
  }
}
