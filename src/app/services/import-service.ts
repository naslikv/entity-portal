import { Injectable } from "@angular/core";
import { ImportJob } from "../models/import-job";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { ImportFile } from "../models/import-file";
import { LocalStorageService } from "./local-storage-service";
import { SERVICE_BASE_URL } from "../api-constants";

@Injectable({
    providedIn: "root"
})

export class ImportService{

    constructor(private httpClient: HttpClient,private localStorageService: LocalStorageService){

    }

    public getAll(): Observable<any>{
        const options=this.localStorageService.getTokenAsHeader();
        return this.httpClient.get(SERVICE_BASE_URL+"/entity/imports",options);
    }
    public upload(file?: File){
        const authorizationHeader=new HttpHeaders( {["authorization"]: "Bearer "+this.localStorageService.getToken()});
        const options={
            headers: authorizationHeader,
            responseType: 'json' as any
        }
        if(file){
        const formData: FormData=new FormData();
        formData.append("file",file);
        const request=new HttpRequest("POST",SERVICE_BASE_URL+"/entity/files",formData,options);
        return this.httpClient.request(request);
    }
    return null;
    }

    public initiateImport(importJob: ImportJob){
        const options=this.localStorageService.getTokenAsHeader();
        console.log("calling initiate import api");
        console.log(importJob);
           return this.httpClient.post(SERVICE_BASE_URL+"/entity/imports",{
            file: importJob.file,
            type: importJob.type,
            createdBy: importJob.createdBy,
            modifiedBy: importJob.modifiedBy
           },options);
          
    }
    
}