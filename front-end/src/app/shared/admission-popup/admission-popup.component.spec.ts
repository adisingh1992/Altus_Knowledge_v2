import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionPopupComponent } from './admission-popup.component';

describe('AdmissionPopupComponent', () => {
  let component: AdmissionPopupComponent;
  let fixture: ComponentFixture<AdmissionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
