import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage-service";
import { User } from "../models/user";
import { SECURITY_BASE_URL } from "../api-constants";
@Injectable(
    {
        providedIn:"root"
    }
)
export class UserService{

    constructor(private httpClient: HttpClient,
        private localStorageService: LocalStorageService){

    }
    public getAllUsers(): Observable<any>{
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.get(SECURITY_BASE_URL+"/entity/security/users",options);

    }
    public getAllRoles(): Observable<any>{
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.get(SECURITY_BASE_URL+"/entity/security/users/roles",options);
    }

    public postUser(user: User): Observable<any>{
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.post(SECURITY_BASE_URL+"/entity/security/users",user,options);
    }
    public patchUser(user: User,id: number): Observable<any>{
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.patch(SECURITY_BASE_URL+`/entity/security/users/${id}`,user,options);
    }

      public getUserByID(id: number): Observable<any>{
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.get(SECURITY_BASE_URL+`/entity/security/users/${id}`,options);

    }
}