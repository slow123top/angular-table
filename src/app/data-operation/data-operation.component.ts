import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { DataOperationServiceService } from './data-operation.service';
import { mergeMap, map, concatMap, switchMap } from 'rxjs/operators';
import { DataTableComponent } from '../data-table/data-table.component';
import { of } from 'rxjs';
import { DataFormComponent } from '../data-form/data-form.component';
import { AppService } from '../app.service';
@Component({
  selector: 'data-operation',
  templateUrl: './data-operation.component.html',
  styleUrls: ['./data-operation.component.scss'],
  providers: [DataOperationServiceService]
})
export class DataOperationComponent implements OnInit {

  @ViewChild('dataTable', { read: DataTableComponent }) dataTable: DataTableComponent;
  @ViewChild('dataForm', { read: DataFormComponent }) dataForm: DataFormComponent;
  /* 查询条件 */
  @Input() value = '';

  public username = '';
  public password = '';

  public isSpinning = false;
  columns = [{ field: 'id', title: 'ID' }, { field: 'name', title: '姓名' },
  { field: 'password', title: '密码' }];
  data = [];
  constructor(
    private http: HttpClient,
    private messager: NzMessageService,
    private dataOperationService: DataOperationServiceService,
    private route: ActivatedRoute,
    private appSer: AppService
  ) {
  }

  /* 初始化查询数据 */
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          return this.query$();
        })
      )
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          if (res.data.length) {
            this.dataTable.data = res.data.map((ele: any) => {
              return {
                id: ele.id,
                name: ele.name,
                password: ele.password
              };
            });
          }
          this.isSpinning = false;
        } else {
          this.messager.error(
            res.message
          );
        }
      });
  }

  delete(e: MouseEvent) {
    e.stopImmediatePropagation();
    const checkedIds = this.dataTable.getCheckedIds();
    const params = checkedIds.reduce((sum: string, next: string) => {
      sum += `ids=${next}&`;
      return sum;
    }, '');
    this.appSer.delete$.next(params.substring(0, params.length - 1));
  }

  /* 是否可删除 */
  isDelete() {
    return Object.keys(this.dataTable.checkedIds).some(ele => this.dataTable.checkedIds[ele]);
  }

  /* 查询操作 */
  query$() {
    return this.dataOperationService.postReq$('GET', 'query');
  }

  /* 批量删除数据 */
  delete$(params: any) {

    return this.dataOperationService.postReq$('POST', 'deleteMany', params);
  }

  /* 添加数据 */
  insert$(params: any) {
    return this.dataOperationService.postReq$('POST', 'insert', params);
  }

}
