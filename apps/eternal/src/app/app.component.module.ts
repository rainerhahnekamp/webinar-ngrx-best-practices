import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  LoaderComponentModule,
  MessageComponentModule,
} from '@eternal/shared/ui-messaging';
import { AppComponent } from './app.component';
import { HeaderComponentModule } from './core/header/header.component';
import { SidemenuComponentModule } from './core/sidemenu/sidemenu.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatToolbarModule,
    HeaderComponentModule,
    MatSidenavModule,
    SidemenuComponentModule,
    LoaderComponentModule,
    RouterModule,
    MessageComponentModule,
  ],
  exports: [AppComponent],
})
export class AppComponentModule {}
