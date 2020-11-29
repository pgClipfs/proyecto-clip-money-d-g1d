import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginIncorrectoComponent } from './modal-login-incorrecto.component';

describe('ModalLoginIncorrectoComponent', () => {
  let component: ModalLoginIncorrectoComponent;
  let fixture: ComponentFixture<ModalLoginIncorrectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLoginIncorrectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoginIncorrectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
