import { TestBed } from '@angular/core/testing';

import { ModalLoginIncorrectoService } from './modal-login-incorrecto.service';

describe('ModalLoginIncorrectoService', () => {
  let service: ModalLoginIncorrectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalLoginIncorrectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
