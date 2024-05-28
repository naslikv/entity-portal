import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LottieComponent } from 'ngx-lottie';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule,MatTableModule,MatButtonModule,DatePipe,MatPaginatorModule,LottieComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  displayedColumns: string[] = ['id', 'userName', 'modifiedOn','action'];
  dataSource?: MatTableDataSource<any> ;
  usersData=[];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private userService: UserService,
    private router: Router,
    public dialog: MatDialog){
    this.userService.getAllUsers().subscribe(value=>{
      console.log(value);
      this.usersData=value;
      this.dataSource=new MatTableDataSource<any>(this.usersData);
      this.dataSource!.paginator = this.paginator!;
    });
  }
  public makeDate(value: string){
    return new Date(value);
  }
  openUserDialog(id?: string,mode?: string) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: {
        userID: id,
        mode},
    });
    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log(result);
      if(result&&result.result&&result.result==="Ok"){
        this.userService.getAllUsers().subscribe(value=>{
          console.log(value);
          this.usersData=value;
          this.dataSource=new MatTableDataSource<any>(this.usersData);
          this.dataSource!.paginator = this.paginator!;
        });
      }
    });
    }
   
}
