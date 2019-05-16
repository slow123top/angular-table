import { Directive, TemplateRef } from '@angular/core';
@Directive({
    selector: '[farrisCellTemplate]'
})
export class FarrisCellTemplateDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }
}

@Directive({
    selector: '[farrisEditTemplate]'
})
export class FarrisEditTemplateDirective {
    constructor(public templateRef: TemplateRef<any>) {
    }
}
