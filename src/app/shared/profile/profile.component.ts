import { Component, Input } from '@angular/core';
import { AuthService, AuthSession } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() open: boolean = false;

  constructor(private authService: AuthService) {}
  
  
}
