import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityListingsComponent } from './entity-listings.component';


describe('TemperatureListingsComponent', () => {
  let component: EntityListingsComponent;
  let fixture: ComponentFixture<EntityListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
