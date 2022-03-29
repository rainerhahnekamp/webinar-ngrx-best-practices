import { fromCustomer } from './lib/+state/customer.selectors';

export const selectSelectedCustomer = fromCustomer.selectSelectedCustomer;
export * from './lib/customer-feature.module';
export { CustomerFacade } from './lib/+state/customer.facade';
