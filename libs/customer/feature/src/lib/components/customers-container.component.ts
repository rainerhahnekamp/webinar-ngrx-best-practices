import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { CustomersComponentModule } from '@eternal/customer/ui';
import { Store } from '@ngrx/store';
import { fromCustomer } from '../+state/customer.selectors';

@Component({
  template: ` <eternal-customers
    *ngIf="customers$ | async as customers"
    [customers]="customers"
  ></eternal-customers>`,
})
export class CustomersContainerComponent {
  customers$ = this.store.select(fromCustomer.selectCustomers);

  constructor(private store: Store) {}
}

@NgModule({
  declarations: [CustomersContainerComponent],
  exports: [CustomersContainerComponent],
  imports: [CommonModule, CustomersComponentModule],
})
export class CustomersContainerComponentModule {}
