import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '@eternal/customer/model';

@Component({
  selector: 'eternal-customers',
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnChanges {
  @Input() customers: Customer[] = [];

  displayedColumns = ['name', 'country', 'birthdate', 'action'];
  dataSource = new MatTableDataSource<Customer>([]);

  ngOnChanges(): void {
    this.dataSource.data = this.customers;
  }
}
