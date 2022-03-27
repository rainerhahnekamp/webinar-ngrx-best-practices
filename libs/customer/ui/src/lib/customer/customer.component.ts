import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Customer } from '@eternal/customer/model';
import { Options } from '@eternal/shared/form';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';

@Component({
  selector: 'eternal-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  formGroup = new FormGroup({});
  @Input() customer: Customer | undefined;
  @Input() countries: Options = [];
  @Input() showDeleteButton = true;
  @Output() save = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<Customer>();
  fields: FormlyFieldConfig[] = [];

  ngOnInit() {
    this.fields = [
      formly.requiredText('firstname', 'Firstname'),
      formly.requiredText('name', 'Name'),
      formly.requiredSelect('country', 'Country', this.countries),
      formly.requiredDate('birthdate', 'Birthdate'),
    ];
  }

  submit() {
    if (this.formGroup.valid) {
      this.save.emit(this.formGroup.value);
    }
  }

  handleRemove() {
    if (this.customer && confirm(`Really delete ${this.customer}?`)) {
      this.remove.emit(this.customer);
    }
  }
}
