import { HttpClient } from '@angular/common/http';
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
  CustomersContainerComponent,
  CustomersContainerComponentModule,
} from './components/customers-container.component';
import { DataGuard } from './services/data.guard';
import {
  EditCustomerComponent,
  EditCustomerComponentModule,
} from './components/edit-customer.component';
import { MockedHttpClient } from './services/mocked-http-client.service';

@NgModule({
  imports: [
    CustomersContainerComponentModule,
    AddCustomerComponentModule,
    EditCustomerComponentModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [DataGuard],
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
  providers: [
    {
      provide: HttpClient,
      useClass: MockedHttpClient,
    },
  ],
})
export class CustomerFeatureModule {}
