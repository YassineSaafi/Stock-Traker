import { Component } from '@angular/core';
import { AuthService } from './Modules/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn!: boolean;
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user; // Si l'utilisateur est connecté, isLoggedIn est true, sinon false.
    });
  }
}
