import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosInativosComponent } from './funcionarios-inativos.component';

describe('FuncionariosInativosComponent', () => {
  let component: FuncionariosInativosComponent;
  let fixture: ComponentFixture<FuncionariosInativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosInativosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionariosInativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
