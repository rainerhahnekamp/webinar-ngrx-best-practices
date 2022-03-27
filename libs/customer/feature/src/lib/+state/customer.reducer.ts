import { Customer } from '@eternal/customer/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { load, loaded } from './customer.actions';

export type LoadStatus = 'NOT_LOADED' | 'LOADING' | 'LOADED';

export interface CustomerState {
  customers: Customer[];
}

export const initialState: CustomerState = {
  customers: [],
};

export const customerFeature = createFeature({
  name: 'customer',
  reducer: createReducer<CustomerState>(
    initialState,
    on(load, (state) => ({
      ...state,
    })),
    on(loaded, (state, { customers }) => ({
      ...state,
      customers,
    }))
  ),
});
