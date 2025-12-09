import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiAxes, TuiBarChart } from '@taiga-ui/addon-charts';
import { TuiContext } from '@taiga-ui/cdk';
import { tuiFormatNumber, TuiHint, TuiSelect, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper } from '@taiga-ui/kit';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    FormsModule,
    TuiAxes,
    TuiBarChart,
    TuiDataListWrapper,
    TuiHint,
    TuiTextfield,
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  protected readonly value = [
    [1000, 8000, 4000, 3000, 4000],
    [6000, 2000, 4500, 7000, 5000],
  ];

  protected readonly labelsX = ['Jan 2021', 'Feb', 'Mar', ''];
  protected readonly labelsY = ['0', '10 000'];
  protected readonly appearances = ['dark', 'error'];

  protected appearance = this.appearances[0]!;

  protected readonly hint = ({ $implicit }: TuiContext<number>): string =>
    this.value
      .reduce(
        (result, set) => `${result}$${tuiFormatNumber(set[$implicit] ?? 0)}\n`,
        ''
      )
      .trim();
}
