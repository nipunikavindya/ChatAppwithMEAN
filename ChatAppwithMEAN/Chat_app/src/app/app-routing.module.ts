import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { OnlineStatusComponent } from './online-status/online-status.component';
import { FriendRequestListComponent } from './friend-request-list/friend-request-list.component';
import { FriendRequestComponent } from './user-request/user-request.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'online-status', component: OnlineStatusComponent },
  { path: 'friend-request-list', component: FriendRequestListComponent },
  
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'friend-request', component: FriendRequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
