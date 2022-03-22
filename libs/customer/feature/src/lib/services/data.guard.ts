import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { get } from '../+state/customer.actions';
import { fromCustomer } from '../+state/customer.selectors';

@Injectable({
  providedIn: 'root',
})
export class DataGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    this.store.dispatch(get());
    return this.store.select(fromCustomer.isLoaded).pipe(filter(Boolean));
  }
}
