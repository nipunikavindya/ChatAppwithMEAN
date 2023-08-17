import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private http: HttpClient) {}

  loginUser() {
    const userData = { username: this.username, password: this.password };
    this.http.post('/api/user/login', userData).subscribe(
      response => {
        console.log('Login successful');
      },
      error => {
        console.error('Error during registration:', error);
      }
    );
  }
}