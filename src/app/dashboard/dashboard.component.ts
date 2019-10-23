import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    // styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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

