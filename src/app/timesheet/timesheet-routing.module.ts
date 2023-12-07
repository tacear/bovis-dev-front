import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaHorasComponent } from './components/carga-horas/carga-horas.component';

const routes: Routes = [
  { path: 'carga-horas', component: CargaHorasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
