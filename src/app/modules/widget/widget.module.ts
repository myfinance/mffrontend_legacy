import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialNumberPipe } from './pipes/financial-number.pipe';
import {WidgetContentComponent} from "./shared/component/widget-content/widget-content.component";
import {AgGridModule} from "ag-grid-angular";
import {BooleanPipe} from "./pipes/boolean.pipe";
import {WidgetComponent} from "./shared/component/widget/widget.component";

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    WidgetContentComponent,
    FinancialNumberPipe,
    WidgetComponent,
    BooleanPipe
  ],
  exports: [
    WidgetComponent
  ]
})
export class WidgetModule { }
