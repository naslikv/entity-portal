import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomEntitiesService } from '../../services/custom-entities-service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CustomEntity } from '../../models/custom-entity';

@Component({
  selector: 'app-entity-details',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule, MatIconModule,FormsModule, MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,LottieComponent],
  templateUrl: './entity-details.component.html',
  styleUrl: './entity-details.component.css'
})
export class EntityDetailsComponent {
  type="";
  value="";
  id="";
  private animationItem: AnimationItem | undefined;

options: AnimationOptions = {
  path: '/assets/animations/success-purple.json',
  loop: true,
  autoplay: true
};
actionCompleted=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private temperatureService: CustomEntitiesService,
    private router: Router,
    public dialogRef: MatDialogRef<EntityDetailsComponent>){
        const id=data.id;
        if(id){
          this.temperatureService.getByID(id).subscribe((result:CustomEntity)=>{
              this.type=result.type!;
              this.value=result.value!;
              this.id=id;
          });
        }
  }
  public save(){
    const temperture: CustomEntity={
      type: this.type,
      value: this.value,
      id: Number.parseInt(this.id),
      modifiedOn: undefined

    }
    this.temperatureService.modifyEntity(temperture,this.id).subscribe(result=>{
      if(result){
        this.actionCompleted=true;
        setTimeout(()=>{
        this.dialogRef.close({
          result: "Ok"
        });
      },2000);
      }
    })
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
