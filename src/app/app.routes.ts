import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductsComponent } from './pages/products/products.component';
import { MainComponent } from './layouts/main-layout/main/main.component';
import { AuthComponent } from './layouts/autho-layout/auth/auth.component';
import { authGuardGuard } from './core/guard/auth-guard.guard';

export const routes: Routes = [

    {path:'',  component:AuthComponent, children:[
        {path : 'login', component:LoginComponent, title: 'login'},
        {path : 'register', loadComponent:()=>import('./pages/register/register.component').then((classes)=>classes.RegisterComponent), title: 'register'},
        {path : 'forget-password', loadComponent:()=>import('./pages/forgetpassword/forgetpassword/forgetpassword.component').then((classes)=>classes.ForgetpasswordComponent), title: 'forget Password'},
        {path : 'verfiy-code', loadComponent:()=>import('./pages/verifypassword/verifypassword/verifypassword.component').then((classes)=>classes.VerifypasswordComponent), title: 'Verfiy Code'},
        {path : 'reset-password', loadComponent:()=>import('./pages/resetpassword/resetpassword/resetpassword.component').then((classes)=>classes.ResetpasswordComponent), title: 'Reset Password'}
    ]}
,
    {path:'',  component:MainComponent, canActivate:[authGuardGuard], children:[
         {path: '', redirectTo: 'home', pathMatch: 'full'},
         {path : 'home', component:HomeComponent, title: 'Home' },
         {path : 'products', component:ProductsComponent, title: 'products'},
         {path : 'brands', loadComponent:()=>import('./pages/brands/brands.component').then((classes)=>classes.BrandsComponent)  , title: 'brands'},
         {path : 'cart', loadComponent:()=>import('./pages/cart/cart.component').then((classes)=>classes.CartComponent), title: 'cart'},
         {path : 'allorders', loadComponent:()=>import('./pages/allorders/allorders.component').then((classes)=>classes.AllordersComponent), title: 'All Orders'},
         {path : 'wishlist', loadComponent:()=>import('./pages/wishlist/wishlist/wishlist.component').then((classes)=>classes.WishlistComponent), title: 'Wishlist'},
         {path : 'checkout/:c_ID', loadComponent:()=>import('./pages/checkout/checkout.component').then((classes)=>classes.CheckoutComponent), title: 'checkout'},
         {path : 'product-details/:p_ID', loadComponent:()=>import('./pages/productdetails/productdetails.component').then((classes)=>classes.ProductdetailsComponent), title: 'Details'},
         {path : 'categories', component:CategoriesComponent, title: 'categories'},
         {path : '**', component:NotfoundComponent, title: 'notfound'}

    ]}
];
