import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageService } from "./local-storage-service";

export const canActivateRoute: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    console.log("checking token in guard");
    console.log(inject(LocalStorageService).getToken());
    const isValidSession=inject(LocalStorageService).getToken()!=null;
    const router=inject(Router);
    if(!isValidSession){
        router.navigate(["login"],undefined);
    }
    else{
console.log(route.url);    }
    return isValidSession;
  };
