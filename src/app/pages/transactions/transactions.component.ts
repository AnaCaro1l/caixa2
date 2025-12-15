import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TuiButton,
  TuiTextfield,
  TuiDropdown,
  TuiDataList,
} from '@taiga-ui/core';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { TuiTable, TuiTableControl } from '@taiga-ui/addon-table';
import { TuiCell } from '@taiga-ui/layout';
import { TuiBadge, TuiCheckbox, TuiStatus } from '@taiga-ui/kit';
import { CurrencyPipe, DatePipe } from '@angular/common';


interface Transaction {
  id: number;
  updateAt: string;
  value: number;
  status: 'paid' | 'pending' | 'canceled';
  dueDate: string;
  companyId: number;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    FormsModule,
    TuiTextfield,
    FiltersComponent,
    TuiButton,
    TuiTable,
    TuiCell,
    TuiDropdown,
    TuiDataList,
    TuiCheckbox,
    CurrencyPipe,
    TuiBadge,
    TuiStatus,
    DatePipe,
    TuiTableControl,
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  value = '';
  allchecked = false;
  dropdownOpen = false;
  open = false;
  checked = false;
  selected = [];

  transactions: Transaction[] = [
    {
      id: 1,
      updateAt: '2024-01-01',
      value: 100.0,
      status: 'paid',
      dueDate: '2024-01-10',
      companyId: 1,
    },
    {
      id: 2,
      updateAt: '2024-01-02',
      value: 200.0,
      status: 'pending',
      dueDate: '2024-01-15',
      companyId: 2,
    },
    {
      id: 3,
      updateAt: '2024-01-03',
      value: 150.0,
      status: 'canceled',
      dueDate: '2024-01-20',
      companyId: 1,
    },
  ];

  getAppearance(status: Transaction['status']): 'success' | 'warning' | 'error' {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'canceled':
        return 'error';
      default:
        return 'success';
    }
  }
}
