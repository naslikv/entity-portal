import { Role } from "./role";

export class User{
    public id?: number;
    public name?: string;
    public userName?: string;
    public password?: string;
    public status?: string;
    public modifiedOn?: string;
    public role?: Role;
    public firstLogin?: boolean;
}