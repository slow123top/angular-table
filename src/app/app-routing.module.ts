import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataOperationComponent } from './data-operation/data-operation.component';
// import {}
const routes: Routes = [

  {
    path: 'datatable/:id',
    component: DataOperationComponent
  },
  // dashboard
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  // 表单页面
  {
    path: 'form-page',
    loadChildren: './form-page/form-page.module#FormPageModule'
  },
  // 结果页面
  {
    path: 'result-page',
    loadChildren: './result-page/resultpage.module#ResultPageModule'
  },
  // 异常页面
  {
    path: 'abnormal-page',
    loadChildren: './abnormal-page/abnormalpage.module#AbnormalPageModule'
  },
  // 表格页面
  {
    path: 'table-page',
    loadChildren: './table-page/table-page.module#TablePageModule'
  },
  {
    path: '',
    redirectTo: 'dashboard/main-control',
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
