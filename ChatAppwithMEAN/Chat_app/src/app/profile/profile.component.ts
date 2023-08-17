import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username!: string;
  email!: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProfileData();
  }

  fetchProfileData() {
    this.http.get('/api/user/profile')
      .pipe(
        catchError(error => {
          console.error('Error fetching profile data:', error);
          return throwError('Something went wrong while fetching profile data. Please try again later.');
        })
      )
      .subscribe(
        (response: any) => {
          this.username = response.username;
          this.email = response.email;
        }
      );
  }

  updateProfile() {
    const profileData = { username: this.username, email: this.email };
    this.http.put('/api/user/profile', profileData)
      .pipe(
        catchError(error => {
          console.error('Error updating profile:', error);
          return throwError('Something went wrong while updating the profile. Please try again later.');
        })
      )
      .subscribe(
        response => {
          console.log('Profile updated successfully');
        }
      );
  }
}