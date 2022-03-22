import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SecurityService } from '@eternal/shared/security';

@Component({
  selector: 'eternal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$ = this.userService.getLoadedUser$();

  constructor(private userService: SecurityService) {}

  signOut() {
    this.userService.signOut();
  }
}

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderComponentModule {}
