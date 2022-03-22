import { Customer } from '@eternal/customer/model';
import { createSelector } from '@ngrx/store';
import { customerFeature } from './customer.reducer';

const { selectCustomers, selectLoadStatus } = customerFeature;

const selectById = (id: number) =>
  createSelector(selectCustomers, (state: Customer[]) =>
    state.find((p) => p.id === id)
  );

const isLoaded = createSelector(
  selectLoadStatus,
  (loadStatus) => loadStatus === 'LOADED'
);

export const fromCustomer = {
  selectCustomers,
  selectById,
  selectLoadStatus,
  isLoaded,
};
