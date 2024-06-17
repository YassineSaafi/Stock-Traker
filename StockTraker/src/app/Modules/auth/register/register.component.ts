import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pw: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
     
    });
   
  }

  get f() { return this.registerForm.controls; }

  confirmSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.onSubmit();
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      data => {
        this.successMessage = 'Inscription réussie !';
        this.errorMessage = '';
        this.router.navigate(['/auth/login']);
      },
      err => {
        this.errorMessage = err.error.message || 'Une erreur est survenue lors de l\'inscription';
        this.successMessage = '';
      }
    );
  }
}
