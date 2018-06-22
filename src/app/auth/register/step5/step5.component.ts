import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {
  @Output() previousStepEvent = new EventEmitter();
  @Output() tokenIdEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  previousStep(stepNumber: number) {
    this.previousStepEvent.emit(stepNumber);
  }

  getToken(form: NgForm) {
    (<any>window).Stripe.setPublishableKey(environment.StripePK);

    (<any>window).Stripe.card.createToken(
      {
        number: form.value.cardNumber,
        exp_month: form.value.MM,
        exp_year: form.value.YY,
        cvc: form.value.CVC
      },
      (status: number, response: any) => {
        if (status === 200) {
          this.tokenIdEvent.emit(response.id);
        }
      }
    );
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
