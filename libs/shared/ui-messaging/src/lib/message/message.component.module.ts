import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [MessageComponent],
  exports: [MessageComponent],
})
export class MessageComponentModule {}
