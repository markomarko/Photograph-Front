import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SuspendedUserModalService } from './suspendedUserModal.service';
import { ModalState } from './modalState';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-suspended-user-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('launchModal')
  launchModal: ElementRef;
  isModalShown = false;
  message = 'Your account has been suspended :(';
  private subscription: Subscription;

  constructor(private modalService: SuspendedUserModalService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.modalService.modalState.subscribe(
      (state: ModalState) => {
        this.launchModal.nativeElement.click();
        this.isModalShown = state.show;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    this.router.navigate(['/Welcome']);
  }
}
