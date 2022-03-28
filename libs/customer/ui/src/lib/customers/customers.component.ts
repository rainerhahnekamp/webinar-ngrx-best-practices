import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '@eternal/customer/model';

export type CustomerWithSelected = Customer & { selected: boolean };

@Component({
  selector: 'eternal-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnChanges {
  @Input() customers: CustomerWithSelected[] = [];
  @Output() setSelected = new EventEmitter<number>();
  @Output() setUnselected = new EventEmitter<number>();

  displayedColumns = ['name', 'country', 'birthdate', 'action'];
  dataSource = new MatTableDataSource<CustomerWithSelected>([]);

  ngOnChanges(): void {
    this.dataSource.data = this.customers;
  }

  toggleSelection(toggleChange: MatSlideToggleChange, id: number) {
    if (toggleChange.checked) {
      this.setSelected.emit(id);
    } else {
      this.setUnselected.emit(id);
    }
  }
}
