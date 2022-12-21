import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllViewComponent } from './all-view/all-view.component';
import { ChoseComponent } from './chose/chose.component';
import { GameViewComponent } from './game-view/game-view.component';

const routes: Routes = [
  //舊版
  // { path: '', component: ChoseComponent},
  // { path: 'game', component: GameViewComponent},
  //新版
  { path: '', component: AllViewComponent},
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
