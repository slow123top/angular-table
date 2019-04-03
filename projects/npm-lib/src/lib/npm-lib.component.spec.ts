import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpmLibComponent } from './npm-lib.component';

describe('NpmLibComponent', () => {
  let component: NpmLibComponent;
  let fixture: ComponentFixture<NpmLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpmLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpmLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
