import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';

import { pipe, from, of, Observable, interval, fromEvent } from 'rxjs';
import { tap, map, concatMap, filter, mergeMap } from 'rxjs/operators';

import { DateTimeHelperService, NumberHelperService } from '@farris/ui';
import { info } from './data';
import { PaginationSetting } from '../../projects/npm-lib/src/datatable/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

  editable = {};

  radioValues = [{ text: '男', value: 'male' }, { text: '女', value: 'female' }];
  pagination: PaginationSetting;

  tableInstance: any;
  constructor(
    private dateSer: DateTimeHelperService,
    private numberSer: NumberHelperService,
    private http: HttpClient,
    updates: SwUpdate
  ) {

    this.pagination = {
      total: info.length,
      pageIndex: 3,
      pageSize: 10,
      enableChangePageSize: true,
      enableChangePageIndex: true
    };

    this.loadData();

    updates.available.subscribe(event => {
      console.log(event);
      // updates.activateUpdate().then(() => document.location.reload());
    });
  }
  title = 'ng-table';
  columns = [
    {
      title: '编号', field: 'Code', type: 'string', width: 60, align: 'center', sortable: true
      // 添加列样式
    },
    // { title: '姓名', field: 'Name', width: 80, fixed: { type: 'left', media: 'md' } },
    { title: '姓名', field: 'Name', type: 'string', width: 80, align: 'center', sortable: true },
    { title: '年龄', field: 'Age', type: 'number', width: 90, align: 'center' },
    // { title: '年龄', field: 'Age', width: 90, sortable: true, className: 'table-success' },
    { title: '出生日期', field: 'birthday', type: 'date', width: 140, format: 'YYYY-MM-DD', align: 'center' },
    { title: '身份证号', field: 'idcode', type: 'string', width: 120, align: 'center' },
    { title: '邮编', field: 'postcode', type: 'string', width: 120, align: 'center' },
    { title: '地址', field: 'address', type: 'string', width: 200, align: 'center' },
    { title: '对错', field: 'correct', type: 'boolean', width: 120, align: 'center' }
  ];
  data: any;
  ngOnInit() {

  }
  ngAfterViewInit() {

  }
  formatter(param: any) {
    const column = param.column;
    const value = param.dataItem[column.field];
    const type = column.type;
    if (type === 'date') {
      return this.dateSer.formatTo(value, column.format);
    } else if (type === 'number') {
      const opts = {
        prefix: '',
        suffix: '岁'
      };
      return this.numberSer.formatMoney(value, opts);
    } else if (type === 'boolean') {
      return value ? '是' : '否';
    } else {
      return value;
    }
  }
  rowClassName(row: any, index: number) {
    if (index > 6) {
      return 'tr-color-red';
    }
  }
  cellClassName(value: any, col: any, index: number) {
    if (value === '珠港澳2') {
      return 'td-bg-blue';
    }
  }
  /* 分页事件 */
  changePage(event: any) {
    // 当前索引 每页数量
    const { pageIndex, pageSize } = event;
    this.pagination.pageIndex = pageIndex;
    this.pagination.pageSize = pageSize;
    this.loadData();
  }
  changePageSize(event: any) {
    const { pageIndex, pageSize } = event;
    this.pagination.pageIndex = pageIndex;
    this.pagination.pageSize = pageSize;
    this.loadData();
  }
  private loadData() {
    const start = (this.pagination.pageIndex - 1) * this.pagination.pageSize;
    const end = this.pagination.pageIndex * this.pagination.pageSize;
    this.data = info.slice(start, end);
  }
  changeValue(value: any) {
    console.log(value);
  }

  dbclick(e: any, rowIndex: number, column: any) {
    e.stopPropagation();
    e.preventDefault();
    this.editable[rowIndex + column.field] = true;
  }

  blurInput(rowIndex: number, column: any) {
    this.editable[rowIndex + column.field] = false;
  }
  editCell(param) {
    const { tableInstance, rowIndex, columnIndex, isEditable } = param;
    this.tableInstance = tableInstance;
    if (!isEditable) {
      tableInstance.editCell(rowIndex, columnIndex);
    }
  }

  closeCell(param) {
    console.log(this.tableInstance);
  }

  request(e: any) {
    e.stopPropagation();
    // 请求node.js服务
    this.http.get('http://localhost:8080/delete', { responseType: 'json' }).subscribe((res) => {
      console.log(res);
    });
    // rxjs  demo   new observable
  }
}
