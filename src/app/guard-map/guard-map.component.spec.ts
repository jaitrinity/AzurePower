import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardMapComponent } from './guard-map.component';

describe('GuardMapComponent', () => {
  let component: GuardMapComponent;
  let fixture: ComponentFixture<GuardMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
