import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataOperationComponent } from './data-operation/data-operation.component';
// import {}
const routes: Routes = [

  {
    path: 'datatable/:id',
    component: DataOperationComponent
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'form-page',
    loadChildren: './form-page/form-page.module#FormPageModule'
  },
  {
    path: 'result-page',
    loadChildren: './result-page/resultpage.module#ResultPageModule'
  },
  {
    path: 'abnormal-page',
    loadChildren: './abnormal-page/abnormalpage.module#AbnormalPageModule'
  },
  {
    path: '',
    redirectTo: 'form-page/base-form',
    pathMatch: 'full'
    // component: IndexComponent
  },
  // {
  //   path: 'main-control',
  //   component: MainControlComponent,
  //   outlet: 'sub'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
