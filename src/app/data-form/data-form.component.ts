import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataFormComponent implements OnInit {
  @Output() saveForm = new EventEmitter<any>();
  @Output() cancelForm = new EventEmitter<any>();

  validateForm: FormGroup;

  submitForm(): void {
    const formControls = this.validateForm.controls;
    Object.keys(formControls).forEach((controlKey: string) => {
      formControls[controlKey].markAsDirty();
      formControls[controlKey].updateValueAndValidity();
    });
  }

  constructor(
    private fb: FormBuilder,
    private appSer: AppService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }


  save(e: MouseEvent) {
    e.stopPropagation();
    const nyUserName = this.validateForm.get('userName').value;
    const nyPassword = this.validateForm.get('password').value;
    this.appSer.add$.next({
      name: nyUserName,
      password: nyPassword
    });
  }

  cancal(e: MouseEvent) {
    e.preventDefault();
    this.validateForm.reset();
  }
}
