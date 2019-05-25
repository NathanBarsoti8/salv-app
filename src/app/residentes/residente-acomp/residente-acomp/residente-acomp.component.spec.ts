import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenteAcompComponent } from './residente-acomp.component';

describe('ResidenteAcompComponent', () => {
  let component: ResidenteAcompComponent;
  let fixture: ComponentFixture<ResidenteAcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenteAcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenteAcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
