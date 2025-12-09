import { Component, inject } from '@angular/core';
import { TuiAppearance } from '@taiga-ui/core/directives';
import { TuiCardLarge, TuiCardMedium } from '@taiga-ui/layout/components';
import { MovementPeriodComponent } from "../../shared/charts/movement-period/movement-period.component";
import { SpentDepartmentComponent } from "../../shared/charts/spent-department/spent-department.component";
import { InvoicingComponent } from "../../shared/charts/invoicing/invoicing.component";
import { BarChartComponent } from "../../shared/charts/bar-chart/bar-chart.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TuiCardLarge,
    TuiAppearance,
    MovementPeriodComponent,
    SpentDepartmentComponent,
    InvoicingComponent,
    BarChartComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
}

