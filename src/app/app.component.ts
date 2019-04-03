import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-table';
  columns = [
    {
      title: '编号', field: 'Code', width: 60, align: 'center'
      // 添加列样式
    },
    // { title: '姓名', field: 'Name', width: 80, fixed: { type: 'left', media: 'md' } },
    { title: '姓名', field: 'Name', width: 80 },
    { title: '年龄', field: 'Age', width: 90 },
    // { title: '年龄', field: 'Age', width: 90, sortable: true, className: 'table-success' },
    { title: '出生日期', field: 'birthday', width: 140, formatter: { type: 'datetime', options: { format: 'YYYY-MM-DD' } } },
    { title: '身份证号', field: 'idcode', width: 120 },
    { title: '邮编', field: 'postcode', width: 120 },
    { title: '地址', field: 'address', width: 200 }
  ];
  data = [
    {
      Code: 1, Name: '珠港澳', Age: 20, birthday: '1998-05-06', idcode: '没有权限查看', postcode: '05310000',
      address: '地球', correct: false
    },
    { Code: 2, Name: '珠港澳1', Age: 21, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 3, Name: '珠港澳2', Age: 22, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 4, Name: '珠港澳3', Age: 23, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 5, Name: '珠港澳4', Age: 24, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 6, Name: '珠港澳5', Age: 25, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 7, Name: '珠港澳6', Age: 26, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 8, Name: '珠港澳7', Age: 27, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 9, Name: '珠港澳8', Age: 20, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 10, Name: '珠港澳9', Age: 20, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 11, Name: '珠港澳10', Age: 20, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 12, Name: '珠港澳11', Age: 20, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false }
  ];
}
