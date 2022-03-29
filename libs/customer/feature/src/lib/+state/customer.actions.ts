import { Customer } from '@eternal/customer/model';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Customer] Load');
export const loadFailed = createAction('[Customer] Load Failed');
export const loaded = createAction(
  '[Customer] Loaded',
  props<{ customers: Customer[] }>()
);

export const add = createAction(
  '[Customer] Add',
  props<{ customer: Customer }>()
);
export const added = createAction(
  '[Customer] Added',
  props<{ customers: Customer[] }>()
);

export const update = createAction(
  '[Customer] Update',
  props<{ customer: Customer }>()
);
export const updated = createAction(
  '[Customer] Updated',
  props<{ customers: Customer[] }>()
);

export const remove = createAction(
  '[Customer] Remove',
  props<{ customer: Customer; forward: string; message: string }>()
);
export const removed = createAction(
  '[CUSTOMER] Removed',
  props<{ customers: Customer[] }>()
);

export const select = createAction(
  '[Customer] Select',
  props<{ id: number }>()
);

export const unselect = createAction('[Customer] Unselect');
