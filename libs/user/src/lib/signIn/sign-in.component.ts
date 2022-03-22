import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SecurityService } from '@eternal/shared/security';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { formly } from 'ngx-formly-helpers';

@Component({
  selector: 'eternal-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  formGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    formly.requiredText('email', 'EMail'),
    formly.requiredText('password', 'Password', { type: 'password' }),
  ];
  signedIn$ = this.securityService.getSignedIn$();

  constructor(private securityService: SecurityService) {}

  handleSubmit() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.securityService.signIn(email, password);
    }
  }
}
