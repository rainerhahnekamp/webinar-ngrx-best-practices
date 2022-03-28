import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
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
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
  ],
})
export class CustomersComponentModule {}
