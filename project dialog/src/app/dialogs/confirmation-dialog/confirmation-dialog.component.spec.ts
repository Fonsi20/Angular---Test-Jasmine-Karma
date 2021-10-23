import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirmation-dialog.component';

const matDialogRefMock = {
  close: () => null,
};

describe('Dialog confirmation component', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      providers: [
        //MatDialogRef,
        //MAT_DIALOG_DATA
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, usevalue: matDialogRefMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onConfirm - Acept', () => {
    const service = fixture.debugElement.injector.get(MatDialogRef);
    const spy = spyOn(service, 'close');
    component.onConfirm();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('onDismiss - Close', () => {
    const service = TestBed.inject(MatDialogRef);
    const spy = spyOn(service, 'close');
    component.onDismiss();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(false);
  });
});
