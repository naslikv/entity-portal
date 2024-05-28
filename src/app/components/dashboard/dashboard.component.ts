import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ActivatedRoute, NavigationEnd, NavigationSkipped, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { LocalStorageService } from '../../services/local-storage-service';
import { User } from '../../models/user';
import { UserSessionService } from '../../services/user-session-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,MatDividerModule,
    MatListModule,RouterOutlet,RouterLink,RouterLinkActive,RouterModule,CommonModule,MatMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentUser?: User= undefined;
  currentRoute: any="/dashboard/home";
  homeRoute="/dashboard/home";
  importRoute="/dashboard/import";
  entityRoute="/dashboard/entity";
  userRoute="/dashboard/user";
 title="Home";
  constructor(private activatedRoute: ActivatedRoute,private router: Router,
    private userSessionService: UserSessionService,
    private localStorageService: LocalStorageService){
      this.currentUser=this.localStorageService.getUser();
  this.router.events.subscribe((event: any)=>{
    console.log(event);
    if(event instanceof NavigationEnd || event instanceof NavigationSkipped){
      if(event instanceof NavigationEnd){
      this.currentRoute=event.urlAfterRedirects;
    }
    else{
      this.currentRoute=event.url;
    }
      if(this.currentRoute===this.homeRoute){
        this.title="Home";
      }
      else if(this.currentRoute===this.importRoute){
        this.title="Imports";
      }
      else if(this.currentRoute===this.entityRoute){
        this.title="Entity Listings";
      }
      else{
        this.title="Users";
      }
    }
  });
  }
  public logout(){
    this.userSessionService.destroySession();
    this.router.navigate(['/login']);
  }
}
