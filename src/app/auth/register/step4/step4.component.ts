import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscriber } from '../../../model/Subscriber';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {
  @Output() nextStepEvent = new EventEmitter();
  @Output() previousStepEvent = new EventEmitter();
  @Output() nextEvent = new EventEmitter<Subscriber>();

  constructor() {}

  ngOnInit() {}

  nextStep(stepNumber: number) {
    this.nextStepEvent.emit(stepNumber);
  }

  previousStep(stepNumber: number) {
    this.previousStepEvent.emit(stepNumber);
  }

  onNext(form: NgForm) {
    const subscriber = new Subscriber(
      form.value.username,
      form.value.password,
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      new Array('Subscriber')
    );

    this.nextEvent.emit(subscriber);

    this.nextStepEvent.emit(1);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
