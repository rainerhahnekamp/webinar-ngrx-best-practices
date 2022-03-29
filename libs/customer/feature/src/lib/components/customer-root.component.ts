import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromCustomer } from '../+state/customer.selectors';

@Component({
  template: `<ng-container *ngrxLet="hasError$ as hasError">
    <router-outlet *ngIf="!hasError"></router-outlet>
    <p *ngIf="hasError">Sorry, this feature is currently unavailable.</p>
  </ng-container>`,
})
export class CustomerRootComponent {
  hasError$: Observable<boolean> = this.store.select(
    fromCustomer.selectHasError
  );
  constructor(private store: Store) {}
}

@NgModule({
  declarations: [CustomerRootComponent],
  exports: [CustomerRootComponent],
  imports: [CommonModule, RouterModule, ReactiveComponentModule],
})
export class CustomerRootComponentModule {}
