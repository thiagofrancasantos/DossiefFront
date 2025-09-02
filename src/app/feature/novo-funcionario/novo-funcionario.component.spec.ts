import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoFuncionarioComponent } from './novo-funcionario.component';

describe('NovoFuncionarioComponent', () => {
  let component: NovoFuncionarioComponent;
  let fixture: ComponentFixture<NovoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
