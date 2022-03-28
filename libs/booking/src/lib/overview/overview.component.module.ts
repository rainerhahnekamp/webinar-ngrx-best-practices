import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OverviewComponent } from './overview.component';

@NgModule({
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
  imports: [MatTableModule, CommonModule],
})
export class OverviewComponentModule {}
