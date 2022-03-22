import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { loadUser, signInUser, signOutUser } from './security.actions';
import { User } from './security.reducer';
import { fromSecurity } from './security.selectors';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  constructor(private store: Store) {}

  getLoaded$(): Observable<boolean> {
    return this.store.select(fromSecurity.selectLoaded);
  }

  getLoadedUser$(): Observable<User> {
    return combineLatest([
      this.store.select(fromSecurity.selectLoaded),
      this.store.select(fromSecurity.selectUser),
    ]).pipe(
      filter(([loaded]) => loaded),
      map(([, user]) => user),
      this.#verifyUser
    );
  }

  getSignedIn$(): Observable<boolean> {
    return this.store.select(fromSecurity.selectSignedIn);
  }

  load() {
    this.store.dispatch(loadUser());
  }

  signIn(email: string, password: string) {
    this.store.dispatch(signInUser({ email, password }));
  }

  signOut() {
    this.store.dispatch(signOutUser());
  }

  #verifyUser(user$: Observable<undefined | User>) {
    function userGuard(user: undefined | User): user is User {
      return user !== null;
    }

    return user$.pipe(filter(userGuard));
  }
}
