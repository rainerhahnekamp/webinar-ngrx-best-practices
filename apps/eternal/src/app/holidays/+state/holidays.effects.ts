import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Configuration } from '@eternal/shared/config';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Holiday } from '../holiday';
import { holidaysActions } from './holidays.actions';

@Injectable()
export class HolidaysEffects {
  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.findHolidays),
      switchMap(() => this.httpClient.get<Holiday[]>('/holiday')),
      map((holidays) =>
        holidays.map((holiday) => ({
          ...holiday,
          imageUrl: `${this.config.baseUrl}${holiday.imageUrl}`,
        }))
      ),
      map((holidays) => holidaysActions.findHolidaysSuccess({ holidays }))
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private config: Configuration
  ) {}
}
