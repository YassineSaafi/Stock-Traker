import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirige l'utilisateur s'il est déjà connecté
    if (this.authService.currentUserValue) {
      this.router.navigate(['/Home']);
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pw: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      response => {
        if (response.token) {
          this.successMessage = 'Connexion réussie ! Redirection en cours...';
          this.errorMessage = null;
          this.loginForm.reset();
          this.submitted = false;
          this.router.navigate(['/Home']); 
        } else {
          this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
          this.successMessage = null;
        }
      },
      error => {
        this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
        this.successMessage = null;
      }
    );
  }
}
