import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
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
import { IntiateImportComponent } from '../intiate-import/intiate-import.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatIcon,MatGridListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router,
    public dialog: MatDialog){
    
  }
  gotoInitiateImport() {
    const dialogRef = this.dialog.open(IntiateImportComponent, {});
    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log(result);
      if(result&&result.result&&result.result==="Ok"){
            this.gotoImportList();
      }
    });
  }
  gotoEntityList() {
  this.router.navigate(["/dashboard/entity"]);
  }
  gotoImportList() {
  this.router.navigate(["/dashboard/import"]);
  }

}
