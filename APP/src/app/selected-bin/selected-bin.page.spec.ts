import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBinPage } from './selected-bin.page';

describe('SelectedBinPage', () => {
  let component: SelectedBinPage;
  let fixture: ComponentFixture<SelectedBinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedBinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
