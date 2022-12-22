import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AdminAddproductComponent } from './components/admin/admin-addproduct/admin-addproduct.component';
import { AdminContactusComponent } from './components/admin/admin-contactus/admin-contactus.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginPageComponent } from './components/admin/admin-login-page/admin-login-page.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { ClientCartComponent } from './components/client/client-cart/client-cart.component';
import { ClientHomeComponent } from './components/client/client-home/client-home.component';
import { ClientLoginPageComponent } from './components/client/client-login-page/client-login-page.component';
import { ClientOrderComponent } from './components/client/client-order/client-order.component';
import { ClientSignUpComponent } from './components/client/client-sign-up/client-sign-up.component';

import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},

  {path:'about-us',component:AboutusComponent},
  {path:'client-register',component: ClientSignUpComponent},
  {path:'client-login',component:ClientLoginPageComponent},
  {path:'admin-login',component:AdminLoginPageComponent},
  {path:'client',children:[
    {path:'home',component:ClientHomeComponent},
    {path:'cart',component:ClientCartComponent},
    {path:'order',component:ClientOrderComponent}
  ]},
  {path:'admin',children:[

    {path:'home',component:AdminHomeComponent},
    {path: 'addproduct', component:AdminAddproductComponent },
    {path:'listproduct',component:ProductListComponent }
  ]}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
