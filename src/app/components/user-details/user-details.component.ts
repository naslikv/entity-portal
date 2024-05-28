import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose} from '@angular/material/dialog';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule, MatIconModule,FormsModule,
    MatAutocompleteModule,MatDialogTitle,MatDialogContent,MatDialogActions,
  LottieComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
username?="";
password?="";
role?="";
roles=[];
mode="add";
userID=0;
roleNameMap=new Map<string,number>();
private animationItem: AnimationItem | undefined;

options: AnimationOptions = {
  path: '/assets/animations/success-purple.json',
  loop: true,
  autoplay: true
};
actionCompleted=false;
constructor(private userService: UserService,
  private router: Router,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<UserDetailsComponent>
  ){
      this.mode=data.mode;
    const id=data.userID;
    if(id&&this.mode==="edit"){
      this.userID=Number.parseInt(id);
      this.userService.getUserByID(this.userID).subscribe((result: User)=>{
        this.username=result.userName;
        this.password=result.password;
        this.role=result.role?.description;
      });
    }
  this.userService.getAllRoles().subscribe(roles=>{
    this.roles=roles.map((x: any)=>x.description);
    roles.forEach((element: any) => {
      this.roleNameMap.set(element.description,element.id)
    });
  });

}
public save(){
  const user: User={
    userName: this.username,
    password: this.password,
    role: {
      id: this.roleNameMap.get(this.role!),
      description: this.role
    },
    status: "Active"
  }
    if(this.mode==="add"){
      this.userService.postUser(user).subscribe((result)=>{
        if(result){
          this.actionCompleted=true;
          setTimeout(()=>{
            this.dialogRef.close({
            result: "Ok"
          });
        },1000);
        }
      });
    }
    else{
      user.password=undefined;
      this.userService.patchUser(user,this.userID).subscribe((result)=>{
        if(result){
          this.actionCompleted=true;
          setTimeout(()=>{
            this.dialogRef.close({
            result: "Ok"
          });
        },2000);
        }
      });
    }
  }


public cancel(){
  this.dialogRef.close();
}

animationCreated(animationItem: AnimationItem): void {
  this.animationItem = animationItem;
}

play(): void {
  if (this.animationItem) {
    this.animationItem.play();
  }
}

pause(): void {
  if (this.animationItem) {
    this.animationItem.pause();
  }
}

stop(): void {
  if (this.animationItem) {
    this.animationItem.stop();
  }
}
}
