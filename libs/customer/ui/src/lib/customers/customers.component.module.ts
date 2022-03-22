import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CustomerPipeModule } from '../customer.pipe';
import { CustomersComponent } from './customers.component';

@NgModule({
  declarations: [CustomersComponent],
  exports: [CustomersComponent],
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    CustomerPipeModule,
  ],
})
export class CustomersComponentModule {}
