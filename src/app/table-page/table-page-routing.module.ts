import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablePageComponent } from './table-page.component';
import { QueryTableComponent } from './query-table/query-table.component';
const routes: Routes = [
    {
        path: '',
        component: TablePageComponent,
        children: [
            {
                path: 'query-table',
                component: QueryTableComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablePageRoutingModule { }
