import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../shared/loading.service';

@Component({
  selector: 'eternal-loader',
  template: `<mat-progress-bar
    *ngIf="(loadingService.loading$ | async) === true"
    mode="indeterminate"
  ></mat-progress-bar>`,
})
export class LoaderComponent {
  constructor(public loadingService: LoadingService) {}
}

@NgModule({
  imports: [CommonModule, MatProgressBarModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class LoaderComponentModule {}
