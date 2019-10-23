import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'base-form',
    templateUrl: './base-form.component.html'
})
export class BaseFormComponent implements OnInit {
    constructor(
        private router: Router
    ) {

    }

    ngOnInit() {

    }

    linkDashboard() {
        this.router.navigate(['dashboard/main-control']);
    }
}

