import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImportComponent } from './components/import/import.component';
import { UserComponent } from './components/user/user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { IntiateImportComponent } from './components/intiate-import/intiate-import.component';
import { canActivateRoute } from './services/guards';
import { EntityListingsComponent } from './components/entity-listings/entity-listings.component';
import { EntityDetailsComponent } from './components/entity-details/entity-details.component';

export const routes: Routes = [
{
        path:"", pathMatch: 'full',redirectTo: "login"
},
{
    path:"login",component:LoginComponent
},
{
    path:"dashboard",component:DashboardComponent,canActivate: [canActivateRoute],
    children:[
        {
            path:"home",component:HomeComponent,canActivate: [canActivateRoute]
        },
        {
            path:"", pathMatch: 'full',redirectTo: "home"
        },
        {
            path:"import",component:ImportComponent,canActivate: [canActivateRoute]
        },
        {
            path:"entity",component:EntityListingsComponent,canActivate: [canActivateRoute]
        },
        {
            path:"user",component:UserComponent,canActivate: [canActivateRoute]
        }
    ]
},
{
    path:"reset_password",component:ResetPasswordComponent,canActivate: [canActivateRoute]
},
{
    path:"user_details",component:UserDetailsComponent,canActivate: [canActivateRoute]
},
{
    path:"entity_details",component:EntityDetailsComponent,canActivate: [canActivateRoute]
},
{
    path:"initiate_import",component:IntiateImportComponent,canActivate: [canActivateRoute]
}
];

