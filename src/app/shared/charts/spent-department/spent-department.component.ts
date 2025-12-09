import { AsyncPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { TuiLegendItem, TuiRingChart } from '@taiga-ui/addon-charts';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiHovered, tuiSum } from '@taiga-ui/cdk';

@Component({
  selector: 'app-spent-department',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    TuiAmountPipe,
    TuiHovered,
    TuiLegendItem,
    TuiRingChart,
  ],
  templateUrl: './spent-department.component.html',
  styleUrl: './spent-department.component.scss',
})
export class SpentDepartmentComponent {
  protected activeItemIndex = NaN;

  protected readonly value = [13769, 12367, 10172, 3018, 2592];
  protected readonly sum = tuiSum(...this.value);
  protected readonly labels = ['Food', 'Cafe', 'OSS', 'Taxi', 'Other'];

  protected isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  protected onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : NaN;
  }
}
