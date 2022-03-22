import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { Customer } from '@eternal/customer/model';

@Pipe({
  name: 'customer',
})
export class CustomerPipe implements PipeTransform {
  transform(customer: Customer): string {
    if (!customer.name && !customer.firstname) {
      return '-';
    }
    return `${customer.name}, ${customer.firstname}`;
  }
}

@NgModule({
  declarations: [CustomerPipe],
  exports: [CustomerPipe],
})
export class CustomerPipeModule {}
