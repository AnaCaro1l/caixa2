import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TuiButton, TuiLink } from '@taiga-ui/core';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TuiButton, LucideAngularModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly Sun = Sun;
  readonly Moon = Moon;

  theme: string = 'light';
  url: string = '';
  hasBg: boolean = false;

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        this.theme = saved;
      } else {
        this.theme = 'light'; // default to light when no saved preference
      }
    } catch {}
    // Apply initial theme to <html> for Tailwind dark mode
    const html = document.documentElement;
    if (this.theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Sync Taiga UI root theme attribute on init
    const root = document.querySelector('tui-root');
    if (root) {
      if (this.theme === 'dark') {
        root.setAttribute('tuiTheme', 'dark');
      } else {
        root.removeAttribute('tuiTheme');
      }
    }
    this.url = this.getUrl();
    this.updateHeaderBg(this.url);
    this.router.events.subscribe(() => {
      const current = this.getUrl();
      this.updateHeaderBg(current);
    });
  }

  getUrl(): string {
    return window.location.href;
  }

  updateHeaderBg(url: string): void {
    const lower = url.toLowerCase();
    this.hasBg =
      lower.includes('/landing/workout') || lower.includes('/landing/recipes');
  }

  isActive(path: string): boolean {
    const current = (this.router.url || this.getUrl()).toLowerCase();
    const target = path.toLowerCase();
    return (
      current === target ||
      current.startsWith(target + '/') ||
      current.startsWith(target + '?') ||
      current.startsWith(target + '#')
    );
  }
}
