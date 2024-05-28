import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage-service';
import { LoginService } from '../../services/login-service';
import { UserSessionService } from '../../services/user-session-service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule, MatIconModule,FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  currentPassword="";
  newPassword="";
  isRedirectMessageVisible=false;
  constructor(private router:Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private userSessionService: UserSessionService){

}
  public resetPassword(){
    const user=this.localStorageService.getUser();
    this.loginService.resetPassword(user!,this.currentPassword,this.newPassword).subscribe((result:any)=>{
      console.log("hello from reset password");
          console.log(result);
        this.loginService.login(user!).subscribe(result=>{
          console.log("hello from reset password");
          console.log(result);
          this.isRedirectMessageVisible=true;
          setTimeout(()=>{
            this.userSessionService.destroySession();
            this.router.navigate(["/login"],undefined);
          },5000)
        });
    });
  }
}
