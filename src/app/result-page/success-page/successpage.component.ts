import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'dashboard',
    templateUrl: './successpage.component.html',
    styleUrls: ['../page.component.scss']
})
export class SuccessPageComponent implements OnInit {
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

