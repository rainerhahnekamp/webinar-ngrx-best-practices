import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { CustomerComponent } from './customer.component';

@NgModule({
  declarations: [CustomerComponent],
  exports: [CustomerComponent],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    FormlyModule,
    FormlyMatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
  ],
})
export class CustomerComponentModule {}
