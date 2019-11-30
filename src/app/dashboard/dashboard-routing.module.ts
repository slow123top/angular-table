import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainControlComponent } from './main-control/main-control.component';
import { CheckControlComponent } from './check-control/check-control.component';
import { PlatformComponent } from './platform/platform.component';
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
            },
            {
                path: 'platform',
                component: PlatformComponent
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
