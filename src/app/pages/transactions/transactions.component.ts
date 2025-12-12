import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TuiButton,
  TuiTextfield,
  TuiDropdown,
  TuiDataList,
} from '@taiga-ui/core';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiCell } from '@taiga-ui/layout';
import { TuiCheckbox } from '@taiga-ui/kit';

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
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  value = '';
  allchecked = false;
  dropdownOpen = false;
  open = false;

  
}
