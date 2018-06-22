import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  @Output() nextStepEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  nextStep(stepNumber: number) {
    this.nextStepEvent.emit(stepNumber);
  }
}
