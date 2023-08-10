import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbycategoryComponent } from './viewbycategory.component';

describe('ViewbycategoryComponent', () => {
  let component: ViewbycategoryComponent;
  let fixture: ComponentFixture<ViewbycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewbycategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewbycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
