import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { DataTableColumn } from '../datatable-column';
import { FarrisCellTemplateDirective } from '../datatable-slot.directive';
@Component({
    selector: 'datatable-footer',
    template:
        `
    <div class="table"
    [class.table-hover]="hover">
        <ng-container *ngIf="!tableFooter">
                <table class="table table-hover">
                        <colgroup>
                            <col class="dt-checkbox-cell" *ngIf="!singleSelect"/>
                            <col *ngFor="let col of columns" [style.width]="col.width + 'px'" />
                        </colgroup>
                        <thead>
                            <tr>
                                <td class="dt-checkbox-cell" *ngIf="!singleSelect">
                                    <dt-checkbox [checked]="isCheckAll" (checkedChange)="onCheckedChange($event)"></dt-checkbox>
                                </td>
                                <td  *ngFor="let col of columns" [attr.align]="col.align||'left'">{{ col.title }}</td>
                            </tr>
                        </thead>
                </table>
        </ng-container>
        <ng-template *ngIf="tableFooter" [ngTemplateOutlet]="tableFooter"></ng-template>
</div>
    `
})
export class DatatableFooterComponent {
    @Input() singleSelect = true;
    @Input() hover: boolean;
    @Input() columns: DataTableColumn[];
    isCheckAll = false;
    // 表格 footer 可添加模板
    @Input()
    @ContentChild(FarrisCellTemplateDirective, { read: TemplateRef }) tableFooter: TemplateRef<any>;
    constructor() {
    }
    onCheckedChange($event: any) {
        this.isCheckAll = $event.checked;
        // this.checkedAll.emit($event.checked);
    }
}
