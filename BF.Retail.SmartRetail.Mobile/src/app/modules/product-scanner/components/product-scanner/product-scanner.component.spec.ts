import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductScannerComponent } from './product-scanner.component';

describe('ProductScannerComponent', () => {
  let component: ProductScannerComponent;
  let fixture: ComponentFixture<ProductScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
