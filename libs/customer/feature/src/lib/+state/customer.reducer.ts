import { Customer } from '@eternal/customer/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { load, loaded } from './customer.actions';

export type LoadStatus = 'NOT_LOADED' | 'LOADING' | 'LOADED';

export interface CustomerState {
  loadStatus: LoadStatus;
  customers: Customer[];
  selectedId: number | undefined;
}

export const initialState: CustomerState = {
  loadStatus: 'NOT_LOADED',
  customers: [],
  selectedId: undefined,
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
    }))
  ),
});
