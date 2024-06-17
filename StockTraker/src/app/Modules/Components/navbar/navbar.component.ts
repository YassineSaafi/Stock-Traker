import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';  // Ajustez le chemin si nécessaire
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
 
  constructor(private authService: AuthService , private router: Router) {}

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
