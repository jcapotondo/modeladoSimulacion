import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontecarloComponent } from './montecarlo.component';

describe('MontecarloComponent', () => {
  let component: MontecarloComponent;
  let fixture: ComponentFixture<MontecarloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontecarloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontecarloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
