import { selectSelectedCustomer } from '@eternal/customer/feature';
import { createSelector } from '@ngrx/store';
import { bookingFeature } from './booking.reducer';

const { selectBookings, selectLoaded } = bookingFeature;

const selectBookingData = createSelector(
  selectSelectedCustomer,
  selectBookings,
  selectLoaded,
  (customer, bookings, loaded) => {
    if (customer === undefined) {
      return undefined;
    }

    return {
      customerName: customer.name + ', ' + customer.firstname,
      bookings,
      loaded,
    };
  }
);

export const fromBookings = { selectBookings, selectBookingData };
