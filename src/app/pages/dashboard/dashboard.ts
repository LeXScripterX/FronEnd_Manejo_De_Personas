import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {

  userName = '';
  userRole = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName = this.authService.getuser() || 'Usuario';
    this.userRole = (this.authService.getroles() || '')
      .replace(/"/g, '')
      .trim();
  }
}
