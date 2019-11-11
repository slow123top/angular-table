import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'dashboard',
    templateUrl: './failpage.component.html',
    styleUrls: ['./failpage.component.scss']
})
export class FailPageComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {

    }
    linkMainControl() {
        this.router.navigate(['form-page'], { relativeTo: this.route });
    }
}

