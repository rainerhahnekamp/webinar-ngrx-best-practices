import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@eternal/customer/model';
import { Configuration } from '@eternal/shared/config';
import { withErrorMessageContext } from '@eternal/shared/http';
import { safeConcatMap } from '@eternal/shared/ngrx-utils';
import { MessageService } from '@eternal/shared/ui-messaging';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import {
  add,
  load,
  loaded,
  loadFailed,
  remove,
  update,
} from './customer.actions';

@Injectable()
export class CustomerEffects {
  #baseUrl = this.configuration.baseUrl + '/customer';

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      switchMap(() =>
        this.http
          .get<{ content: Customer[]; totalPages: number }>(
            this.#baseUrl
            // params: new HttpParams().set('page', 10),
          )
          .pipe(
            map(({ content }) => loaded({ customers: content })),
            catchError(() => of(loadFailed()))
          )
      )
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
      safeConcatMap(({ customer }) =>
        this.http
          .put<Customer[]>(this.#baseUrl, customer, {
            context: withErrorMessageContext('Customer could not be updated'),
          })
          .pipe(
            tap(() => this.uiMessage.info('Customer has been updated')),
            map(() => load())
          )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      concatMap(({ customer, forward, message }) =>
        this.http.delete<Customer[]>(`${this.#baseUrl}/${customer.id}`).pipe(
          tap(() => this.uiMessage.info(message)),
          tap(() => this.router.navigateByUrl(forward)),
          map(() => load())
        )
      )
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
