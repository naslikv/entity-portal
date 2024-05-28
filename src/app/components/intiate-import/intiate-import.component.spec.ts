import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntiateImportComponent } from './intiate-import.component';

describe('IntiateImportComponent', () => {
  let component: IntiateImportComponent;
  let fixture: ComponentFixture<IntiateImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntiateImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntiateImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
