import { createAction, props } from '@ngrx/store';
import { Booking } from './booking.reducer';

export const load = createAction('[Customer Booking] Load');
export const loaded = createAction(
  '[Customer Booking] Loaded',
  props<{ bookings: Booking[] }>()
);
export const reset = createAction('[Customer Booking] Reset');
