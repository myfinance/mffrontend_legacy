/**
 * Created by hf on 19.05.2017.
 */
import { Routes, RouterModule } from '@angular/router';
import {NotFoundViewComponent} from './views/not-found-view/not-found-view.component';
import {ErrorViewComponent} from './views/error-view/error-view.component';
import {HomeComponent} from './views/home/home.component';
import {BasicLayoutComponent} from './shared/components/basic-layout/basic-layout.component';
import {TransactioneditorComponent} from './modules/mfaccountmanager/views/transactioneditor/transactioneditor.component';
import {InstrumenteditorComponent} from './modules/mfaccountmanager/views/instrumenteditor/instrumenteditor.component';
import {TenanteditorComponent} from './modules/mfaccountmanager/views/tenanteditor/tenanteditor.component';
import {RecurrenttransactioneditorComponent} from './modules/mfaccountmanager/views/recurrenttransactioneditor/recurrenttransactioneditor.component';
import { AssetviewComponent } from './modules/mfanalytics/views/assetview/assetview.component';
import { ExpensesmassloadComponent } from './modules/mfaccountmanager/views/expensesmassload/expensesmassload.component';
import { InstrumentconfiguratorComponent } from './modules/mfmarketdata/views/instrumentconfigurator/instrumentconfigurator.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '', component: BasicLayoutComponent,
    children: [
      {
        path: 'not_found',
        component: NotFoundViewComponent
      },
      {
        path: 'error',
        component: ErrorViewComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'transactions',
        component: TransactioneditorComponent
      },
      {
        path: 'expensesmassload',
        component: ExpensesmassloadComponent
      },
      {
        path: 'instruments',
        component: InstrumenteditorComponent
      },
      {
        path: 'recurrenttransactions',
        component: RecurrenttransactioneditorComponent
      },
      {
        path: 'tenants',
        component: TenanteditorComponent
      },
       {
        path: 'assetview',
        component: AssetviewComponent
      },
      {
        path: 'marketdataconfigview',
        component: InstrumentconfiguratorComponent
      },
      {
        path: 'dashboards', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'not_found'
  }
];


export const AppRoutesModule = RouterModule.forRoot(APP_ROUTES);
