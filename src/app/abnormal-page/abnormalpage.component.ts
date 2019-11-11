import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'dashboard',
    templateUrl: './abnormalpage.component.html',
})
export class AbnormalPageComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {

    }
}


@Component({
    selector: 'abnormal-404-page',
    template: `
    <div nz-row>
        <div nz-col nzSpan="14">
            <div class="img-404">
            </div>
        </div>
        <div nz-col nzSpan="10">
            <h1>404</h1>
            <div class="info-404 main-info-404">抱歉，你访问的页面不存在</div>
            <div class="info-404"><button nz-button nzType="primary">返回首页</button></div>
        </div>
    </div>
    `,
    styles: [
        `
        .img-404{
            max-width:100%;
            height:350px;
            padding-left:10rem;
            padding-top:5rem;
            background-image:url('https://file.iviewui.com/iview-pro/icon-404.svg');
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: contain;
        }
        h1{
            margin-top:5rem
        }
        .info-404{
            margin-top:1rem;
        }

        .main-info-404{
            font-size:1.5rem;
        }
        `
    ]
})
export class Page404Component implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}

