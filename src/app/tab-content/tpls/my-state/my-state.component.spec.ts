import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStateComponent } from './my-state.component';

describe('MyStateComponent', () => {
  let component: MyStateComponent;
  let fixture: ComponentFixture<MyStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
