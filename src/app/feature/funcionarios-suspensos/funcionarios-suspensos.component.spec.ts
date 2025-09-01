import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosSuspensosComponent } from './funcionarios-suspensos.component';

describe('FuncionariosSuspensosComponent', () => {
  let component: FuncionariosSuspensosComponent;
  let fixture: ComponentFixture<FuncionariosSuspensosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosSuspensosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionariosSuspensosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
