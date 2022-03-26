import { Injectable } from '@angular/core';
import { MessageStore } from './message.store';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private messageStore: MessageStore) {}
  info(message: string) {
    this.messageStore.add({ text: message, type: 'info' });
  }
  error(title: string) {
    this.messageStore.add({ text: title, type: 'error' });
  }
}
