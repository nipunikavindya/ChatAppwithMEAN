import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class FriendRequestComponent {
  username: string = '';

  constructor(private http: HttpClient) {}

  sendFriendRequest() {
    const request = { username: this.username };
    this.http.post('/api/user-request/send', request)
      .pipe(
        catchError(error => {
          console.error('Error sending friend request:', error);
          return throwError('Something went wrong while sending the friend request. Please try again later.');
        })
      )
      .subscribe(
        response => {
          console.log('Friend request sent successfully');
        }
      );
  }
}