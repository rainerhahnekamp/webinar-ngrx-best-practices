import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class CustomerRootComponent {}

@NgModule({
  declarations: [CustomerRootComponent],
  exports: [CustomerRootComponent],
  imports: [RouterModule],
})
export class CustomerRootComponentModule {}
