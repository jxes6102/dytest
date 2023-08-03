import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllViewComponent } from './all-view/all-view.component';
import { FormtestComponent } from './formtest/formtest.component';
import { Test2Component } from './test2/test2.component';

const routes: Routes = [
  { path: '', component: AllViewComponent},
  { path: 'form', component: FormtestComponent},
  { path: 'test', component: Test2Component},
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
