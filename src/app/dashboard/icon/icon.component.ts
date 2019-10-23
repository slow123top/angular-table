import { Component, OnInit, Input, ElementRef } from '@angular/core';
@Component({
    selector: 'icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class CheckControlComponent implements OnInit {

    @Input()
    color = '#000';

    @Input()
    backgroundColor = '#fff';

    @Input()
    size = 20;


    constructor(
        private el: ElementRef,
    ) {

    }
    ngOnInit() {

    }
}

