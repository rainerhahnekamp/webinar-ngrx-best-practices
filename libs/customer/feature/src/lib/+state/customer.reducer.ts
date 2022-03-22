import { Customer } from '@eternal/customer/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { added, load, loaded, removed, updated } from './customer.actions';

export type LoadStatus = 'NOT_LOADED' | 'LOADING' | 'LOADED';

export interface CustomerState {
  loadStatus: LoadStatus;
  customers: Customer[];
}

export const initialState: CustomerState = {
  loadStatus: 'NOT_LOADED',
  customers: [],
};

export const customerFeature = createFeature({
  name: 'customer',
  reducer: createReducer<CustomerState>(
    initialState,
    on(load, (state) => ({
      ...state,
      loadStatus: 'LOADING',
    })),
    on(loaded, (state, { customers }) => ({
      ...state,
      loadStatus: 'LOADED',
      customers,
    })),
    on(added, (state, { customers }) => ({
      ...state,
      customers,
    })),
    on(updated, (state, { customers }) => ({
      ...state,
      customers,
    })),
    on(removed, (state, { customers }) => ({
      ...state,
      customers,
    }))
  ),
});
