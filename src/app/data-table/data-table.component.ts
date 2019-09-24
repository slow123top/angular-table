import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

import { DataServiceService } from '../data-service.service';
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
    private http: HttpClient,
    private messager: NzMessageService,
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
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

    // this.dataService.selectItem.next(this.getCheckedIds());

  }

  /* 获取选中的数据id组合 */
  getCheckedIds() {
    return Object.keys(this.checkedIds).filter(ele => this.checkedIds[ele]) || [];
  }

  /* 保存 */
  save(e: MouseEvent, dataItem: any) {

  }

  /* 修改 */
  update(e: MouseEvent, dataItem: any) {

  }

  /* 删除 */
  delete(e: MouseEvent, dataItem: any) {
    const currentId = dataItem.id;
    const headers = new HttpHeaders().set(
      'Access-Control-Allow-Origin',
      '*'
    );
    this.http.post(
      'http://localhost:8080/delete',
      currentId,
      { headers }).subscribe(
        {
          next: (res: any) => {
            this.messager.success(
              res
            );

          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            // this.notify.error(
            //   '错误信息',
            //   err.message
            // );
          },
          complete: () => {

            console.log('删除成功');
            // this.notify.success(
            //   '成功信息',
            //   '已获取数据'
            // );
          }
        }
      );
  }
}
