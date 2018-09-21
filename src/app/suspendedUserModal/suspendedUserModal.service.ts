import { ModalState } from './modalState';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class SuspendedUserModalService {
  private modalSubject = new Subject<ModalState>();

  modalState = this.modalSubject.asObservable();

  constructor() {}

  public show() {
    this.modalSubject.next(<ModalState>{ show: true });
  }

  public hide() {
    this.modalSubject.next(<ModalState>{ show: false });
  }
}
