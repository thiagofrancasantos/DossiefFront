import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    MessageModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  loading = false;
  loginError = false;
  msg = '';
  msgTtile = '';

  form = this.fb.group({
    username: ['', [Validators.required]],      
    password: ['', [Validators.required, Validators.minLength(4)]],
    keepMeConnected: [false],  // adicionando keepMeConnected
  });
  showPassword = false;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit() {
    this.form.controls.username.markAsTouched();
    this.form.controls.password.markAsTouched();

    if (this.form.valid) {
      const username: string = this.form.controls.username.value!;
      const password: string = this.form.controls.password.value!;
      const keepMeConnected: boolean = this.form.controls.keepMeConnected.value!;

      this.loading = true;
      this.loginError = false;

      this.loginService.login({ username, password }, keepMeConnected).subscribe({
        next: (isValid) => {
          if (isValid) {
            this.router.navigate(['/home']);
          } else {
            this.loginError = true;
            this.msgTtile = 'Credenciais inválidas';
          }
        },
        error: (error) => {
          console.error('Erro de login:', error);
          this.loginError = true;

          if (error.message === 'invalid-email') {
            this.msg = 'Usuário não encontrado';
            this.msgTtile = 'O email inserido não está registrado.';
          }
          if (error.message === 'inactive-user') {
            this.msg = 'Conta inativa';
            this.msgTtile = 'Não é possível fazer o login porque a conta está inativa.';
          }
          if (error.message === 'Invalid credentials') {
            this.msgTtile = 'Credenciais inválidas';
            this.form.controls.password.setErrors({ credentials: true });
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
