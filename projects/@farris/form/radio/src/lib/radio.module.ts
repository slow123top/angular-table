import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioComponent } from './radio.component';
import { RadioGroupComponent } from './radio-group.component';
import { RadioService } from './radio.service';
@NgModule({
  declarations: [RadioComponent, RadioGroupComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [RadioService],
  exports: [RadioComponent, RadioGroupComponent]
})
export class RadioModule { }
