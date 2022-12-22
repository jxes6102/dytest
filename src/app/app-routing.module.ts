import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllViewComponent } from './all-view/all-view.component';

const routes: Routes = [
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
