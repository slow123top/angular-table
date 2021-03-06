import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
}
)
export class AppService {

    baseUrl = 'http://localhost:8080/';
    selectItem = new Subject<string[]>();

    /* 查询数据 */
    add$ = new Subject<any>();
    delete$ = new Subject<string>();
    update$ = new Subject<any>();
    query$ = new Subject<any>();

    constructor(
        private http: HttpClient
    ) {

    }

    /* 请求 */
    postReq$(method: 'POST' | 'GET', url: string, params?: any) {
        if (method === 'POST') {
            const infoStr = this.generatePostStr(params);
            return this.http.post(`${this.baseUrl}${url}`, infoStr);
        } else if (method === 'GET') {
            return this.http.get(`${this.baseUrl}${url}`);
        }
    }

    /* 生成post请求参数字符串 */
    generatePostStr(obj: any) {
        if (Object.prototype.toString.call(obj) === '[object String]') {
            return obj;
        }
        const keys = Object.keys(obj);
        const str = keys.reduce((sum: string, next: any) => {
            const result = `${sum}${next}=${obj[next]}&`;
            return result;
        }, '');
        return str.substring(0, str.length - 1);
    }
}
