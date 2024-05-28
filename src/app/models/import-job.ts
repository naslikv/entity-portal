import { ImportFile } from "./import-file";
import { User } from "./user";

export class ImportJob{
    private _id: number;
    private _file?: ImportFile;
    private _type: any;
    private _createdOn: string; 
    private _createdBy?: User;
    private _modifiedBy?: User;

    constructor(){
        this._id=0;
        this._createdOn="";
    }

    public get id(){
        return this._id;
    }

    public set id(value: number){
        this._id=value;
    }

    public get file(){
        return this._file;
    }

    public set file(value: any){
        this._file=value;
    }

    public get type(){
        return this._type;
    }
    public set type(value: any){
        this._type=value;
    }
    public get createdOn(){
        return this._createdOn;
    }
    public set createdOn(value: string){
        this._createdOn=value;
    }
    public get createdBy(): User|undefined{
        return this._createdBy;
    }
    public set createdBy(value: User){
        this._createdBy=value;

    }
    public get modifiedBy(): User|undefined{
        return this._createdBy;
    }
    public set modifiedBy(value: User){
        this._createdBy=value;

    }

}