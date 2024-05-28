import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage-service";
import { catchError, throwError } from "rxjs";
import { User } from "../models/user";
import { SECURITY_BASE_URL } from "../api-constants";

@Injectable({
    providedIn: "root"
})
export class LoginService{

constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService){

}
public getToken(username: string,password: string){
    const tokenRequest={
        userName:username,
        password
    };
    const response=this.httpClient.post(SECURITY_BASE_URL+"/entity/security/auth/tokens",tokenRequest,{})
    .pipe(catchError((error: any)=>{
        return throwError(()=>error);
    }));
    return response;
}

public login(user: User){

    const options=this.localStorageService.getTokenAsHeader();
    const request={
        user,
        action: "LOGIN"
    };
    return this.httpClient.post(SECURITY_BASE_URL+"/entity/security/users/logs",request,options);

}
public logout(user: User){
    const options=this.localStorageService.getTokenAsHeader();
    const request={
        user,
        action: "LOGOUT"
    };
    return this.httpClient.post(SECURITY_BASE_URL+"/entity/security/users/logs",request,options);

}
public resetPassword(user: User,currentPassword: string,newPassword: string){
    const options=this.localStorageService.getTokenAsHeader();
    const request={
        userName: user.userName,
        oldPassword: currentPassword,
        newPassword

    }
    return this.httpClient.patch(SECURITY_BASE_URL+"/entity/security/users/passwords/reset",request,options);
}

}