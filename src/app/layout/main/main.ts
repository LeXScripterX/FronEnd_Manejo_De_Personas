import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {

  menuOpen = false;
  menuItems: any[] = [];
  role = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.role = (this.authService.getroles() || '')
      .replace(/"/g, '')
      .trim()
      .toUpperCase();
  }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {

    const menus: any = {
      ADMIN: [
        { name: 'Roles', route: '/roles' },
        { name: 'Usuarios', route: '/usuarios' },
        { name: 'Reportes', route: '/reportes' },
      ],

      SUPERVISOR: [
        { name: 'Dashboard', route: '/dashboard' },
        { name: 'Reportes', route: '/reportes' },
      ],

      AGENTE: [
        { name: 'Dashboard', route: '/dashboard' }
      ]
    };

    console.log('ROLE:', this.role);
    console.log('MENU:', menus[this.role]);
    console.log("ROLE RAW:", this.role);
    console.log("ROLE TYPE:", typeof this.role);
    console.log("ADMIN KEY TEST:", this.role === "ADMIN");
    console.log("AVAILABLE KEYS:", Object.keys(menus));
    console.log("DIRECT ACCESS:", menus["ADMIN"]);
    console.log("DYNAMIC ACCESS:", menus[this.role]);


    this.menuItems = menus[this.role.trim()] || [];
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}