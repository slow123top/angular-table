import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { DateTimeHelperService, NumberHelperService } from '@farris/ui';
import { AdItem } from './dynamic/ad-item';
import { AdService } from './dynamic/ad.service';
import { HeroProfileComponent } from './dynamic/hero-profile.component';
import { info } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  total: number;
  pageIndex: number;
  pageSize: number;
  ads: AdItem[];
  constructor(private dateSer: DateTimeHelperService, private numberSer: NumberHelperService, private adService: AdService) {
    this.total = info.length;
    this.pageIndex = 3;
    this.pageSize = 10;
    this.loadData();
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
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData();
  }
  private loadData() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = this.pageIndex * this.pageSize;
    this.data = info.slice(start, end);
  }

}
