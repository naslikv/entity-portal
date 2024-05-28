import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { UserSessionService } from '../../services/user-session-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule, MatIconModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
username="";
password="";
showValidationMessage=false;
constructor(private userSessionService: UserSessionService,private router: Router){

}
login() {
    this.showValidationMessage=false;
    this.userSessionService.getToken(this.username,this.password).pipe(catchError((error: any)=>{
      console.log("error in login page");
      if(error instanceof HttpErrorResponse){
        const httpError=error as HttpErrorResponse;
        if(httpError.status===422){
          this.showValidationMessage=true;
        }
      }
      return throwError(()=>error);
  })).subscribe((result:any)=>{
    this.userSessionService.createSession(result);
  });
  }
}
