import { createFeature, createReducer, on } from '@ngrx/store';
import { loaded } from './booking.actions';

export type BookingStatus =
  | 'pending'
  | 'booked'
  | 'paid'
  | 'cancelled'
  | 'finished';

export interface Booking {
  id: number;
  holidayId: number;
  bookingDate: Date;
  status: BookingStatus;
  comment: string;
}

export interface BookingState {
  bookings: Booking[];
  loaded: boolean;
}

const initialState: BookingState = {
  bookings: [],
  loaded: false,
};

export const bookingFeature = createFeature({
  name: 'booking',
  reducer: createReducer(
    initialState,
    on(loaded, (state, action) => ({
      ...state,
      bookings: action.bookings,
      loaded: true,
    }))
  ),
});
