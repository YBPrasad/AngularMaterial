import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MediaChange,MediaObserver} from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy,AfterViewInit{
  title = 'AngularTest';
  mediaSub?:Subscription;
  deviceXs?:boolean;

  //sidenav bar using breakpoint observer
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  constructor(private observer:BreakpointObserver,public mediaObserver:MediaObserver,private cdRef:ChangeDetectorRef){

  }

  ngOnInit(){
    this.mediaSub=this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias);
      console.log(result.mediaQuery);
      this.deviceXs=result.mqAlias==='xs'?true:false;
    })
  }
  ngAfterViewInit(){
    this.observer.observe(['(max-width:800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode='over';
        this.sidenav.close();
      }
      else{
        this.sidenav.mode="side";
        this.sidenav.open()
      }
    })
  }
  ngOnDestroy(){
    this.mediaSub?.unsubscribe();
  }
}
