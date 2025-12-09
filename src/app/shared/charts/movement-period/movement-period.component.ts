import { Component, inject } from '@angular/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiAppearance, TuiHint } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiInputDateRangeModule } from '@taiga-ui/legacy';
import {
  TUI_IS_E2E,
  TuiDay,
  type TuiDayLike,
  TuiDayRange,
  TuiFilterPipe,
  type TuiMapper,
  TuiMapperPipe,
  type TuiMatcher,
  TuiMonth,
  tuiPure,
} from '@taiga-ui/cdk';
import { TUI_MONTHS, TuiNotification, type TuiPoint } from '@taiga-ui/core';
import { map, Observable, of } from 'rxjs';
import {
  TuiAxes,
  TuiLineChart,
  TuiLineDaysChart,
  TuiLineDaysChartHint,
} from '@taiga-ui/addon-charts';
import { AsyncPipe, NgFor, NgForOf, NgIf, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movement-period',
  standalone: true,
  imports: [
    TuiHeader,
    FormsModule,
    TuiInputDateRangeModule,
    TuiAxes,
    TuiLineChart,
    TuiLineDaysChart,
    TuiLineDaysChartHint,
    TuiFilterPipe,
    TuiMapperPipe,
    NgIf,
    NgForOf,
    AsyncPipe,
    TuiHint,
    DecimalPipe,
  ],
  templateUrl: './movement-period.component.html',
  styleUrl: './movement-period.component.scss',
})
export class MovementPeriodComponent {
  private readonly isE2E = inject(TUI_IS_E2E);
  private readonly months$ = inject(TUI_MONTHS);

  protected data = new TuiDayRange(
    TuiDay.currentLocal().append({ month: -6 }),
    TuiDay.currentLocal()
  );

  protected show = this.data; 

  protected days = this.random(this.data);

  protected seriesLabels: readonly string[] = ['Entradas', 'Saídas'];

  protected seriesColors: readonly string[] = ['#FF8A00', '#FCBB14'];

  protected readonly axisYLabels = ['', '5mil', '10mil', '20mil', '30mil'];

  protected readonly maxLength: TuiDayLike = { month: 6 };

  protected get range(): TuiDayRange {
    return this.computeRange(this.show);
  }

  @tuiPure
  protected getWidth({ from, to }: TuiDayRange): number {
    return TuiDay.lengthBetween(from, to);
  }

  @tuiPure
  protected getDate(day: TuiDay | number, date: TuiDay): TuiDay {
    return day instanceof TuiDay ? day : date.append({ day });
  }

  @tuiPure
  protected labels({ from, to }: TuiDayRange): Observable<readonly string[]> {
    const length = TuiDay.lengthBetween(from, to);

    if (length > 90) {
      return this.months$.pipe(
        map((months) => [
          ...Array.from(
            { length: TuiMonth.lengthBetween(from, to) + 1 },
            (_, i) => months[from.append({ month: i }).month] ?? ''
          ),
          '',
        ])
      );
    }

    const range = Array.from({ length }, (_, day) => from.append({ day }));
    const mondays = onlyMondays(range);
    const days = range.map(String);

    if (length > 60) {
      return of([...even(mondays), '']);
    }

    if (length > 14) {
      return of([...mondays, '']);
    }

    if (length > 7) {
      return of([...even(days), '']);
    }

    return of([...days, '']);
  }

  protected readonly filter: TuiMatcher<[[TuiDay, number], TuiDayRange]> = (
    [day],
    { from, to }
  ) => day.daySameOrAfter(from) && day.daySameOrBefore(to);

  protected readonly toNumbers: TuiMapper<
    [Array<[TuiDay, number]>, TuiDayRange],
    readonly TuiPoint[]
  > = (days, { from }) =>
    days.map(([day, value]) => [TuiDay.lengthBetween(from, day), value]);

  protected onDataChange(data: TuiDayRange): void {
    this.days = this.random(data);
  }

  @tuiPure
  private computeRange(range: TuiDayRange): TuiDayRange {
    const { from, to } = range;
    const length = TuiDay.lengthBetween(from, to);
    const dayOfWeekFrom = from.dayOfWeek();
    const dayOfWeekTo = to.dayOfWeek();
    const mondayFrom = dayOfWeekFrom
      ? from.append({ day: 7 - dayOfWeekFrom })
      : from;
    const mondayTo = dayOfWeekTo ? to.append({ day: 7 - dayOfWeekTo }) : to;
    const mondaysLength = TuiDay.lengthBetween(mondayFrom, mondayTo);

    if (length > 90) {
      return range;
    }

    if (length > 60) {
      return new TuiDayRange(
        mondayFrom,
        mondayTo.append({ day: mondaysLength % 14 })
      );
    }

    if (length > 14) {
      return new TuiDayRange(mondayFrom, mondayTo);
    }

    return new TuiDayRange(from, to.append({ day: length % 2 }));
  }

  @tuiPure
  private generateRandomData(
    { from, to }: TuiDayRange,
    initial: number
  ): Array<[TuiDay, number]> {
    return new Array(TuiDay.lengthBetween(from, to) + 1)
      .fill(0)
      .reduce<Array<[TuiDay, number]>>(
        (array, _, i) => [
          ...array,
          [
            from.append({ day: i }),
            this.isE2E
              ? initial
              : Math.max(
                  (i ? array[i - 1]?.[1] ?? 0 : initial) +
                    Math.random() * 10 -
                    5,
                  0
                ),
          ],
        ],
        []
      )
      .filter(([day]) => day.dayOfWeek() < 5);
  }

  private random(data: TuiDayRange): Array<Array<[TuiDay, number]>> {
    const entradas = this.generateRandomData(data, 120);
    const saidas = this.generateRandomData(data, 80);
    return [entradas, saidas];
  }

  protected totals(range: TuiDayRange): readonly number[] {
    return this.days.map((series) =>
      series
        .filter(([day]) =>
          day.daySameOrAfter(range.from) && day.daySameOrBefore(range.to)
        )
        .reduce((sum, [, value]) => sum + value, 0)
    );
  }
}

function onlyMondays(range: readonly TuiDay[]): readonly string[] {
  return range.filter((day) => !day.dayOfWeek()).map(String);
}

function even<T>(array: readonly T[]): readonly T[] {
  return array.filter((_, i) => !(i % 2));
}
