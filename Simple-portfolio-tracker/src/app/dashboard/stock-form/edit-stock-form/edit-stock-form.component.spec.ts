import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockFormComponent } from './edit-stock-form.component';

describe('EditStockFormComponent', () => {
  let component: EditStockFormComponent;
  let fixture: ComponentFixture<EditStockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStockFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
