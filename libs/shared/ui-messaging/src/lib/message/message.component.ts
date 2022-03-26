import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Message } from './message';
import { MessageStore } from './message.store';

@Component({
  selector: 'eternal-message',
  templateUrl: './message.component.html',
  animations: [
    trigger('myTrigger', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MessageComponent {
  flag = true;
  state = 'fadeInFlash';
  constructor(messageStore: MessageStore) {
    messageStore.messages$.subscribe((message) => {
      this.messages.push(message);
      window.setTimeout(
        () => (this.messages = this.messages.filter((m) => m !== message)),
        2000
      );
    });
  }
  messages: Message[] = [];
}
