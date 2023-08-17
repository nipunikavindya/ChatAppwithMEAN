import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.css']
})
export class OnlineStatusComponent {
  onlineStatus: boolean = false;

  constructor(private http: HttpClient) {}

  updateOnlineStatus() {
    const onlineStatusData = { online: this.onlineStatus };
    this.http.put('/api/user/online-status', onlineStatusData).subscribe(
      response => {
        console.log('Online status updated successfully');
      },
      error => {
        console.error('Error updating online status:', error);
      }
    );
}
}