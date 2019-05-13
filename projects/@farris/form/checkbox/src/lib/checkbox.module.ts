import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group.component';
@NgModule({
  declarations: [CheckboxComponent, CheckboxGroupComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CheckboxComponent, CheckboxGroupComponent]
})
export class CheckboxModule { }
