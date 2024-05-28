import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ImportJob } from '../../models/import-job';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImportService } from '../../services/import-service';
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
import { IntiateImportComponent } from '../intiate-import/intiate-import.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,DatePipe,MatPaginatorModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {

  displayedColumns: string[] = ['id', 'fileName', 'importedOn', 'importedBy'];
  dataSource?: MatTableDataSource<any> ;
  importsData=[];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private importService: ImportService,
    private router: Router,
    public dialog: MatDialog){
    this.importService.getAll().subscribe((value)=>{
      console.log(value);
      this.importsData=value;
      this.dataSource=new MatTableDataSource<any>(this.importsData);
      this.dataSource!.paginator = this.paginator!;
    });
  }
  gotoInitiateImport() {
    const dialogRef = this.dialog.open(IntiateImportComponent, {});
    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log(result);
      if(result&&result.result&&result.result==="Ok"){
        this.importService.getAll().subscribe((value)=>{
          console.log(value);
          this.importsData=value;
          this.dataSource=new MatTableDataSource<any>(this.importsData);
          this.dataSource!.paginator = this.paginator!;
        });
      }
    });
    }
  public makeDate(value: string){
    return new Date(value);
  }
}
