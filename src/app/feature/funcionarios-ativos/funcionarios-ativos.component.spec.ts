import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosAtivosComponent } from './funcionarios-ativos.component';

describe('FuncionariosAtivosComponent', () => {
  let component: FuncionariosAtivosComponent;
  let fixture: ComponentFixture<FuncionariosAtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosAtivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionariosAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
