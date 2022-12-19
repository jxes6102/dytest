import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { displayPipe } from './game-view/convert.pipe';
import { winerPipe } from './game-view/winer.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoseComponent } from './chose/chose.component';
import { GameViewComponent } from './game-view/game-view.component';
import { HistoryComponent } from './history/history.component';
import { Test1Component } from './test1/test1.component';
import { PickComponent } from './pick/pick.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChoseComponent,
    GameViewComponent,
    displayPipe,
    winerPipe,
    HistoryComponent,
    Test1Component,
    PickComponent
  ],
  imports: [
    CommonModule ,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
