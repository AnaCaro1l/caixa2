import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TuiButton, TuiHint } from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiBadgeNotification,
  TuiChevron,
} from '@taiga-ui/kit';
import { TuiNavigation } from '@taiga-ui/layout';
import { AuthService, AuthSession } from '../services/auth.service';
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
    RouterLink
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  theme: string = 'light';
  protected open = false;
  protected expanded = signal(false);

  constructor(private authService: AuthService) {}

  handleToggle(): void {
    this.expanded.update((e) => !e);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    const isDark = this.theme === 'dark';

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

    try {
      localStorage.setItem('theme', this.theme);
    } catch {}
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
    this.authService.clearSession();
  }
}
