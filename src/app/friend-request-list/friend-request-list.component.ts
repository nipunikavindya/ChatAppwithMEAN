import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css']
})
export class FriendRequestListComponent implements OnInit {
  requests: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFriendRequests();
  }

  fetchFriendRequests() {
    this.http.get('/api/user-request/pending')
      .pipe(
        catchError(error => {
          console.error('Error fetching friend requests:', error);
          return throwError('Something went wrong while fetching friend requests. Please try again later.');
        })
      )
      .subscribe(
        (response: any) => {
          this.requests = response;
        }
      );
  }

  acceptFriendRequest(requestId: string) {
    const request = { requestId: requestId };
    this.http.put('/api/user-request/accept', request)
      .pipe(
        catchError(error => {
          console.error('Error accepting friend request:', error);
          return throwError('Something went wrong while accepting the friend request. Please try again later.');
        })
      )
      .subscribe(
        response => {
          console.log('Friend request accepted successfully');
          this.fetchFriendRequests();
        }
      );
  }
}