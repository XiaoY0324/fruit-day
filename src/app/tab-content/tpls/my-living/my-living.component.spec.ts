import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLivingComponent } from './my-living.component';

describe('MyLivingComponent', () => {
  let component: MyLivingComponent;
  let fixture: ComponentFixture<MyLivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
