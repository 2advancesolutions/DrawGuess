import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {

  }

  sendMessage(message) {
    this.socket.emit('message', message);
  }

  receivedMessage() {
    return this.socket.fromEvent('message');
  }

  getUsers() {
    return this.socket.fromEvent('users');
  }
}
