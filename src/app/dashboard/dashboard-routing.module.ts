import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainControlComponent } from './main-control/main-control.component';
import { CheckControlComponent } from './check-control/check-control.component';
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'main-control',
                component: MainControlComponent
            },
            {
                path: 'check-control',
                component: CheckControlComponent
            }
        ]
    },
    // {
    //     path: 'main-control',
    //     component: MainControlComponent,
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
