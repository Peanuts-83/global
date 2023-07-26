import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardComponent } from './hard.component';

describe('HardComponent', () => {
  let component: HardComponent;
  let fixture: ComponentFixture<HardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
