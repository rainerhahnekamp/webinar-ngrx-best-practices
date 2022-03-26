import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@eternal/customer/model';
import { Configuration } from '@eternal/shared/config';
import { MessageService } from '@eternal/shared/ui-messaging';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { add, get, load, loaded, remove, update } from './customer.actions';
import { fromCustomer } from './customer.selectors';

@Injectable()
export class CustomerEffects {
  #baseUrl = this.configuration.baseUrl;
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(get),
      concatLatestFrom(() => this.store.select(fromCustomer.selectLoadStatus)),
      filter(([, loadStatus]) => loadStatus === 'NOT_LOADED'),
      map(() => load())
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      switchMap(() =>
        this.http.get<{ content: Customer[]; totalPages: number }>(
          this.#baseUrl
        )
      ),
      map(({ content }) => loaded({ customers: content }))
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      concatMap(({ customer }) =>
        this.http.post<{ customers: Customer[]; id: number }>(
          this.#baseUrl,
          customer
        )
      ),

      tap(() => this.router.navigateByUrl('/customer')),
      map(() => load())
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      concatMap(({ customer }) =>
        this.http.put<Customer[]>(this.#baseUrl, customer).pipe(
          catchError((err) => {
            this.uiMessage.error(
              'Customer could not be updated. Please try again later'
            );
            return throwError(() => err);
          })
        )
      ),
      tap(() => this.uiMessage.info('Customer has been updated')),
      map(() => load())
    )
  );
  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      concatMap(({ customer }) =>
        this.http.delete<Customer[]>(`${this.#baseUrl}/${customer.id}`)
      ),
      tap(() => this.router.navigateByUrl('/customer')),
      map(() => load())
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private configuration: Configuration,
    private uiMessage: MessageService
  ) {}
}
