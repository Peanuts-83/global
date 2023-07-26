import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifsComponent } from './objectifs.component';

describe('ObjectifsComponent', () => {
  let component: ObjectifsComponent;
  let fixture: ComponentFixture<ObjectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
