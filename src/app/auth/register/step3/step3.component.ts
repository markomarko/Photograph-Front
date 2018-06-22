import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  @Output() nextStepEvent = new EventEmitter();
  @Output() previousStepEvent = new EventEmitter();
  @Output() pricingPlanEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  nextStep(stepNumber: number, pricingPlan: string) {
    this.nextStepEvent.emit(stepNumber);
    this.pricingPlanEvent.emit(pricingPlan);
  }

  previousStep(stepNumber: number) {
    this.previousStepEvent.emit(stepNumber);
  }
}
