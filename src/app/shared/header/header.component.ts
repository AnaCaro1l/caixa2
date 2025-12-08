import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TuiAutoColorPipe, TuiButton, TuiLink } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiSheetDialog } from '@taiga-ui/addon-mobile';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TuiButton,
    LucideAngularModule,
    CommonModule,
    TuiAvatar,
    TuiSheetDialog,
    TuiAutoColorPipe,
    FormsModule,
    CommonModule,
    TuiButton,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly Sun = Sun;
  readonly Moon = Moon;

  theme: string = 'light';
  url: string = '';
  hasBg: boolean = false;

  protected open = false;

  protected floating = true;
  protected secondAction = false;

  protected search = '';

  protected readonly items = new Array(15).fill(0).map((_, index) => ({
    title: `Title ${index + 1}`,
    description: `Description ${index + 1}`,
  }));

  isAuthenticated = false;
  currentUser: { name: string; email: string } | null = null;

  get initials(): string {
    const name = this.currentUser?.name?.trim();
    if (name) {
      const parts = name.split(/\s+/).filter(Boolean);
      const first = parts[0]?.[0] || '';
      const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || '' : '';
      return (first + last).toUpperCase() || (name[0] || '').toUpperCase();
    }
    const email = this.currentUser?.email || '';
    return email ? email[0].toUpperCase() : '';
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

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        this.theme = saved;
      } else {
        this.theme = 'light';
      }
    } catch {}

    const html = document.documentElement;
    if (this.theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    const root = document.querySelector('tui-root');
    if (root) {
      if (this.theme === 'dark') {
        root.setAttribute('tuiTheme', 'dark');
      } else {
        root.removeAttribute('tuiTheme');
      }
    }

    const session = this.auth.sessionValue;
    this.isAuthenticated = !!session;
    this.currentUser = session?.user ?? null;
    this.auth.session$.subscribe(s => {
      this.isAuthenticated = !!s;
      this.currentUser = s?.user ?? null;
    });
  }

  openProfile(): void {
    this.open = true;
  }

  logout(): void {
    this.auth.clearSession();
    this.open = false;
    this.router.navigate(['/login']);
  }
}
