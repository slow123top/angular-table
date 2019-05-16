import { NgModule } from '@angular/core';
import { TagComponent } from './tag.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule
  ],
  exports: [TagComponent]
})
export class TagModule { }
