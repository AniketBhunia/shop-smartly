import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbybrandComponent } from './viewbybrand.component';

describe('ViewbybrandComponent', () => {
  let component: ViewbybrandComponent;
  let fixture: ComponentFixture<ViewbybrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbybrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewbybrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
