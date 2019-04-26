import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { DateTimeHelperService, NumberHelperService } from '@farris/ui';
import { AdItem } from './dynamic/ad-item';
import { AdService } from './dynamic/ad.service';
import { HeroProfileComponent } from './dynamic/hero-profile.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  ads: AdItem[];
  constructor(private dateSer: DateTimeHelperService, private numberSer: NumberHelperService, private adService: AdService) {

  }
  title = 'ng-table';
  columns = [
    {
      title: '编号', field: 'Code', type: 'string', width: 60, align: 'center', sortable: true
      // 添加列样式
    },
    // { title: '姓名', field: 'Name', width: 80, fixed: { type: 'left', media: 'md' } },
    { title: '姓名', field: 'Name', type: 'string', width: 80, align: 'center', sortable: true, hidden: true },
    { title: '年龄', field: 'Age', type: 'number', width: 90, align: 'center' },
    // { title: '年龄', field: 'Age', width: 90, sortable: true, className: 'table-success' },
    { title: '出生日期', field: 'birthday', type: 'date', width: 140, format: 'YYYY-MM-DD', align: 'center' },
    { title: '身份证号', field: 'idcode', type: 'string', width: 120, align: 'center' },
    { title: '邮编', field: 'postcode', type: 'string', width: 120, align: 'center' },
    { title: '地址', field: 'address', type: 'string', width: 200, align: 'center' },
    { title: '对错', field: 'correct', type: 'boolean', width: 120, align: 'center' }
  ];
  data = [
    {
      Code: 1, Name: '珠港澳', Age: 20, birthday: '1998-05-06', idcode: '没有权限查看', postcode: '05310000',
      address: '地球', correct: false
    },
    { Code: 3, Name: '珠港澳1aaaa', Age: 21, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
    { Code: 56, Name: '珠港澳2', Age: 22, birthday: '1998-5-6', idcode: '没有权限查看', postcode: '05310000', address: '地球', correct: false },
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
  ngOnInit() {
    this.ads = [new AdItem(HeroProfileComponent, { name: 'Bombasto', bio: 'Brave as they come' })];
  }
  ngAfterViewInit() {

  }
  formatter(param: any) {
    const column = param.column;
    const value = param.row[column.field];
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
  rowClassName(row, index) {
    if (index > 6) {
      return 'tr-color-red';
    }
  }
  cellClassName(value, col, index) {
    if (value === '珠港澳2') {
      return 'td-bg-blue';
    }
  }

}
