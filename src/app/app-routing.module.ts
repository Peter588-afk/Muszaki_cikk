import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [{
  path:'home',
  component: HomeComponent
},
{
  path:'cart',
  component: CartComponent
},
{ path: 'login',
  component: LoginComponent
},
{ path: 'register',
  component: RegisterComponent
},
{ path: 'profil',
  component: ProfilComponent,

},
{ path: 'admin',
  component: AdminComponent,
  
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
