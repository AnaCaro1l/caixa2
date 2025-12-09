import { Component } from '@angular/core';
import { TuiAxes, TuiLineChart } from '@taiga-ui/addon-charts';
import { TuiContext, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiPoint } from '@taiga-ui/core';

@Component({
  selector: 'app-invoicing',
  standalone: true,
  imports: [TuiAxes, TuiLineChart],
  templateUrl: './invoicing.component.html',
  styleUrl: './invoicing.component.scss',
})
export class InvoicingComponent {
  protected readonly value: readonly TuiPoint[] = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];

}
