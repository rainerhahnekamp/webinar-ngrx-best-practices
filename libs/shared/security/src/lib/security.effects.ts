import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import {
  loadUser,
  loadUserSuccess,
  signInUser,
  signInUserSuccess,
  signOutUser,
  signOutUserSuccess,
} from './security.actions';
import { User } from './security.reducer';

@Injectable()
export class SecurityEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() => this.httpClient.get<User>('/security/user-info')),
      map((user) => loadUserSuccess({ user }))
    )
  );

  signInUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInUser),
      switchMap(({ email, password }) =>
        this.httpClient.post<User>('/security/sign-in', { email, password })
      ),
      map((user) => signInUserSuccess({ user }))
    )
  );

  signOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOutUser),
      switchMap(() => this.httpClient.post<User>('/security/sign-out', {})),
      map((user) => signOutUserSuccess({ user }))
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
