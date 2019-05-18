import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option.component';
import { TagModule } from '../../../tag/src/public_api';
@NgModule({
  declarations: [SelectComponent, OptionComponent],
  imports: [
    CommonModule,
    TagModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [SelectComponent, OptionComponent]
})
export class SelectModule { }
