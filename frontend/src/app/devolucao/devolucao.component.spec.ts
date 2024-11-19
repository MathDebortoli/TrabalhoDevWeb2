import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucaoComponent } from './devolucao.component';

describe('DevolucaoComponent', () => {
  let component: DevolucaoComponent;
  let fixture: ComponentFixture<DevolucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
