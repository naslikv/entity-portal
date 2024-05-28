import { Component, Inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { ImportService } from '../../services/import-service';
import { lastValueFrom } from 'rxjs';
import { ImportFile } from '../../models/import-file';
import { ImportJob } from '../../models/import-job';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage-service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
@Component({
  selector: 'app-intiate-import',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule, MatIconModule,FormsModule,MatCardModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  LottieComponent],
  templateUrl: './intiate-import.component.html',
  styleUrl: './intiate-import.component.css'
})
export class IntiateImportComponent {
 file?: any;
  fileSelected=false;
  @ViewChild("fileInput")
  fileInput?: any;
  private animationItem: AnimationItem | undefined;

  options: AnimationOptions = {
    path: '/assets/animations/purple-done.json',
    loop: true,
    autoplay: true
  };
  importCompleted=false;
  constructor(private importService: ImportService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<IntiateImportComponent>,
  private localStorageService: LocalStorageService){

  }
  public async initiate(){
    const fileUploadResponse=this.importService.upload(this.file);
    if(fileUploadResponse){
      const firstValue: any=await lastValueFrom(fileUploadResponse);
      console.log("file upload success");
      const fileResponse=firstValue.body as ImportFile;
      console.log(fileResponse);
      const importJob=new ImportJob();
      importJob.file=fileResponse;
      importJob.type={
       id: 1,
       key: "import.temperature"
      };
      importJob.createdBy=this.localStorageService.getUser()!;
      importJob.modifiedBy=this.localStorageService.getUser()!;
      console.log(importJob);
      this.importService.initiateImport(importJob).subscribe((value)=>{
        this.importCompleted=true;
        setTimeout(()=>{
          this.dialogRef.close({
            result: "Ok"
          });
        },2000);
      
    });
  }
}
  public chooseFile(){
  console.log(this.fileInput);
  this.fileInput?.nativeElement.click();
  }
  public reset(){
  this.fileSelected=false;
  this.file=undefined;
  }
  public selectFile(event: any){
    
    this.file=event.target.files.item(0);
    console.log(this.file);
    if(this.file){
    this.fileSelected=true;
    }
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
