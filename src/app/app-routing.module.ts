import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {FormsFieldComponent} from './forms-field/forms-field.component'
import {DataTableComponent}from './data-table/data-table.component';

const routes: Routes = [
  { path: '', component: DataTableComponent },
  { path: 'tableview', component: DataTableComponent },
  { path: 'add', component: FormsFieldComponent },
  { path: 'detail/:id', component: FormsFieldComponent },
  { path: '**', component: FormsFieldComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
 
export class AppRoutingModule { }
