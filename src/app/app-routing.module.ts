import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChoseComponent } from './chose/chose.component';
import { GameViewComponent } from './game-view/game-view.component';

const routes: Routes = [
  { path: '', component: ChoseComponent},
  { path: 'game', component: GameViewComponent},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
