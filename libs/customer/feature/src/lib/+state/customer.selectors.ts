import { Customer } from '@eternal/customer/model';
import { createSelector } from '@ngrx/store';
import { customerFeature } from './customer.reducer';

const { selectCustomers } = customerFeature;

const selectById = (id: number) =>
  createSelector(selectCustomers, (state: Customer[]) =>
    state.find((p) => p.id === id)
  );

export const fromCustomer = {
  selectCustomers,
  selectById,
};
