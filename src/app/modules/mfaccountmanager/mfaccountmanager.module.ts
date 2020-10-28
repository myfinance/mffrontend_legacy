import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactioneditorComponent } from './views/transactioneditor/transactioneditor.component';
import { TransactiontableComponent } from './views/transactioneditor/components/transactiontable/transactiontable.component';
import { AgGridModule } from 'ag-grid-angular';
import {MyFinanceService} from '../myfinance-tsclient-generated';
import {ConfigService} from '../../shared/services/config.service';
import {WidgetModule} from '../widget/widget.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {GridsterModule} from 'angular-gridster2';
import { IncomeexpensesinputformComponent } from './views/transactioneditor/components/incomeexpensesinputform/incomeexpensesinputform.component';
import { ControllerComponent } from './views/transactioneditor/components/controller/controller.component';
import { CashflowtableComponent } from './views/transactioneditor/components/cashflowtable/cashflowtable.component';
import { ValuegraphComponent } from './views/transactioneditor/components/valuegraph/valuegraph.component';
import {TransactionService} from './views/transactioneditor/services/transaction.service';
import {BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule, ButtonsModule, TabsModule } from 'ngx-bootstrap';
import { InputformselectionComponent } from './views/transactioneditor/components/inputformselection/inputformselection.component';
import { InstrumenteditorComponent } from './views/instrumenteditor/instrumenteditor.component';
import { InstrumentinputformComponent } from './views/instrumenteditor/components/instrumentinputform/instrumentinputform.component';
import { InstrumenttableComponent } from './views/instrumenteditor/components/instrumenttable/instrumenttable.component';
import { InstrumentcontrollerComponent } from './views/instrumenteditor/components/instrumentcontroller/instrumentcontroller.component';
import {InstrumentService} from './views/instrumenteditor/services/instrument.service';
import {MyFinanceDataService} from '../../shared/services/myfinance-data.service';
import { TenanteditorComponent } from './views/tenanteditor/tenanteditor.component';
import { TenantcontrollerComponent } from './views/tenanteditor/components/tenantcontroller/tenantcontroller.component';
import { TenantinputformComponent } from './views/tenanteditor/components/tenantinputform/tenantinputform.component';
import { TenanttableComponent } from './views/tenanteditor/components/tenanttable/tenanttable.component';
import {TenantService} from './views/tenanteditor/services/tenant.service';
import { TenantupdateformComponent } from './views/tenanteditor/components/tenantupdateform/tenantupdateform.component';
import {ToastrModule} from 'ngx-toastr';
import { InstrumentupdateformComponent } from './views/instrumenteditor/components/instrumentupdateform/instrumentupdateform.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {EditorComponent} from './views/transactioneditor/components/editor/editor.component';
import {BudgettransferinputformComponent} from './views/transactioneditor/components/budgettransferinputform/budgettransferinputform.component';
import {TransferinputformComponent} from './views/transactioneditor/components/transferinputform/transferinputform.component';
import {RecurrenttransactioneditorComponent} from './views/recurrenttransactioneditor/recurrenttransactioneditor.component';
import { RecurrenttransactioncontrollerComponent } from './views/recurrenttransactioneditor/components/recurrenttransactioncontroller/recurrenttransactioncontroller.component';
import { RecurrenttransactionviewComponent } from './views/recurrenttransactioneditor/components/recurrenttransactionview/recurrenttransactionview.component';
import { RecurrenttransactioncreatorComponent } from './views/recurrenttransactioneditor/components/recurrenttransactioncreator/recurrenttransactioncreator.component';
import {RecurrentTransactionService} from './views/recurrenttransactioneditor/services/recurrenttransaction.service';
import {RecurrenttransactioneditorformComponent} from './views/recurrenttransactioneditor/components/recurrenttransactioneditorform/recurrenttransactioneditorform.component';
import { RecurrentincomeexpensesComponent } from './views/recurrenttransactioneditor/components/recurrentincomeexpenses/recurrentincomeexpenses.component';
import { RecurrentbudgettransferComponent } from './views/recurrenttransactioneditor/components/recurrentbudgettransfer/recurrentbudgettransfer.component';
import { RecurrenttransferComponent } from './views/recurrenttransactioneditor/components/recurrenttransfer/recurrenttransfer.component';

@NgModule({
  imports: [
    AgGridModule.withComponents([]),
    DashboardModule,
    WidgetModule,
    GridsterModule,
    CommonModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
      iconClasses: {
        error: 'toast-error-wo-icon',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    })
  ],
  declarations: [TransactioneditorComponent,
    TransactiontableComponent,
    EditorComponent,
    IncomeexpensesinputformComponent,
    BudgettransferinputformComponent,
    TransferinputformComponent,
    ControllerComponent,
    CashflowtableComponent,
    ValuegraphComponent,
    InputformselectionComponent,
    InstrumenteditorComponent,
    InstrumentinputformComponent,
    InstrumenttableComponent,
    InstrumentcontrollerComponent,
    TenanteditorComponent,
    TenantcontrollerComponent,
    TenantinputformComponent,
    TenanttableComponent,
    TenantupdateformComponent,
    InstrumentupdateformComponent,
    RecurrenttransactioneditorComponent,
    RecurrenttransactioneditorformComponent,
    RecurrenttransactioncontrollerComponent,
    RecurrenttransactionviewComponent,
    RecurrenttransactioncreatorComponent,
    RecurrentincomeexpensesComponent,
    RecurrentbudgettransferComponent,
    RecurrenttransferComponent],
  exports: [
    InstrumenteditorComponent,
    TransactioneditorComponent,
    RecurrenttransactioneditorComponent
  ],
  providers: [
    MyFinanceService, ConfigService, MyFinanceDataService, TransactionService, InstrumentService, TenantService, RecurrentTransactionService
  ]
})
export class MfAccountManagerModule { }
