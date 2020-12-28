import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/api-interfaces';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<Message>('/api/hello');

  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];

  constructor(private http: HttpClient,
    private chatService: ChatService) { }

  ngOnInit() {

    this.chatService.receiveChat().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.chatService.getUsers().subscribe((users: number) => {
      this.users = users;
      console.log(`number of users conneded ${this.users}`);
    });

  }

  addChat() {
    this.messages.push(this.message);
    this.chatService.sendChat(this.message);
    this.message = '';
  }
}
