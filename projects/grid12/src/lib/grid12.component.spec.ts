import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid12Component } from './grid12.component';

describe('Grid12Component', () => {
  let component: Grid12Component;
  let fixture: ComponentFixture<Grid12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Grid12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Grid12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
