import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  TuiAlertService,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfield,
    TuiPassword,
    TuiIcon,
    TuiError,
    TuiButton,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  isEditMode = false;

  private readonly alerts = inject(TuiAlertService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // onSubmit(): void {
  //   if (this.registerForm.valid) {
  //     this.alerts
  //       .open('Basic <strong>HTML</strong>', { label: 'With a heading!', appearance: 'positive'},)
  //       .subscribe();
  //     return;
  //   }
  // }

  onSubmit(): void {
    const { email, username, password, confirmPassword } =
      this.registerForm.value;

    if (password !== confirmPassword) {
      this.alerts
        .open('Senhas não coincidem', {
          label: 'tente novamente',
          appearance: 'negative',
        })
        .subscribe();
      return;
    }

    const formData = { name: username, email, password };

    if (this.isEditMode) {
      this.userService.updateUser(formData as any).subscribe({
        next: (resp: any) => {
          const updated = resp?.updatedUser ?? resp;
          const safeUser = {
            id: updated?.id,
            name: updated?.name,
            email: updated?.email,
          };
          this.authService.updateUser(safeUser);
          this.router.navigate(['/home']);
          this.alerts
            .open('Sucesso', {
              label: 'Perfil atualizado',
              appearance: 'positive',
            })
            .subscribe();
        },
        error: (err) => {
          this.alerts
            .open('Erro', {
              label: 'Perfil não atualizado',
              appearance: 'negative',
            })
            .subscribe();
        },
      });
    } else {
      if (!this.registerForm.valid) return;
      this.userService.createUser(formData).subscribe({
        next: () => {
          this.alerts
            .open('Sucesso', {
              label: 'Cadastro realizado',
              appearance: 'positive',
            })
            .subscribe();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.alerts
            .open('Erro', {
              label: err.error.message || 'Erro ao cadastrar usuário',
              appearance: 'negative',
            })
            .subscribe();
        },
      });
    }
  }
}
