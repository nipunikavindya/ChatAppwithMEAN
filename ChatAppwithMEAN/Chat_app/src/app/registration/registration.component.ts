import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username!: string;
  password!: string;

  constructor(private http: HttpClient) {}

  registerUser() {
    const userData = { username: this.username, password: this.password };
    this.http.post('/api/user/register', userData).subscribe(
      response => {
        console.log('Registration successful');
      },
      error => {
        console.error('Error during registration:', error);
      }
    );
  }
}
