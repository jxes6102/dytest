import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { displayPipe } from './game-view/convert.pipe';
import { winerPipe } from './game-view/winer.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoseComponent } from './chose/chose.component';
import { GameViewComponent } from './game-view/game-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoseComponent,
    GameViewComponent,
    displayPipe,
    winerPipe
  ],
  imports: [
    CommonModule ,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
