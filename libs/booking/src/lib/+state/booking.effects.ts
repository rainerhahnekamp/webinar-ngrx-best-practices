import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerFacade } from '@eternal/customer/feature';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { loaded } from './booking.actions';
import { Booking } from './booking.reducer';

const bookings: Map<number, Booking[]> = new Map<number, Booking[]>();
bookings.set(1, [
  {
    id: 1,
    holidayId: 1,
    bookingDate: new Date(2022, 1, 2),
    status: 'pending',
    comment: "A little bit unsure about the holiday. Let's see",
  },
  {
    id: 2,
    holidayId: 2,
    bookingDate: new Date(2022, 1, 2),
    status: 'cancelled',
    comment: 'Seemed to be a little bit stressed out',
  },
]);
bookings.set(3, [
  {
    id: 3,
    holidayId: 1,
    bookingDate: new Date(2022, 1, 2),
    status: 'finished',
    comment:
      "According to Jeremy, he's a quite a grumbler. Complains all the time and nothing seems to be satisfactory.",
  },
]);

@Injectable()
export class BookingEffects {
  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store,
    private customerFacade: CustomerFacade
  ) {}

  load$ = createEffect(() =>
    this.customerFacade.getCustomerId().pipe(
      filter(Boolean),
      map((customerId) => loaded({ bookings: bookings.get(customerId) || [] }))
    )
  );
}
