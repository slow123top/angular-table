import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbnormalPageComponent } from './abnormalpage.component';
import { Page404Component } from './abnormalpage.component';
const routes: Routes = [
    {
        path: '',
        component: AbnormalPageComponent,
        children: [
            {
                path: 'page-404',
                component: Page404Component
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AbnormalPageRoutingModule { }
