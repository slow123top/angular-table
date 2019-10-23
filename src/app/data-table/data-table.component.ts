import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

import { AppService } from '../app.service';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
interface Column {
  // 列字段
  field: string;

  // 列标题
  title: string;

  // 列宽度 高度
  width?: number;
  height?: number;

}
@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  /* 列表数据 */
  @Input() data = [];

  /* 列数据 */
  @Input() columns: Array<Column> = [];

  /* 全选状态 */
  isAllChecked = false;

  /* 不确定状态 */
  isIndeterminate = false;

  /* 选中的id */
  checkedIds: { [key: string]: boolean } = {};

  constructor(
    private appSer: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.add();
    this.delete();
  }

  /* 每条数据的key值 */
  getDataItemKeys(dataItem: any) {
    return Object.keys(dataItem);
  }


  /*全选 */
  checkAll(value: boolean) {

    this.data.forEach(dataItem => {
      this.checkedIds[dataItem.id] = value;
    });
    this.refreshStatus();

  }


  /* 刷新状态 */
  refreshStatus() {

    this.isAllChecked = this.data.every(dataItem => this.checkedIds[dataItem.id]);

    this.isIndeterminate = this.data.some(dataItem => this.checkedIds[dataItem.id]) && !this.isAllChecked;

  }

  /* 获取选中的数据id组合 */
  getCheckedIds() {
    return Object.keys(this.checkedIds).filter(ele => this.checkedIds[ele]) || [];
  }


  /* 增加数据 */
  add() {
    this.appSer.add$.pipe(
      mergeMap((res) => {
        return this.appSer.postReq$('POST', 'insert', res);
      }),
      mergeMap((res: any) => {
        if (res.status === 'SUCCESS') {
          return this.appSer.postReq$('GET', 'query');
        } else {
          of(res);
        }
      }))
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.data = res.data.map((ele: any) => {
            return {
              id: ele.id,
              name: ele.name,
              password: ele.password
            };
          });
        }
      });
  }

  /* 删除数据 */
  delete() {

    this.appSer.delete$.pipe(
      mergeMap(res => {
        return this.appSer.postReq$('POST', 'deleteMany', res);
      }),
      mergeMap((res: any) => {
        if (res.status === 'SUCCESS') {
          this.getCheckedIds().forEach(ele => {
            this.checkedIds[ele] = false;
          });
          this.refreshStatus();
          return this.appSer.postReq$('GET', 'query');
        }
      })
    )
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.data = res.data.map((ele: any) => {
            return {
              id: ele.id,
              name: ele.name,
              password: ele.password
            };
          });
        }
      });
  }

  /* 更改数据 */
  update() {

  }

  /* 查询数据 */
  query() {
    this.appSer.query$.subscribe(res => {
      if (res.status === 'SUCCESS') {
        if (res.data.length) {
          this.data = res.data.map((ele: any) => {
            return {
              id: ele.id,
              name: ele.name,
              password: ele.password
            };
          });
        }
        // this.isSpinning = false;
      } else {
        //   this.messager.error(
        //     res.message
        //   );
        // }
      }
    });
  }

  linkDashboard() {
    this.router.navigate(['/dashboard', 111]);
  }
}
