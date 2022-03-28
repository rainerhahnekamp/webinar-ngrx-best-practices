import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookingEffects } from './+state/booking.effects';
import { bookingFeature } from './+state/booking.reducer';
import { OverviewComponent } from './overview/overview.component';
import { OverviewComponentModule } from './overview/overview.component.module';

@NgModule({
  imports: [
    CommonModule,
    OverviewComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewComponent,
      },
    ]),
    StoreModule.forFeature(bookingFeature),
    EffectsModule.forFeature([BookingEffects]),
  ],
})
export class BookingModule {}
