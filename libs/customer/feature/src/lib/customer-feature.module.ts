import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomerEffects } from './+state/customer.effects';
import { customerFeature } from './+state/customer.reducer';
import {
  AddCustomerComponent,
  AddCustomerComponentModule,
} from './components/add-customer.component';
import {
  CustomerRootComponent,
  CustomerRootComponentModule,
} from './components/customer-root.component';
import {
  CustomersContainerComponent,
  CustomersContainerComponentModule,
} from './components/customers-container.component';
import {
  EditCustomerComponent,
  EditCustomerComponentModule,
} from './components/edit-customer.component';
import { DataGuard } from './services/data.guard';

@NgModule({
  imports: [
    CustomerRootComponentModule,
    CustomersContainerComponentModule,
    AddCustomerComponentModule,
    EditCustomerComponentModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [DataGuard],
        component: CustomerRootComponent,
        children: [
          {
            path: '',
            component: CustomersContainerComponent,
          },
          {
            path: 'new',
            component: AddCustomerComponent,
            data: { mode: 'new' },
          },
          {
            path: ':id',
            component: EditCustomerComponent,
            data: { mode: 'edit' },
          },
        ],
      },
    ]),
    StoreModule.forFeature(customerFeature),
    EffectsModule.forFeature([CustomerEffects]),
  ],
})
export class CustomerFeatureModule {}
