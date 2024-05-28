import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage-service";
import { SERVICE_BASE_URL } from "../api-constants";
import { CustomEntity } from "../models/custom-entity";

@Injectable({
    providedIn: "root"
})
export class CustomEntitiesService{
    constructor(private httpClient: HttpClient,
        private localStorageService: LocalStorageService){
        
    }

    public getAll(): Observable<any> {
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.get(SERVICE_BASE_URL+"/entity/custom",options);
    }

    public getByID(id: string): Observable<any>{
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.get(SERVICE_BASE_URL+"/entity/custom/"+id,options);
    }

    public modifyEntity(request: CustomEntity,id: string): Observable<any>{
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.patch(SERVICE_BASE_URL+"/entity/custom/"+id,request,options);
    }

}