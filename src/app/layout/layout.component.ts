import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { TuiButton, TuiHint } from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiBadgeNotification,
  TuiChevron,
} from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { AuthService, AuthSession } from '../core/services/auth.service';
import { TuiSheetDialog } from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    TuiNavigation,
    TuiAvatar,
    TuiBadgeNotification,
    TuiButton,
    TuiHint,
    NgTemplateOutlet,
    TuiChevron,
    RouterOutlet,
    TuiSheetDialog,
    RouterLink,
    CommonModule
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  theme: string = 'dark';
  protected open = false;
  protected expanded = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        this.theme = stored;
      }
    } catch {}

    this.applyTheme(this.theme);
  }

  handleToggle(): void {
    this.expanded.update((e) => !e);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);
    try {
      localStorage.setItem('theme', this.theme);
    } catch {}
  }

  private applyTheme(theme: string): void {
    const isDark = theme === 'dark';
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    const root = document.querySelector('tui-root');
    if (root) {
      if (isDark) {
        root.setAttribute('tuiTheme', 'dark');
      } else {
        root.removeAttribute('tuiTheme');
      }
    }
  }

  onOpenProfile(): void {
    this.open = true;
  }

  getCurrentUser() {
    const session: AuthSession | null = this.authService.sessionValue;
    if (session?.user) return session.user;
    try {
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || 'null'
      );
      if (!currentUser) return null;
      return currentUser.user || currentUser;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.setItem('auth', 'false');
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }
}
