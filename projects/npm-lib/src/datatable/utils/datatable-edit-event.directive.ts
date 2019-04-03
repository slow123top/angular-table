import { Directive, Input, ElementRef, NgZone, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { DataTableComponent } from '../datatable.component';
import { DataTableBodyComponent } from '../table/datatable-body.component';
@Directive({
    selector: '[farris-edit-event]'
})
export class FarrisEditEventDirective implements OnInit, AfterViewInit {
    @Input() rowIndex: number;
    @Input() columnIndex: number;
    constructor(public dt: DataTableComponent, private dtBody: DataTableBodyComponent, public ngZone: NgZone) {
    }
    // 当组件存在时 就要获取焦点
    ngOnInit() {
    }
    ngAfterViewInit() {
    }
    @HostListener('keydown', ['$event'])
    onKeydownCell(e) {
        if (!this.dtBody.columns[this.columnIndex].edit) {
            return;
        }
        if (!this.isKeydownEnterEdit()) {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.keydowEditEnter();
            } else if (e.keyCode === 37) {
                e.preventDefault();
                this.keydowEditLeft();
            } else if (e.keyCode === 38) {
                e.preventDefault();
                this.keydowEditUp();
            } else if (e.keyCode === 39) {
                e.preventDefault();
                this.keydowEditRight();
            } else if (e.keyCode === 40) {
                e.preventDefault();
                this.keydowEditDown();
            }
        } else {
            // 只用回车到下一个单元格编辑  最后一行可添加一行
            if (e.keyCode === 13) {
                e.preventDefault();
                this.dtBody.blurGrid(this.rowIndex, this.columnIndex);
                this.dtBody.closeEditGrid(this.rowIndex, this.columnIndex);
                // 向右移动
                if (this.columnIndex + 1 < this.dtBody.columns.length) {
                    this.dtBody.focusGrid(this.rowIndex, this.columnIndex + 1);
                    this.dtBody.editGrid(this.rowIndex, this.columnIndex + 1);
                } else {
                    if (this.rowIndex + 1 < this.dtBody.rows.length) {
                        this.dtBody.focusGrid(this.rowIndex + 1, 0);
                        this.dtBody.editGrid(this.rowIndex + 1, 0);
                    } else {
                        // 添加新行
                        // this.dtBody.addRow(this.dt.columns, this.dt.data);
                        // this.dtBody.addRow(this.dt.columns, this.dt.data);
                        // console.log(this.dtBody.columns);
                    }
                }
            }
        }

    }
    @HostListener('click', ['$event'])
    onClickCell(e) {
        console.log(e);
        if (!this.dtBody.columns[this.columnIndex].edit) {
            return;
        }
        e.preventDefault();
        // 点击  单元格可编辑
        // this.dtBody.editGrid(this.rowIndex, this.columnIndex);
        // 广播事件  弹出由用户来使用
        this.dtBody.blurGrid(this.dtBody.lastRowIndex, this.dtBody.lastColumnIndex);
        this.dtBody.cellEdit.emit({
            sender: this.dtBody,
            rowIndex: this.rowIndex,
            columnIndex: this.columnIndex,
            isEdit: this.dtBody.edit[this.rowIndex + '-' + this.columnIndex]
        });
    }
    isKeydownEnterEdit() {
        return this.dt.keydownEnterEdit;
    }
    keydowEditEnter() {
        if (this.dtBody.edit[this.rowIndex + '-' + this.columnIndex]) {
            this.dtBody.closeEditGrid(this.rowIndex, this.columnIndex);
        } else {
            this.dtBody.editGrid(this.rowIndex, this.columnIndex);
        }
        this.dtBody.focusGrid(this.rowIndex, this.columnIndex);
    }
    keydowEditLeft() {
        // 向左移动
        if (this.columnIndex - 1 < 0 || this.dtBody.edit[this.rowIndex + '-' + this.columnIndex]) {
            return;
        } else {
            this.dtBody.blurGrid(this.rowIndex, this.columnIndex);
            this.dtBody.focusGrid(this.rowIndex, this.columnIndex - 1);
        }
    }
    keydowEditRight() {
        // 向右移动
        if (this.columnIndex + 1 < this.dtBody.columns.length && !this.dtBody.edit[this.rowIndex + '-' + this.columnIndex]) {
            this.dtBody.blurGrid(this.rowIndex, this.columnIndex);
            this.dtBody.focusGrid(this.rowIndex, this.columnIndex + 1);
        } else {
            return;
        }
    }
    keydowEditUp() {
        // 向上移动
        if (this.rowIndex - 1 < 0 || this.dtBody.edit[this.rowIndex + '-' + this.columnIndex]) {
            return;
        } else {
            this.dtBody.blurGrid(this.rowIndex, this.columnIndex);
            this.dtBody.focusGrid(this.rowIndex - 1, this.columnIndex);
        }
    }
    keydowEditDown() {
        // 向下移动
        if (this.rowIndex + 1 < this.dtBody.rows.length && !this.dtBody.edit[this.rowIndex + '-' + this.columnIndex]) {
            this.dtBody.blurGrid(this.rowIndex, this.columnIndex);
            this.dtBody.focusGrid(this.rowIndex + 1, this.columnIndex);
        } else {
            return;
        }
    }
}
