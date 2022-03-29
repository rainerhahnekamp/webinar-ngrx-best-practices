import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromCustomer } from './customer.selectors';

@Injectable({ providedIn: 'root' })
export class CustomerFacade {
  #customerId: Observable<number | undefined>;
  constructor(private store: Store) {
    this.#customerId = this.store.select(fromCustomer.selectSelectedId);
  }

  getCustomerId(): Observable<number | undefined> {
    return this.#customerId;
  }
}
