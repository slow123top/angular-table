import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultPageComponent } from './resultpage.component';
import { SuccessPageComponent } from './success-page/successpage.component';
import { FailPageComponent } from './fail-page/failpage.component';
const routes: Routes = [
    {
        path: '',
        component: ResultPageComponent,
        children: [
            {
                path: 'success-page',
                component: SuccessPageComponent
            },
            {
                path: 'fail-page',
                component: FailPageComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResultPageRoutingModule { }
