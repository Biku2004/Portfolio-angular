import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksSidebarComponent } from './stocks-sidebar.component';

describe('StocksSidebarComponent', () => {
  let component: StocksSidebarComponent;
  let fixture: ComponentFixture<StocksSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
