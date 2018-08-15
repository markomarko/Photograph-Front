import { Injectable } from '@angular/core';
import { LoaderState } from './loaderState';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  public show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  public hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
