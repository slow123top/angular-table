import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'dashboard',
    templateUrl: './resultpage.component.html',
    styleUrls: ['./page.component.scss']
})
export class ResultPageComponent implements OnInit {
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

