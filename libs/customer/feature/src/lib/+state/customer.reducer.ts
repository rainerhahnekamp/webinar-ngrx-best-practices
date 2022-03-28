import { Customer } from '@eternal/customer/model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { load, loaded, select, unselect } from './customer.actions';

export interface CustomerState {
  customers: Customer[];
  selectedId: number | undefined;
}

export const initialState: CustomerState = {
  customers: [],
  selectedId: undefined,
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
    })),
    on(select, (state, { id }) => ({
      ...state,
      selectedId: id,
    })),
    on(unselect, (state) => ({
      ...state,
      selectedId: undefined,
    }))
  ),
});
