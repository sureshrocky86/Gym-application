import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { HomeGymComponent } from './home-gym/home-gym.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeGymComponent},
  { path: 'admin', component: AdminComponent }, // Define the route
  { path: 'registerDetails', component:UserDetailsComponent, canActivate: [AuthGuard]}
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
