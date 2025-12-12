import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { TuiButton, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiChevron,
  tuiCreateDefaultDayRangePeriods,
  TuiDataListWrapper,
  TuiFade,
  TuiInputDateRange,
  TuiSelect,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';

interface User {
  readonly url: string;
  readonly name: string;
  readonly balance: number;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputDateRange,
    TuiTextfield,
    TuiDataListWrapper,
    TuiChevron,
    TuiSelect,
    TuiAvatar,
    TuiCell,
    TuiFade,
    TuiTitle,
    TuiButton
  ],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  filtersForm = this.buildFormGroup();
  protected readonly items = tuiCreateDefaultDayRangePeriods();
  protected user: User | null = null;
  protected selected: readonly User[] = [];
  protected readonly max = TuiDay.currentLocal();

  constructor(private fb: FormBuilder) {}

  public get content(): string {
    const { dateRange } = this.filtersForm.value;

    return dateRange
      ? String(
          this.items.find((period) => period.range.daySame(dateRange)) || ''
        )
      : '';
  }

  private buildFormGroup() {
    return this.fb.group({
      dateRange: [null],
      user: [null],
    });
  }

  protected readonly users: readonly User[] = [
    {
      name: 'Alex Inkin',
      balance: 1323525,
      url: `https://taiga-ui.dev/assets/images/avatar.jpg`,
    },
    { name: 'Roman Sedov', balance: 523242, url: 'RS' },
    { name: 'Vladimir Potekhin', balance: 645465, url: 'VP' },
    { name: 'Nikita Barsukov', balance: 468468, url: 'NB' },
    { name: 'Maxim Ivanov', balance: 498654, url: 'MI' },
  ];

  protected readonly stringify = ({ name }: User): string => name;

  onSubmit() {}
}
