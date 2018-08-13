import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsFieldComponent } from './forms-field.component';

describe('FormsFieldComponent', () => {
  let component: FormsFieldComponent;
  let fixture: ComponentFixture<FormsFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
