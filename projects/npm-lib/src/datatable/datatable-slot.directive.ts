import { Directive, TemplateRef } from '@angular/core';
@Directive({
    selector: '[farrisColumnTemplate]'
})
export class FarrisColumnTemplateDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }
}
