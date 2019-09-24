import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  selectItem = new Subject<string[]>();

  constructor(
    private http: HttpClient
  ) {

  }


  /* 查询 */
  /* 删除 */
  /* 更新 */
  /* 增加数据 */
}
