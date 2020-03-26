/**
 * Created by hf on 19.05.2017.
 */
import { Routes, RouterModule } from '@angular/router';
import {InstrumentSearchComponent} from "./instrument-search/instrument-search.component";
import {NotFoundViewComponent} from "./views/not-found-view/not-found-view.component";
import {ErrorViewComponent} from "./views/error-view/error-view.component";
import {HomeComponent} from "./views/home/home.component";
import {BasicLayoutComponent} from "./shared/components/basic-layout/basic-layout.component";
import {TransactioneditorComponent} from "./modules/mfaccountmanager/views/transactioneditor/transactioneditor.component";
import {InstrumenteditorComponent} from "./modules/mfaccountmanager/views/instrumenteditor/instrumenteditor.component";
import {TenanteditorComponent} from "./modules/mfaccountmanager/views/tenanteditor/tenanteditor.component";

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
        path: 'instruments',
        component: InstrumenteditorComponent
      },
      {
        path: 'tenants',
        component: TenanteditorComponent
      },
      {
        path: 'instrument-search',
        component: InstrumentSearchComponent
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
