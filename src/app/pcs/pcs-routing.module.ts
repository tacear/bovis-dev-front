import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpComponent } from './components/ip/ip.component';

const routes: Routes = [
  { path: 'ip', component: IpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcsRoutingModule { }
