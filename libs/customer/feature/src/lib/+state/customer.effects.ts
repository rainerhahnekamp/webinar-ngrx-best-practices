import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@eternal/customer/model';
import { Configuration } from '@eternal/shared/config';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, filter, map, switchMap, tap } from 'rxjs/operators';
import {
  add,
  added,
  get,
  load,
  loaded,
  remove,
  removed,
  update,
  updated,
} from './customer.actions';
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
      map(({ customers }) => added({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      concatMap(({ customer }) =>
        this.http.put<Customer[]>(this.#baseUrl, customer)
      ),
      map((customers) => updated({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );
  removeCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      concatMap(({ customer }) =>
        this.http.delete<Customer[]>(`${this.#baseUrl}/${customer.id}`)
      ),
      map((customers) => removed({ customers })),
      tap(() => this.router.navigateByUrl('/customer'))
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private configuration: Configuration
  ) {}
}
