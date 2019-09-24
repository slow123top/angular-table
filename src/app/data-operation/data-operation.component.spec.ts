import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOperationComponent } from './data-operation.component';

describe('DataOperationComponent', () => {
  let component: DataOperationComponent;
  let fixture: ComponentFixture<DataOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
