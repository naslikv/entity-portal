import { Injectable } from "@angular/core";
import { LoginService } from "./login-service";
import { UserService } from "./user-service";
import { Observable, catchError, of, throwError } from "rxjs";
import { LocalStorageService } from "./local-storage-service";
import { Router } from "@angular/router";
import { User } from "../models/user";

@Injectable({
    providedIn: "root"
})
export class UserSessionService{
constructor(private loginService: LoginService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router)
    {

}
public getToken(username: string,password: string){
    return this.loginService.getToken(username,password).pipe(catchError((error: any)=>{
        console.log("error in login");
        return throwError(()=>error);
    }));
}
public createSession(tokenResponse: any){
    if(tokenResponse){
const token=tokenResponse.authToken;
this.localStorageService.setToken(token);
const userID=tokenResponse.userID;
this.userService.getUserByID(userID).subscribe((user: User)=>{
    this.localStorageService.setUser(user);
    if(user.firstLogin){
        this.router.navigate([
            "reset_password"
          ],undefined);
        }else{
            this.loginService.login(user).subscribe((result)=>{
                console.log("returning success");
                this.router.navigate([
                    "dashboard"
                  ],undefined);
            });
        }
});
    }else{
        console.log("no result after api call");
    }
}

public destroySession(){
    const user=this.localStorageService.getUser();
    if(user){
        this.loginService.logout(user).subscribe(result=>{
            this.localStorageService.clearLocalStorage();
        });
    }
}
}