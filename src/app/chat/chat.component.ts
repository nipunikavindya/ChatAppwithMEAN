import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMessages();
  }

  fetchMessages() {
    this.http.get('/api/chat/messages')
      .pipe(
        catchError(error => {
          console.error('Error fetching messages:', error);
          return throwError('Something went wrong while fetching messages. Please try again later.');
        })
      )
      .subscribe(
        (response: any) => {
          this.messages = response;
        }
      );
  }

  sendMessage() {
    const messageData = { content: this.newMessage };
    this.http.post('/api/chat/send-message', messageData)
      .pipe(
        catchError(error => {
          console.error('Error sending message:', error);
          return throwError('Something went wrong while sending the message. Please try again later.');
        })
      )
      .subscribe(
        response => {
          this.newMessage = '';
          this.fetchMessages();
        }
      );
  }
}