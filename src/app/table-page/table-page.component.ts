import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'table-page',
    templateUrl: './table-page.component.html',
    // styleUrls: ['./dashboard.component.scss']
})
export class TablePageComponent implements OnInit {
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

