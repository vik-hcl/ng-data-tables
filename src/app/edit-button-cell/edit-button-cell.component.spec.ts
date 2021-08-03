import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonCellComponent } from './edit-button-cell.component';

describe('EditButtonCellComponent', () => {
  let component: EditButtonCellComponent;
  let fixture: ComponentFixture<EditButtonCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditButtonCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditButtonCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
