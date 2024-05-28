import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService{
    TABULA_LOCAL_STORAGE_KEY_TOKEN="tabula_token";
    TABULA_LOCAL_STORAGE_KEY_USER="tabule_user";
    constructor(){

    }
    public getTokenAsHeader(){
        return {
            headers: {
                ["authorization"]: `Bearer ${this.getToken()}`
            }
        }
    }
    public setToken(token: string){
        localStorage.setItem(this.TABULA_LOCAL_STORAGE_KEY_TOKEN,token);
    }
    public getToken(){
        return localStorage.getItem(this.TABULA_LOCAL_STORAGE_KEY_TOKEN);
    }
    public getUser(): User|undefined{
        const user=localStorage.getItem(this.TABULA_LOCAL_STORAGE_KEY_USER);
        if(user){
        return JSON.parse(user)  as User;
        }
        return undefined;
    }
    public setUser(user: User){
        localStorage.setItem(this.TABULA_LOCAL_STORAGE_KEY_USER,JSON.stringify(user));
    }

    public clearLocalStorage(){
        localStorage.clear();
    }
}