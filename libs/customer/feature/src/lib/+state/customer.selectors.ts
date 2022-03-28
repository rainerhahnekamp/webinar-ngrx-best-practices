import { Customer } from '@eternal/customer/model';
import { createSelector } from '@ngrx/store';
import { customerFeature } from './customer.reducer';

const { selectCustomers, selectSelectedId } = customerFeature;

const selectById = (id: number) =>
  createSelector(selectCustomers, (state: Customer[]) =>
    state.find((p) => p.id === id)
  );

const selectSelectedCustomer = createSelector(
  selectCustomers,
  selectSelectedId,
  (customers, selectedId) =>
    customers.find((customer) => customer.id === selectedId)
);

export const selectCustomerWithSelected = createSelector(
  selectCustomers,
  selectSelectedId,
  (customers, selectedId) =>
    customers.map((customer) => ({
      ...customer,
      selected: customer.id === selectedId,
    }))
);

export const fromCustomer = {
  selectCustomers,
  selectCustomerWithSelected,
  selectSelectedCustomer,
  selectById,
};
