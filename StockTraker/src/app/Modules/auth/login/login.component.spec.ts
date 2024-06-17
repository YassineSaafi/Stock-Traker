import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
        this.loading = false;
      }
    );
  }
}
