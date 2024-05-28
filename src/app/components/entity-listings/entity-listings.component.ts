import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomEntitiesService } from '../../services/custom-entities-service';
import { DatePipe } from '@angular/common';
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
import { EntityDetailsComponent } from '../entity-details/entity-details.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-entity-listings',
  standalone: true,
  imports: [MatIconModule,MatTableModule,MatButtonModule,DatePipe,MatPaginatorModule],
  templateUrl: './entity-listings.component.html',
  styleUrl: './entity-listings.component.css'
})
export class EntityListingsComponent {


  displayedColumns: string[] = ['id', 'type', 'value','modifiedOn','action'];
  dataSource?: MatTableDataSource<any> ;
  customEntities=[];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private customEntitiesService: CustomEntitiesService,
    private router: Router,
    public dialog: MatDialog){
    this.customEntitiesService.getAll().subscribe((value)=>{
      console.log(value);
      this.customEntities=value;
      this.dataSource=new MatTableDataSource<any>(this.customEntities);
      this.dataSource!.paginator = this.paginator!;
    });
  }
  

  public makeDate(value: string){
    return new Date(value);
  }
  gotoEditPage(id: string) {
    const dialogRef = this.dialog.open(EntityDetailsComponent, {
      data: {id},
    });
    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log(result);
      if(result&&result.result&&result.result==="Ok"){
        this.customEntitiesService.getAll().subscribe((value)=>{
          console.log(value);
          this.customEntities=value;
      this.dataSource=new MatTableDataSource<any>(this.customEntities);
      this.dataSource!.paginator = this.paginator!;
        });
      }
    });
    }
}
