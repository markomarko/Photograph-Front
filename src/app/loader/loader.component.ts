import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from './loaderState';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  showLoader = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.showLoader = state.show;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
