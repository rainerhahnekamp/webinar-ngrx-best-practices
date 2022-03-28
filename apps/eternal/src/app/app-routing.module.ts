import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserLoaderGuard } from './core/user-loader.guard';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        canActivate: [UserLoaderGuard],
        children: [
          {
            path: '',
            component: HomeComponent,
          },
          {
            path: 'security',
            loadChildren: () =>
              import('@eternal/user').then((m) => m.UserModule),
          },
          {
            path: 'customer',
            loadChildren: () =>
              import('@eternal/customer/feature').then(
                (m) => m.CustomerFeatureModule
              ),
          },
          {
            path: 'bookings',
            loadChildren: () =>
              import('@eternal/booking').then((m) => m.BookingModule),
          },
          {
            path: 'holidays',
            loadChildren: () =>
              import('./holidays/holidays.module').then(
                (m) => m.HolidaysModule
              ),
          },
          {
            path: 'diary',
            loadChildren: () =>
              import('./diary/diary.routes.module').then(
                (m) => m.DiaryRoutesModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
