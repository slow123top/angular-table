import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseFormComponent } from './base-form/base-form.component';
import { FormPageComponent } from './form-page.component';
const routes: Routes = [
    {
        path: '',
        component: FormPageComponent,
        // children: [
        //     {
        //         path: 'base-form',
        //         component: BaseFormComponent
        //     },
        // ]
    },
    {
        path: 'base-form',
        component: BaseFormComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormPageRoutingModule { }
