import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isCollapsed = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  /* 回到首页 */
  backHome(e: MouseEvent) {
    e.stopPropagation();
    this.router.navigate(['']);
  }

  /* 链接到数据操作页面 */
  linkDataTable(e: MouseEvent) {
    // e.stopImmediatePropagation();
    e.stopPropagation();
    // this.router.navigate([{ outlets: { primary: 'datatable', sub: 'main-control' } }]);
    this.router.navigate(['datatable', 'sasa']);
  }

  linkMainControl(e: MouseEvent) {
    e.stopPropagation();
    this.router.navigate(['/dashboard/main-control']);
  }

  linkCheckControl(e: MouseEvent) {
    e.stopPropagation();
    this.router.navigate(['/dashboard/check-control']);
  }

  linkPlatform(e: MouseEvent) {
    e.stopPropagation();
    this.router.navigate(['/dashboard/platform']);
  }

  linkFormPage(e: MouseEvent) {
    this.router.navigate(['form-page/base-form']);
  }

  linkSuccessPage(e: MouseEvent) {
    this.router.navigate(['result-page/success-page']);
  }

  linkFailPage(e: MouseEvent) {
    this.router.navigate(['result-page/fail-page']);
  }

  link404page(e: MouseEvent) {
    this.router.navigate(['abnormal-page/page-404']);
  }

  linkQueryTable(e: MouseEvent) {
    this.router.navigate(['table-page/query-table']);
  }

}
