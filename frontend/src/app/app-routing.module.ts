import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcquisitionListComponent } from './components/acquisition-list/acquisition-list.component';
import { AcquisitionFormComponent } from './components/acquisition-form/acquisition-form.component';

const routes: Routes = [
  { path: 'acquisitions', component: AcquisitionListComponent },
  { path: 'acquisition-form', component: AcquisitionFormComponent },
  { path: '', redirectTo: '/acquisitions', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
