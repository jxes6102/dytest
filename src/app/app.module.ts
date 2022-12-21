import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { displayPipe } from './convert.pipe';
import { winerPipe } from './winer.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoseComponent } from './chose/chose.component';
import { GameViewComponent } from './game-view/game-view.component';
import { HistoryComponent } from './history/history.component';
import { Test1Component } from './test1/test1.component';
import { PickComponent } from './pick/pick.component';
import { HttpClientModule } from '@angular/common/http';
import { PictureComponent } from './picture/picture.component';
import { AllViewComponent } from './all-view/all-view.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoseComponent,
    GameViewComponent,
    displayPipe,
    winerPipe,
    HistoryComponent,
    Test1Component,
    PickComponent,
    PictureComponent,
    AllViewComponent,
    NoteComponent
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
