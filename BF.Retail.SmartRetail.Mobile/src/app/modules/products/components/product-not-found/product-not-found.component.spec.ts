import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNotFoundComponent } from './product-not-found.component';

describe('ProductNotFoundComponent', () => {
  let component: ProductNotFoundComponent;
  let fixture: ComponentFixture<ProductNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
