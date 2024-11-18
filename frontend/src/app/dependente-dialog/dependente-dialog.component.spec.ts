import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenteDialogComponent } from './dependente-dialog.component';

describe('DependenteDialogComponent', () => {
  let component: DependenteDialogComponent;
  let fixture: ComponentFixture<DependenteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DependenteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
