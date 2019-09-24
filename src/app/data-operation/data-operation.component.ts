import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

import { DataServiceService } from '../data-service.service';
import { mergeMap, map, concatMap, switchMap } from 'rxjs/operators';
import { DataTableComponent } from '../data-table/data-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
@Component({
  selector: 'data-operation',
  templateUrl: './data-operation.component.html',
  styleUrls: ['./data-operation.component.scss']
})
export class DataOperationComponent implements OnInit {

  @ViewChild('dataTable', { read: DataTableComponent }) dataTable: DataTableComponent;
  /* 查询条件 */
  @Input() value = '';

  public username = '';
  public password = '';

  columns = [{ field: 'id', title: 'ID' }, { field: 'name', title: '姓名' },
  { field: 'password', title: '密码' }, { field: 'action', title: '操作' }];
  data = [];
  constructor(
    private http: HttpClient,
    private messager: NzMessageService,
    private dataService: DataServiceService
  ) {
    // this.messageer.config({
    //   nzPlacement: 'topRight'
    // });
  }

  ngOnInit() {
  }

  /* 查询操作 */
  query(event: MouseEvent) {

    // 阻止冒泡
    event.stopPropagation();

    // 查询
    const value = this.value;
    this.http.get('http://localhost:8080/query').subscribe(
      {
        next: (res: any) => {
          console.log(res);
          if (res.status === 'SUCCESS') {
            this.data = res.data.map((ele: any) => {
              const obj = { id: '', name: '', password: '' };
              obj.id = ele.id;
              obj.name = ele.name;
              obj.password = ele.password;
              return obj;
            });
            this.messager.info(
              res.message
            );
          } else {
            this.messager.error(
              res.message
            );
          }
        },
        error: (err: HttpErrorResponse) => {
          this.messager.error(
            err.message
          );
        }
      }
    );
  }

  /* 批量删除数据 */
  deleteMany(e: MouseEvent) {
    e.stopPropagation();
    const data = this.dataTable.getCheckedIds();
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    const params = data.reduce((sum: string, next: string) => {
      sum += `ids=${next}&`;
      return sum;
    }, '');
    console.log(params);
    this.http.post('http://localhost:8080/deleteMany', params.substring(0, params.length - 1), { headers })
      .subscribe(
        (res: any) => {
          this.messager.success(res);
        }
      );
  }

  /* 添加数据 */
  addData(e: MouseEvent) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain'
    );
    this.http.post<any>('http://localhost:8080/insert', `name=${this.username}&password=${this.password}`)
      .pipe(mergeMap(res => {
        if (res.status === 'SUCCESS') {
          return this.http.get<any>('http://localhost:8080/query');
        } else {
          of(res);
        }
      }))
      .subscribe((res: any) => {
        if (res.status === 'SUCCESS') {
          this.data = res.data.map((ele: any) => {
            const obj = { id: '', name: '', password: '' };
            obj.id = ele.id;
            obj.name = ele.name;
            obj.password = ele.password;
            return obj;
          });
          this.messager.info(
            res.message
          );
        }
      });
  }
}
